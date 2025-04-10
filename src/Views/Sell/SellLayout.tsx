import { useNavigate, Outlet } from 'react-router-dom';
import ICONS from '../../assets';
import Footer from '../../Components/Footer';
import './sellLayout.css';
import { CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT } from '../../Interface/constant';

export default function SellLayout() {
  const navigate = useNavigate();

  return (
    <div className={CLASSNAME.SL.WRAPPER}>
      <header className={CLASSNAME.SL.HEADER}>
        <button
          title="Back"
          className={CLASSNAME.SL.BACK_BUTTON}
          onClick={() => navigate(-1)}
        >
          <img src={ICONS.arrow} alt={COMMON_TEXT.IMG} />
        </button>
      </header>
      <h1 className={CLASSNAME.SL.TITLE}>{TEXT.SL.ADD}</h1>
      <div className={CLASSNAME.SL.OUTLET}>
        <Outlet />
      </div>
      <div className={CLASSNAME.SL.FOOTER}>
        <Footer />
      </div>
    </div>
  );
}
