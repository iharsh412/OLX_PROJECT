import { useEffect, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase';
import { RootState } from '../../../Store';
import { CLASSNAME } from '../../../Views/FirebaseChatApp/constant';
import { ChatMsgSectionProps, MessageProps } from '../../../Helper/interface';
import { COMMON_TEXT } from '../../../Helper/constant';

export default function ChatMsgSection({
  roomId,
}: Readonly<ChatMsgSectionProps>) {
  const { userId } = useSelector((state: RootState) => state.chatUser);
  const { username, id } = useSelector((state: RootState) => state?.common);
  const [newmsg, setNewmsg] = useState('');
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const messageRef = collection(db, 'messages');
  const messagEnd = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (newmsg.trim() === '') return;

    const tempId = Date.now().toString();
    try {
      const newMessage: MessageProps = {
        id: tempId,
        text: newmsg,
        createdAt: new Date(),
        user: username ?? '',
        room: roomId ?? '',
        seen: false,
        senderId: id ?? '',
        receiverId: userId ?? '',
      };
      setMessages((prev) => [...prev, newMessage]);
      setNewmsg('');

      // Add to Firebase
      const docRef = await addDoc(messageRef, {
        text: newmsg,
        createdAt: serverTimestamp(),
        user: username,
        room: roomId,
        seen: false,
        senderId: id,
        receiverId: userId,
      });

      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempId ? { ...msg, id: docRef.id } : msg))
      );
    } catch (error) {
      toast.error(COMMON_TEXT.ERROR_SENDING_MESSAGE);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
    }
  };

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where('room', '==', roomId),
      orderBy('createdAt')
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const newMessages: MessageProps[] = [];
      snapshot.forEach((doc) => {
        newMessages.push({
          ...(doc.data() as MessageProps),
          id: doc.id,
        });
      });

      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    if (!roomId || !id) return;

    const observerOptions = {
      root: messageListRef.current,
      threshold: 0.5,
    };

    const observers = setupMessageObservers(observerOptions);
    return () => cleanupObservers(observers);
  }, [messages, id, roomId]);
  const setupMessageObservers = (options: IntersectionObserverInit) => {
    const observers: IntersectionObserver[] = [];

    messages.forEach((msg) => {
      if (shouldSkipMessage(msg)) return;

      const messageElement = document.getElementById(msg.id);
      if (!messageElement) return;

      const observer = createMessageObserver(msg, options);
      observer.observe(messageElement);
      observers.push(observer);
    });

    return observers;
  };

  const shouldSkipMessage = (msg: MessageProps) => {
    return msg.senderId == id || msg.receiverId != id || msg.seen;
  };

  const createMessageObserver = (
    msg: MessageProps,
    options: IntersectionObserverInit
  ) => {
    const observer = new IntersectionObserver(handleIntersection(msg), options);
    return observer;
  };

  const handleIntersection =
    (msg: MessageProps) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          markMessageAsSeen(msg);
        }
      });
    };

  const markMessageAsSeen = async (msg: MessageProps) => {
    try {
      await updateSeenStatusInFirebase(msg.id);
      updateSeenStatusLocally(msg.id);
    } catch (error) {
      console.error('Error updating seen status:', error);
    }
  };

  const updateSeenStatusInFirebase = async (messageId: string) => {
    const msgRef = doc(db, 'messages', messageId);
    await updateDoc(msgRef, { seen: true });
  };

  const updateSeenStatusLocally = (messageId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, seen: true } : m))
    );
  };

  const cleanupObservers = (observers: IntersectionObserver[]) => {
    observers.forEach((obs) => obs.disconnect());
  };

  useEffect(() => {
    const el = messagEnd.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={CLASSNAME.MESSAGE_WRAPPER}>
      <div className={CLASSNAME.MESSAGE}>{COMMON_TEXT.MESSAGES}</div>
      <div
        className={CLASSNAME.MESSAGE_LIST}
        ref={(el) => {
          if (el) {
            // Type assertion to bypass read-only restriction
            (messagEnd as React.MutableRefObject<HTMLDivElement>).current = el;
            (messageListRef as React.MutableRefObject<HTMLDivElement>).current =
              el;
          }
        }}
      >
        {messages.length === 0 ? (
          <div className={CLASSNAME.NO_MSG}>{COMMON_TEXT.NO_MSG}</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              id={msg.id}
              className={`${CLASSNAME.MESSAGE_ITEM} ${
                msg.user === username ? CLASSNAME.SENT : CLASSNAME.RECEIVED
              }`}
            >
              <span className={CLASSNAME.MESSAGE_TEXT}>{msg.text}</span>
              <span className={CLASSNAME.MESSAGE_TIME}>
                {msg.createdAt
                  ? new Date(
                      (msg.createdAt as any).seconds * 1000
                    ).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : ''}
                {msg.user === username && (
                  <span
                    className={`${CLASSNAME.TICK_STATUS} ${msg.seen ? CLASSNAME.SEEN : ''}`}
                  >
                    {msg.seen ? '✓✓' : '✓'}
                  </span>
                )}
              </span>
            </div>
          ))
        )}
      </div>
      {/* send button and input wrapper  */}
      {roomId !== '' && (
        <div className={CLASSNAME.INPUT_WRAPPER}>
          <input
            className={CLASSNAME.MESSAGE_INPUT}
            type="text"
            placeholder={COMMON_TEXT.TYPE_MESSAGE}
            value={newmsg}
            onChange={(e) => setNewmsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <button
            type="button"
            className={CLASSNAME.SEND_BUTTON}
            onClick={handleSendMessage}
          >
            {COMMON_TEXT.SEND}
          </button>
        </div>
      )}
    </div>
  );
}
