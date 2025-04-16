import {  useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../Store';
// import { io, Socket } from 'socket.io-client';
import './chatSection.css';
import { CLASSNAME, ID, TEXT } from './constant';
import { TYPE } from '../../Interface/constant';

// let socket: Socket | null = null;

export default function ChatSection() {
//   const { access } = useSelector((state: RootState) => state?.common);
  const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     console.log('hello');
//     if (!socket) {
//       socket = io(`https://660d-112-196-113-3.ngrok-free.app`, {
//         query: {
//           authorization: access,
//         },
//       });
//       socket.on('connect', () => {
//         console.log('Connected', socket);
//       });
//       socket.on('connected', (data) => {
//         console.log('Server says:', data);
//       });
//       socket.on('message', (data) => {
//         console.log('Received', data);
//       });
//     }

//     return () => {
//       socket?.disconnect();
//       socket = null;
//     };
//   }, [access]);

  const onclickSend = () => {
    // const msg = inputRef.current?.value.trim();
    // if (msg && socket) {
    //   socket.emit('message', msg);
    //   if (inputRef?.current?.value) {
    //     inputRef.current.value = '';
    //   }
    // }
  };

  return (
    <div className={CLASSNAME.WRAPPER}>
      <h2 className={CLASSNAME.HEADER}>{TEXT.INBOX}</h2>
      <div className={CLASSNAME.CONTENT}>
        <div className={CLASSNAME.USER_SECTION}>user</div>
        <div className={CLASSNAME.MSG_SECTION}>
          msg
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
