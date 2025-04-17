import './chatUserSection.css';
import { CLASSNAME } from './constant';
const user = [
  {user:'hello', key:1},
  {user:'hello', key:3},
  {user:'hello', key:2},
  {user:'hello', key:4},
  {user:'hello', key:5},
   {user:'hello', key:6},
  {user:'hello', key:7},
  {user:'hello', key:8},
  {user:'hello', key:9},
  {user:'hello', key:10},
  {user:'hello', key:11},
];
export default function ChatUserSection() {
  return (
    <>
      <div className={CLASSNAME.WRAPPER}>
        {user.map((data) => (
          <div className={CLASSNAME.USER} key={data.key}>{data.user}</div>
        ))}
      </div>
    </>
  );
}
