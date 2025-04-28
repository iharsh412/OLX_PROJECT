import { useEffect, useState, useRef } from 'react';
import './firebaseChatApp.css';
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
import { db } from '../../firebase';
import { RootState } from '../../Store';
import { MessageProps, CLASSNAME, TEXT } from './constant';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { TYPE } from '../../Helper/constant';
export default function FirebaseChatApp() {
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const { username, id } = useSelector((state: RootState) => state?.common);
  const [newmsg, setNewmsg] = useState('');
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const messageRef = collection(db, 'messages');
  const [uniqueUsers, setUniqueUsers] = useState<string[]>([]);
  const [roomId, setRoomId] = useState('');
  const messagEnd = useRef<HTMLDivElement | null>(null);
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<{
    [roomId: string]: number;
  }>({});

  const handleSendMessage = async () => {
    if (newmsg.trim() === '' || receiverId === null || receiverId === id)
      return;

    const tempId = Date.now().toString();
    try {
      const newMessage: MessageProps = {
        id: tempId,
        text: newmsg,
        createdAt: new Date(),
        user: username || '',
        room: roomId,
        seen: false,
        senderId: id || '',
        receiverId: receiverId || '',
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
        receiverId: receiverId,
      });

      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempId ? { ...msg, id: docRef.id } : msg))
      );
    } catch (error) {
      toast.error(TEXT.ERROR);

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
      let newMessages: MessageProps[] = [];
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
    const queryMessages = query(messageRef);

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let uniqueRooms: Set<string> = new Set();
      const counts: { [roomId: string]: number } = {};
      snapshot.forEach((doc) => {
        if (doc.data().room.split('_').includes(String(id))) {
          uniqueRooms.add(doc.data().room);
          if (doc.data().receiverId == id && !doc.data().seen) {
            console.log(doc.data().room, 'doc.data().room');
            counts[doc.data().room] = (counts[doc.data().room] || 0) + 1;
          }
        }
      });
      setUniqueUsers(Array.from(uniqueRooms));
      setUnreadCounts(counts);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const el = messagEnd.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);
  console.log(unreadCounts, 'unreadCounts');
  console.log(uniqueUsers, 'uniqueUsers');
  // mark user aseen to viewport
  useEffect(() => {
    if (!roomId || !id) return;

    const observerOptions = {
      root: messageListRef.current,
      threshold: 0.5,
    };
    const observers: IntersectionObserver[] = [];

    messages.forEach((msg) => {
      if (msg.senderId === id || msg.receiverId != id || msg.seen) return;
      const messageElement = document.getElementById(msg.id);
      if (!messageElement) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update in Firebase
            const msgRef = doc(db, 'messages', msg.id);
            updateDoc(msgRef, { seen: true })
              .then(() => {
                setMessages((prev) =>
                  prev.map((m) => (m.id === msg.id ? { ...m, seen: true } : m))
                );
              })
              .catch((error) => {
                console.error('Error updating seen status:', error);
              });

            observer.disconnect();
          }
        });
      }, observerOptions);

      observer.observe(messageElement);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [messages, id, roomId]);

  return (
    <>
      {uniqueUsers.length === 0 ? (
        <div className={CLASSNAME.NO_USERS}>{TEXT.NO_CONVERSATIONS}</div>
      ) : (
        <div className={CLASSNAME.CHAT_APP}>
          <div className={CLASSNAME.USER_WRAPPER}>
            <div className={CLASSNAME.USER}>{TEXT.USER}</div>
            <div className={CLASSNAME.USER_LIST}>
              {uniqueUsers.map((user) => (
                <button
                  key={user}
                  className={`${CLASSNAME.USER_ITEM} ${user == roomId ? CLASSNAME.ACTIVE_USER : ''} `}
                  disabled={user == roomId}
                  onClick={() => {
                    setRoomId(user);
                    setReceiverId(
                      user.split('_')[0] == id
                        ? user.split('_')[1]
                        : user.split('_')[0]
                    );
                  }}
                >
                  {user}
                  {user!== roomId && unreadCounts[user] > 0 && (
                    <span className={CLASSNAME.UNREAD}>
                      {unreadCounts[user]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className={CLASSNAME.MESSAGE_WRAPPER}>
            <div className={CLASSNAME.MESSAGE}>{TEXT.MESSAGES}</div>
            <div
              className={CLASSNAME.MESSAGE_LIST}
              ref={(el) => {
                if (el) {
                  (
                    messagEnd as React.MutableRefObject<HTMLDivElement>
                  ).current = el;
                  (
                    messageListRef as React.MutableRefObject<HTMLDivElement>
                  ).current = el;
                }
              }}
            >
              {messages.length === 0 ? (
                <div className={CLASSNAME.NO_MSG}>
                  {TEXT.SELECT_SELLER_ROOMID}
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      id={msg.id}
                      className={`${CLASSNAME.MESSAGE_ITEM} ${
                        msg.user === username
                          ? CLASSNAME.SENT
                          : CLASSNAME.RECEIVED
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
                      </span>
                      {msg.user === username && (
                        <span
                          className={`${CLASSNAME.TICK_STATUS} ${msg.seen ? CLASSNAME.SEEN : ''}`}
                        >
                          {msg.seen ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>

            {messages.length !== 0 && (
              <div className={CLASSNAME.INPUT_WRAPPER}>
                <input
                  className={CLASSNAME.MESSAGE_INPUT}
                  type={TYPE.TEXT}
                  placeholder={TEXT.TYPE_MESSAGE}
                  value={newmsg}
                  onChange={(e) => setNewmsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <button
                  className={CLASSNAME.SEND_BUTTON}
                  onClick={handleSendMessage}
                >
                  {TEXT.SEND}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
