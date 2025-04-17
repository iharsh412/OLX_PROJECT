import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { io, Socket } from 'socket.io-client';
import './chatSection.css';
import { CLASSNAME, ID, TEXT } from './constant';
import { TYPE } from '../../Interface/constant';
import ChatMsgSection from '../../Components/CustomComponents/ChatMsgSection/ChatMsgSection';
import ChatUserSection from '../../Components/CustomComponents/ChatUserSection';

let socket: Socket | null = null;

export default function ChatSection() {
  const { access } = useSelector((state: RootState) => state?.common);
  const inputRef = useRef<HTMLInputElement>(null);
  console.log('hello');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    console.log('hello');
    if (access && !socketRef.current) {
      socketRef.current = io('https://bc39-115-245-238-84.ngrok-free.app', { query: { authorization: access } });
      console.log(socketRef, 'socketRef');
      socketRef.current.on('connected', (data) => {
        console.log('Connected',data);
      });
      // socketRef.current.on('connected', (data) => {
      //   console.log('Server says:', data);
      // });
      socketRef.current.emit('create_room',{},(data:any) => {
        console.log('Server says:', data);
      });

      socketRef.current.on('message', (data) => {
        console.log('Received', data);
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [access]);

  const onclickSend = () => {
    const msg = inputRef.current?.value.trim();
    if (msg && socket) {
      socket.emit('message', msg);
      if (inputRef?.current?.value) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <div className={CLASSNAME.WRAPPER}>
      <h2 className={CLASSNAME.HEADER}>{TEXT.INBOX}</h2>
      <div className={CLASSNAME.CONTENT}>
        <div className={CLASSNAME.USER_SECTION}>
          <ChatUserSection />
        </div>
        <div className={CLASSNAME.MSG_SECTION}>
          <ChatMsgSection />
          <div className={CLASSNAME.MSG_SEND_WRAPPER}>
            <input
              ref={inputRef}
              type={TYPE.TEXT}
              placeholder={TEXT.TYPE_MSG}
              id={ID.MSG_INPUT}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onclickSend();
              }}
            />
            <button className={CLASSNAME.SEND_BUTTON} onClick={onclickSend}>
              {TEXT.SEND}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
