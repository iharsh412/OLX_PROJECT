// libs
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// firebse
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';

// redux
import { RootState } from '../../Store';
import { setUserId } from '../../Store/ChatUser/index';

// components
import MessageSection from '../../Components/CustomComponents/ChatMsg/index';

// constants
import CLASSNAME from '../../Helper/classes';
import { COMMON_TEXT } from '../../Helper/text';

export default function MultiChat() {
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
      const uniqueRooms: Set<string> = new Set();
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
        <div className={CLASSNAME.FIREBASE.NO_USERS}>
          {COMMON_TEXT.NO_CONVERSATIONS}
        </div>
      ) : (
        <div className={CLASSNAME.FIREBASE.CHAT_APP}>
          <div className={CLASSNAME.FIREBASE.USER_WRAPPER}>
            <div className={CLASSNAME.FIREBASE.USER}>{COMMON_TEXT.USER}</div>
            <div className={CLASSNAME.FIREBASE.USER_LIST}>
              {uniqueUsers.map((user) => (
                <button
                  type="button"
                  key={user}
                  className={`${CLASSNAME.FIREBASE.USER_ITEM} ${user == roomId ? CLASSNAME.FIREBASE.ACTIVE_USER : ''} `}
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
                    <span className={CLASSNAME.FIREBASE.UNREAD}>
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
