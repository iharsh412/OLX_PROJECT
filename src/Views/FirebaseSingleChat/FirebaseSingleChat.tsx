import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { CLASSNAME } from '../FirebaseChatApp/constant';
import MessageSection from '../../Components/ChatMsgSection/index';


export default function FirebaseSingleChatApp() {
  const { userId } = useSelector((state: RootState) => state.chatUser);
  const { id } = useSelector((state: RootState) => state?.common);

  const roomId =
    userId != null && id != null
      ? [userId, id].sort((a, b) => a - b).join('_')
      : '';

  return (
    <div className={CLASSNAME.CHAT_APP}>
      <MessageSection roomId={roomId} />
    </div>
  );
}
