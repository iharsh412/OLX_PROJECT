import { CLASSNAME } from './constant';
import './sample.css';
import { useParams } from 'react-router-dom';

export default function Sample() {
  const category = useParams();
  console.log(category, 'category');

  return (
    <div className={CLASSNAME.WRAPPER}>
      <div className={CLASSNAME.TEXT_SECTION}>
        <h3> Buy & Sell Used Bikes in India</h3>
      </div>
      <div className={CLASSNAME.MAIN_SECTION_WRAPPER}> 
        <div className={CLASSNAME.MAIN_SECTION_FILTER} ></div>
        <div className={CLASSNAME.MAIN_SECTION_IMAGE} ></div>

      </div>
    </div>
  );
}


