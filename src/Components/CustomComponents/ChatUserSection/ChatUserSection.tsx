import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useContext, useEffect, useState } from 'react';
import './chatUserSection.css';
import { CLASSNAME } from './constant';
import { ChatContextType } from '../ChatWrapper/constant';
import { ChatContext } from '../ChatWrapper/ChatWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store';
import { setUserId } from '../../../Store/ChatUser';


// const user = [
//   { user: 'hello', key: 1 },
//   { user: 'hello', key: 3 },
//   { user: 'hello', key: 2 },
//   { user: 'hello', key: 4 },
//   { user: 'hello', key: 5 },
//   { user: 'hello', key: 6 },
//   { user: 'hello', key: 7 },
//   { user: 'hello', key: 8 },
//   { user: 'hello', key: 9 },
//   { user: 'hello', key: 10 },
//   { user: 'hello', key: 11 },
// ];

export default function ChatUserSection() {

  const { access } = useSelector((state: RootState) => state?.common);
  const { userId } = useSelector((state: RootState) => state?.chatUser);
  const { socket } = useContext(ChatContext) as ChatContextType;
  const [userList, setUserList] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      socket?.emit("create-room", { access, userId });
    }
  }, [socket, access, userId]);

  useEffect(() => {
    socket?.on("get-user-list", (data: any) => {
      setUserList(data);
    });
  }, [socket]);
  
  function handleClick() {
    dispatch(setUserId(userId));
  }

  return (
    <>
      <div className={CLASSNAME.WRAPPER}>
        {userList?.map((data: { key: Key | null | undefined; user: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
          <button className={CLASSNAME.USER} key={data.key} onClick={handleClick}>{data.user}</button>
        ))}
      </div>
    </>
  );
}
