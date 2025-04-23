import { ClipLoader } from 'react-spinners';
import './loader.css';
import { CLASSNAME } from './constant';

export default function Loader() {
  return (
    <div className={CLASSNAME.LOADING}>
      <ClipLoader color="black" size={50} loading={true} />
    </div>
  );
}
