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
} from 'firebase/firestore';
import { db } from '../../firebase';

import { RootState } from '../../Store';
import { MessageProps } from './constant';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function FirebaseChatApp() {
  const [senderId, setSenderId] = useState<string | null>(null);
  const { username, id } = useSelector((state: RootState) => state?.common);
  const [newmsg, setNewmsg] = useState('');
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const messageRef = collection(db, 'messages');
  const [uniqueUsers, setUniqueUsers] = useState<string[]>([]);
  const [roomId, setRoomId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  console.log(id, 'id');
  console.log(username, 'username');
  console.log(roomId, 'roomid');
  console.log(uniqueUsers, 'uniqueUsers');
  const handleSendMessage = async () => {
    if (newmsg.trim() === '' || senderId === null || senderId === id) return;
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

  useEffect(() => {
    const queryMessages = query(messageRef);

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let uniqueRooms: Set<string> = new Set();

      snapshot.forEach((doc) => {
        if (doc.data().room.split('_').includes(String(id)))
          uniqueRooms.add(doc.data().room);
      });
      setUniqueUsers(Array.from(uniqueRooms));
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {uniqueUsers.length === 0 ? (
        <div className="no_users">
          No conversations yet. Start chatting by connecting with another user!
        </div>
      ) : (
        <div className="chat-app">
          <div className="userWrapper">
            <div className="user">User</div>
            <div className="user-list">
              {uniqueUsers.map((user) => (
                <button
                  key={user}
                  className={`user-item ${user === roomId ? 'activeUser' : ''} `}
                  disabled={user === roomId}
                  onClick={() => {
                    setRoomId(user);
                    setSenderId(
                      user.split('_')[0] === id
                        ? user.split('_')[1]
                        : user.split('_')[0]
                    );
                  }}
                >
                  {user}
                </button>
              ))}
            </div>
          </div>
          <div className="message-wrapper">
            <div className="message">Messages</div>
            <div className="message-list">
              {messages.length === 0 ? (
                <div className="no_message">
                  Select a seller roomId to message and unlock better deals,
                  faster responses, and secure transactions!
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
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
                  ))}
                </>
              )}
            </div>

            {messages.length !== 0 && (
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
            )}
          </div>
        </div>
      )}
    </>
  );
}
