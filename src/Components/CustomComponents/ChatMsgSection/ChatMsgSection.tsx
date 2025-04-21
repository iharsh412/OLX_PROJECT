import './chatMsgSection.css';
import { CLASSNAME } from "./constant"
import { useContext, useEffect } from 'react';
import { ChatContext } from '../ChatWrapper/ChatWrapper';
import { ChatContextType } from '../ChatWrapper/constant';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store';


const msg = [
  { user: 'sender', msg: 'hello fheir wueiw ueriw wurwi wiruiwr wrbwb world', key: 1 },
  {
    user: 'receiver',
    msg: 'hello wo uwhirw oiw iuri wieuiweouw winrowner wneiwrld',
    key: 2
  },
  { user: 'sender', msg: 'hello world', key: 3 },
  { user: 'receiver', msg: 'hello world', key: 8 },
  { user: 'sender', msg: 'hello fheir wueiw ueriw wurwi wiruiwr wrbwb world', key: 4 },
  {
    user: 'receiver',
    msg: 'hello wo uwhirw oiw iuri wieuiweouw winrowner wneiwrld', key: 5
  },
  { user: 'sender', msg: 'hello world', key: 6 },
  { user: 'receiver', msg: 'hello world', key: 7 },
];

export default function ChatMsgSection() {
  const { socket, messages, setMessages } = useContext(ChatContext) as ChatContextType;
  console.log(messages, 'message');
  const { userId } = useSelector((state: RootState) => state?.chatUser);

  useEffect(() => {
    if (userId) {
      socket?.on("get-message", (data: any) => {
        setMessages((prev: any) => [...prev, data]);
      });
    }
  }, [userId, socket, setMessages]);

  return (
    <>
      <div className={CLASSNAME.WRAPPER}>
        {msg.map((data) => (
          <div
            key={data.key}
            className={
              data.user === 'sender' ? CLASSNAME.SENDER : CLASSNAME.RECEIVER
            }
          >
            {data.msg}
          </div>
        ))}
      </div>
    </>
  );
}
