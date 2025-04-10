import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ICONS from '../../assets';
import { RootState } from '../../Store';
import LanguageSelector from '../CustomComponents/LanguageSelector';
import Place from '../CustomComponents/PlaceSelector';
import Item from '../CustomComponents/ItemsSelector';
import ProfileUpDown from '../CustomComponents/LoginUpDown';
import { CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT } from '../../Interface/constant';
import { ROUTES_CONFIG } from '../../Shared/Constants';

export default function Navbar() {

  const navigate = useNavigate();
  const { access } = useSelector((state: RootState) => state?.common);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
 
  async function onClickSell() {
    if (access) {   
      navigate(ROUTES_CONFIG.SELL.path);
    } else {
      navigate(ROUTES_CONFIG.LOGIN.path);
    }
  }

  function onClickCart() {
    if (access) {
      navigate(ROUTES_CONFIG.CART.path);
    } else {
      navigate(ROUTES_CONFIG.LOGIN.path);
    }
  }

  function onClickProfileUpDown() {
    setOpenProfile(!openProfile);
  }

  return (
    <div className={CLASSNAME.NAV_PARENT}>
      <div className={CLASSNAME.NAV}>
        <span
          className={CLASSNAME.LOGO}
          onClick={() => navigate(ROUTES_CONFIG.HOMEPAGE.path)}
        >
          <img src={ICONS.Olx} alt={COMMON_TEXT.IMG} />
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
              alt={COMMON_TEXT.IMG}
              className={CLASSNAME.CART_ICON}
            />
          </button>
          {access ? (
            <>
              <button className={CLASSNAME.CHAT}>
                <img src={ICONS.chat} alt={COMMON_TEXT.IMG} />
              </button>
              <button className={CLASSNAME.NOTIFICATION}>
                <img src={ICONS.notification} alt={COMMON_TEXT.IMG} />{' '}
              </button>
              <div className={CLASSNAME.PROFILE}>
                <span className={CLASSNAME.PROFILE_PHOTO}>
                  <img src={ICONS.watch} alt={COMMON_TEXT.IMG} />
                </span>
                <button
                  className={CLASSNAME.PROFILE_UPDOWN}
                  onClick={onClickProfileUpDown}
                >
                  <img src={ICONS.upDown} alt={COMMON_TEXT.IMG} />
                </button>
                {openProfile && (
                  <ProfileUpDown setOpenProfile={setOpenProfile} />
                )}
              </div>
            </>
          ) : (
            <Link to={ROUTES_CONFIG.LOGIN.path} className={CLASSNAME.LOGIN}>
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
              alt={COMMON_TEXT.IMG}
              className={CLASSNAME.SELL_ICON}
            />
            <span className={CLASSNAME.SELL_INNER}>
              <img
                src={ICONS.addIcon}
                alt={COMMON_TEXT.IMG}
                className={CLASSNAME.SELL_ADD}
              />
              <span className={CLASSNAME.SELL_TEXT}>{TEXT.SELL}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
