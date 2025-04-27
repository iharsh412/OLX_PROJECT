import { CLASSNAME } from './constant';
// import Sample from '../../Components/Sample';
import ChatApp from "../FirebaseChatApp/FirebaseChatApp.tsx"

export default function TypeSection() {
  return (
    <div className={CLASSNAME.WRAPPER}>
      {/* <Sample /> */}
      {/* <NewPass /> */}
      <ChatApp/>
    </div>
  );
}
