import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';

import { RootState } from '../../Store';
import { MessageProps } from './constant';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function FirebaseChatApp() {
  const { userId } = useSelector((state: RootState) => state.chatUser);
  const { username, id } = useSelector((state: RootState) => state?.common);
  const [newmsg, setNewmsg] = useState('');
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const messageRef = collection(db, 'messages');
  const roomId = [userId, id].sort().join('_');

  const handleSendMessage = async () => {
    if (newmsg.trim() === '') return;
    console.log(newmsg, 'newmsg');
    try {
      await addDoc(messageRef, {
        text: newmsg,
        createdAt: serverTimestamp(),
        user: username,
        room: roomId,
      });
      setNewmsg('');
    } catch (error) {
      toast.error('Error sending message. Please try again later.');
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

  console.log(messages, 'messages');
  return (
    <div className="chat-app">
      <div className="message-wrapper">
        <div className="message">Messages</div>
        <div className="message-list">
          {messages.length === 0 ? (
            <div className="no_message">
              "No messages yet. Say hello to start the conversation!"
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-item ${
                  msg.user === username ? 'sent' : 'received'
                }`}
              >
                <span className="message-text">{msg.text}</span>
                <span className="message-time">
                  {msg.createdAt?.toDate().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="input-wrapper">
          <input
            className="message-input"
            type="text"
            placeholder="Type a message"
            value={newmsg}
            onChange={(e) => setNewmsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <button className="send-btn" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
