import { useContext,useRef } from 'react';
import './chatSection.css';
import { CLASSNAME, ID, TEXT } from './constant';
import { TYPE } from '../../Interface/constant';
import ChatMsgSection from '../../Components/CustomComponents/ChatMsgSection/ChatMsgSection';
import ChatUserSection from '../../Components/CustomComponents/ChatUserSection';
import { ChatContext } from '../../Components/CustomComponents/ChatWrapper/ChatWrapper';
import { ChatContextType } from '../../Components/CustomComponents/ChatWrapper/constant';



export default function ChatSection() {

  const { socket, setMessages } = useContext(ChatContext) as ChatContextType;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onclickSend = () => {
    const msg = inputRef.current?.value.trim();
    if (msg && socket) {
      socket?.emit('message', msg);
      setMessages((prev: any) => [...prev, { msg, user: 'sender' }]);
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
