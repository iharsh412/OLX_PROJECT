import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ICONS from '../../../assets';
import { RootState } from '../../../Store';
import LanguageSelector from '../../../Components/Atom/LanguageSelector';
import Place from '../../../Components/Atom/PlaceSelector';
import Item from '../../../Components/Atom/ItemsSelector';
import ProfileUpDown from '../../../Components/Atom/LoginUpDown';
import { CLASSNAME } from './constant';

export default function Navbar() {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state?.common?.token);
  const [openProfile, setOpenProfile] = useState<boolean>(false);

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

  function onClickProfileUpDown() {
    setOpenProfile(!openProfile);
  }

  return (
    <div className={CLASSNAME.NAV_PARENT}>
      <div className={CLASSNAME.NAV}>
        <span className={CLASSNAME.LOGO}>
          <img src={ICONS.Olx} alt="img" />
        </span>

        <div className={CLASSNAME.PLACE_WRAPPER}>
          <Place />
        </div>

        <Item />

        <div className={CLASSNAME.LANGUAGE_WRAPPER}>
          <LanguageSelector />
        </div>

        <div className={CLASSNAME.CART_LOGIN_SELL}>
          <button
            type="button"
            className={CLASSNAME.CART}
            onClick={onClickCart}
          >
            <img
              src={ICONS.heartIcon}
              alt="img"
              className={CLASSNAME.CART_ICON}
            />
          </button>
          {token ? (
            <>
              <button className={CLASSNAME.CHAT}>
                <img src={ICONS.chat} alt="img" />
              </button>
              <button className={CLASSNAME.NOTIFICATION}>
                <img src={ICONS.notification} alt="img" />{' '}
              </button>
              <div className={CLASSNAME.PROFILE}>
                <span className={CLASSNAME.PROFILE_PHOTO}>
                  <img src={ICONS.watch} alt="img" />
                </span>
                <button
                  className={CLASSNAME.PROFILE_UPDOWN}
                  onClick={onClickProfileUpDown}
                >
                  <img src={ICONS.upDown} alt="img" />
                </button>
                {openProfile && (
                  <ProfileUpDown setOpenProfile={setOpenProfile} />
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className={CLASSNAME.LOGIN}>
              Login
            </Link>
          )}
          <button
            type="button"
            className={CLASSNAME.SELL}
            onClick={onClickSell}
          >
            <img
              src={ICONS.sellImage}
              alt="img"
              className={CLASSNAME.SELL_ICON}
            />
            <span className={CLASSNAME.SELL_INNER}>
              <img
                src={ICONS.addIcon}
                alt="img"
                className={CLASSNAME.SELL_ADD}
              />
              <span className={CLASSNAME.SELL_TEXT}>SELL</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
