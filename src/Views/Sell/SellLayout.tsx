import { useNavigate, Outlet } from 'react-router-dom';
import ICONS from '../../assets';
import Footer from '../Home/Footer';
import './sellLayout.css';

export default function SellLayout() {
  const navigate = useNavigate();

  return (
    <div className="sell-section">
      <header className="sell-section__header">
        <button
          className="sell-section__back-button"
          onClick={() => navigate(-1)}
        >
          <img src={ICONS.arrow} alt="arrow" />
        </button>
      </header>
      <h1 className="sell-section__title">Post your Ad</h1>
      <div className="sell-section-Outlet">
        <Outlet />
      </div>
      <div className="sell-section-footer">
        <Footer />
      </div>
    </div>
  );
}
