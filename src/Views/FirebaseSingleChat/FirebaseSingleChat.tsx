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
        user: username || '',
        room: roomId,
        seen: false,
        senderId: id || '',
        receiverId: userId || '',
      };
      setMessages(prev => [...prev, newMessage]);
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

      
      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? { ...msg, id: docRef.id } : msg
      ));
    } catch (error) {
      toast.error('Error sending message. Please try again later.');
      
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
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
  // mark user aseen to viewport 
   useEffect(() => {
    if (!roomId || !id) return;

    const observerOptions = {
      root: messageListRef.current,
      threshold: 0.5,
    };

    const observers: IntersectionObserver[] = [];

    messages.forEach((msg) => {
      // Only mark as seen if:
      // 1. Message is not from current user
      // 2. Message is addressed to current user
      // 3. Message is not already marked as seen
      if (msg.senderId === id || msg.receiverId !== id || msg.seen) return;

      const messageElement = document.getElementById(msg.id);
      if (!messageElement) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Update in Firebase
            const msgRef = doc(db, 'messages', msg.id);
            updateDoc(msgRef, { seen: true })
              .then(() => {
                // Update local state
                setMessages(prev => prev.map(m => 
                  m.id === msg.id ? { ...m, seen: true } : m
                ));
              })
              .catch(error => {
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
      observers.forEach(obs => obs.disconnect());
    };
  }, [messages, id, roomId]);

  
  useEffect(() => {
    const el = messagEnd.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-app">
      <div className="message-wrapper">
        <div className="message">Messages</div>
        <div
          className="message-list"
          ref={(el) => {
            if (el) {
              // Type assertion to bypass read-only restriction
              (messagEnd as React.MutableRefObject<HTMLDivElement>).current = el;
              (messageListRef as React.MutableRefObject<HTMLDivElement>).current = el;
            }
          }}
        >
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
                  {msg.createdAt instanceof Date ? msg.createdAt.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }) : ''}
                </span>
                {msg.user === username && (
                    <span className={`tick-status ${msg.seen ? 'seen' : ''}`}>
                      {msg.seen ? '✓✓' : '✓'}
                    </span>
                  )}
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
