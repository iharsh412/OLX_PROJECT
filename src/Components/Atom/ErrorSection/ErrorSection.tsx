import './errorSection.css';
import { CLASSNAME } from './constant';
import { COMMON_TEXT } from '../../../Helper/constant';

export default function ErrorSection() {
  return (
    <div className={CLASSNAME.ERROR}>
      <h1>{COMMON_TEXT.SOMETHING_WENT_WRONG}</h1>
    </div>
  );
}
