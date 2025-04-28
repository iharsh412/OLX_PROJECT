import { useNavigate, Outlet } from 'react-router-dom';
import ICONS from '../../assets';
import Footer from '../../Components/Footer';
import './sellLayout.css';
import { CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT, TYPE } from '../../Helper/constant';

export default function SellLayout() {
  const navigate = useNavigate();

  return (
    <div className={CLASSNAME.WRAPPER}>
      <header className={CLASSNAME.HEADER}>
        <button
          title={TEXT.BACK}
          type={TYPE.BUTTON}
          className={CLASSNAME.BACK_BUTTON}
          onClick={() => navigate(-1)}
        >
          <img src={ICONS.arrow} alt={COMMON_TEXT.IMG} />
        </button>
      </header>
      <h1 className={CLASSNAME.TITLE}>{TEXT.ADD}</h1>
      <div className={CLASSNAME.OUTLET}>
        <Outlet />
      </div>
      <div className={CLASSNAME.FOOTER}>
        <Footer />
      </div>
    </div>
  );
}
