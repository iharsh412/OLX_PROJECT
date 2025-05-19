import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './firebaseChatApp.css';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { RootState } from '../../Store';
import { CLASSNAME } from './constant';
import MessageSection from '../../Components/CustomComponents/ChatMsgSection/index';
import { setUserId } from '../../Store/ChatUser/index';
import { COMMON_TEXT } from '../../Helper/constant';

export default function FirebaseChatApp() {
  const dispatch = useDispatch();
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const { id } = useSelector((state: RootState) => state?.common);
  const messageRef = collection(db, 'messages');
  const [uniqueUsers, setUniqueUsers] = useState<string[]>([]);
  const [roomId, setRoomId] = useState('');
  const [unreadCounts, setUnreadCounts] = useState<{
    [roomId: string]: number;
  }>({});

  useEffect(() => {
    const queryMessages = query(messageRef);

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let uniqueRooms: Set<string> = new Set();
      const counts: { [roomId: string]: number } = {};
      snapshot.forEach((doc) => {
        if (doc.data().room.split('_').includes(String(id))) {
          uniqueRooms.add(doc.data().room);
          if (doc.data().receiverId == id && !doc.data().seen) {
            counts[doc.data().room] = (counts[doc.data().room] || 0) + 1;
          }
        }
      });
      setUniqueUsers(Array.from(uniqueRooms));
      setUnreadCounts(counts);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dispatch(setUserId(receiverId));
  }, [receiverId]);

  return (
    <>
      {}
      {uniqueUsers.length === 0 ? (
        <div className={CLASSNAME.NO_USERS}>{COMMON_TEXT.NO_CONVERSATIONS}</div>
      ) : (
        <div className={CLASSNAME.CHAT_APP}>
          <div className={CLASSNAME.USER_WRAPPER}>
            <div className={CLASSNAME.USER}>{COMMON_TEXT.USER}</div>
            <div className={CLASSNAME.USER_LIST}>
              {uniqueUsers.map((user) => (
                <button
                  type="button"
                  key={user}
                  className={`${CLASSNAME.USER_ITEM} ${user == roomId ? CLASSNAME.ACTIVE_USER : ''} `}
                  disabled={user == roomId}
                  onClick={() => {
                    setRoomId(user);
                    setReceiverId(
                      user.split('_')[0] == id
                        ? user.split('_')[1]
                        : user.split('_')[0]
                    );
                  }}
                >
                  {user}
                  {user !== roomId && unreadCounts[user] > 0 && (
                    <span className={CLASSNAME.UNREAD}>
                      {unreadCounts[user]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <MessageSection roomId={roomId} />
        </div>
      )}
    </>
  );
}
