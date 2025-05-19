import { useNavigate, Outlet } from 'react-router-dom';
import ICONS from '../../assets';
import Footer from '../../Components/Footer';
import './sell.css';
import { CLASSNAME } from './constant';
import { COMMON_TEXT } from '../../Helper/constant';

export default function Sell() {
  const navigate = useNavigate();

  return (
    <div className={CLASSNAME.WRAPPER}>
      <header className={CLASSNAME.HEADER}>
        <button
          title={COMMON_TEXT.BACK}
          type="button"
          className={CLASSNAME.BACK_BUTTON}
          onClick={() => navigate(-1)}
        >
          <img src={ICONS.arrow} alt={COMMON_TEXT.IMG} />
        </button>
      </header>
      <h1 className={CLASSNAME.TITLE}>{COMMON_TEXT.POST_YOUR_AD}</h1>
      <div className={CLASSNAME.OUTLET}>
        <Outlet />
      </div>
      <div className={CLASSNAME.FOOTER}>
        <Footer />
      </div>
    </div>
  );
}
