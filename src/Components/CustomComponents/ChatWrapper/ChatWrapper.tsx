import { io, Socket } from 'socket.io-client';
import { useEffect, createContext, useState, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store';
import { ChatContextType } from './constant';

export const ChatContext = createContext<ChatContextType | null>(null);

export default function ChatWrapper({ children }: { children: ReactNode }) {
  const { access } = useSelector((state: RootState) => state?.common);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<{ type: string; message: any }[]>(
    []
  );

  useEffect(() => {
    if (access) {
      const newSocket = io('', {
        query: { authorization: access },
      });
      setSocket(newSocket);
      newSocket.on('connected', (data) => {
        console.log('connected', data);
        setMessages((prev) => [
          ...prev,
          { type: 'server', message: 'Connected to server' },
        ]);
      });
    }
    return () => {
      socket?.disconnect();
    };
  }, [access]);

  return (
    <ChatContext.Provider value={{ socket, messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
}
