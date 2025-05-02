import { Heart } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { CLASSNAME } from '../../CustomComponents/ImageLayout/CarImage/constant';
import { CLASSNAME as SCHEMER_CLASSNAME, TEXT } from './constant';
import './schemer.css';

export default function Schemer() {
  const { pathname } = useLocation();

  return (
    <div className={`${CLASSNAME.WRAPPER} ${SCHEMER_CLASSNAME.COMMON}`}>
      <div className={`${CLASSNAME.IMAGE_WRAPPER} ${SCHEMER_CLASSNAME.COMMON}`}>
        <div className={`${CLASSNAME.IMAGE} ${SCHEMER_CLASSNAME.COMMON_BOX}`} />
        <button
          title={TEXT.WISHLIST}
          type="button"
          className={`${CLASSNAME.CART_WRAPPER} ${SCHEMER_CLASSNAME.COMMON_BOX}`}
        >
          {!pathname.includes('/ads') && <Heart color="#ccc" />}
        </button>
      </div>
      <div className={`${CLASSNAME.CONTENT} ${SCHEMER_CLASSNAME.COMMON}`}>
        <span
          className={`${CLASSNAME.COST} ${SCHEMER_CLASSNAME.COMMON_BOX} ${SCHEMER_CLASSNAME.COST}`}
        />
        <span
          className={`${CLASSNAME.DISTANCE} ${SCHEMER_CLASSNAME.COMMON_BOX} ${SCHEMER_CLASSNAME.DISTANCE}`}
        />
        <span
          className={`${CLASSNAME.NAME} ${SCHEMER_CLASSNAME.COMMON_BOX} ${SCHEMER_CLASSNAME.NAME}`}
        />
        <div
          className={`${CLASSNAME.PLACE_DATE_WRAPPER} ${SCHEMER_CLASSNAME.COMMON} ${SCHEMER_CLASSNAME.PLACE_DATE_WRAPPER}`}
        >
          <span
            className={`${CLASSNAME.PLACE} ${SCHEMER_CLASSNAME.COMMON_BOX} ${SCHEMER_CLASSNAME.PLACE}`}
          />
          <span
            className={`${CLASSNAME.DATE} ${SCHEMER_CLASSNAME.COMMON_BOX} ${SCHEMER_CLASSNAME.DATE}`}
          />
        </div>
      </div>
    </div>
  );
}
