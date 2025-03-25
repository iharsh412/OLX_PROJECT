import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import ICONS from '../../../assets';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store';
import LanguageSelector from '../../../Components/Atom/LanguageSelector';
import Place from '../../../Components/Atom/PlaceSelector';
import Item from '../../../Components/Atom/ItemsSelector';

export default function Navbar() {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state?.common?.token);

  function onClickSell() {
    if (token) {
      console.log('okk');
      navigate('/sell');
    } else {
      navigate('./login');
    }
  }

  function onClickCart() {
    if (token) {
      navigate('/cart');
    } else {
      navigate('./login');
    }
  }

  return (
    <div className="home_nav_wrapper">
      <div className="home_nav">
        <span className="home_nav_logo">
          <img src={ICONS.Olx} alt="" />
        </span>

        <div className="home_nav_place_wrapper">
          <Place />
        </div>

        <Item />

        <div className="home_nav_languageWrapper">
          <LanguageSelector />
        </div>

        <div className="home_nav_cart_login_sell">
          <button type="button" className="home_nav_cart" onClick={onClickCart}>
            <img
              src={ICONS.heartIcon}
              alt="cart"
              className="home_nav_cart_icon"
            />
          </button>

          <Link to="/login" className="home_nav_login">
            {token ? 'Logout' : 'Login'}
          </Link>
          <button type="button" className="home_nav_sell" onClick={onClickSell}>
            <img
              src={ICONS.sellImage}
              alt="sell"
              className="home_nav_sell_icon"
            />
            <span className="home_nav_sell_inner">
              <img
                src={ICONS.addIcon}
                alt="addIcon"
                className="home_nav_sell_add"
              />
              <span className="home_nav_sell_text">SELL</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
