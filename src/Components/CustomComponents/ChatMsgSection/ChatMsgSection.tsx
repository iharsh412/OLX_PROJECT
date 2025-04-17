import './chatMsgSection.css';
import {CLASSNAME} from "./constant"
const msg = [
  { user: 'sender', msg: 'hello fheir wueiw ueriw wurwi wiruiwr wrbwb world', key:1},
  {
    user: 'receiver',
    msg: 'hello wo uwhirw oiw iuri wieuiweouw winrowner wneiwrld',
     key:2
  },
  { user: 'sender', msg: 'hello world', key:3 },
  { user: 'receiver', msg: 'hello world', key:8 },
  { user: 'sender', msg: 'hello fheir wueiw ueriw wurwi wiruiwr wrbwb world', key:4 },
  {
    user: 'receiver',
    msg: 'hello wo uwhirw oiw iuri wieuiweouw winrowner wneiwrld', key:5
  },
  { user: 'sender', msg: 'hello world' , key:6},
  { user: 'receiver', msg: 'hello world', key:7 },
];
export default function ChatMsgSection() {
  return (
    <>
      <div className={CLASSNAME.WRAPPER}>
        {msg.map((data) => (
          <div
           key={data.key}
            className={
              data.user === 'sender' ? `${CLASSNAME.SENDER}` : `${CLASSNAME.RECEIVER}`
            }
          >
            {data.msg}
          </div>
        ))}
      </div>
    </>
  );
}
