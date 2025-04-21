import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import ICONS from '../../assets';
import { RootState } from '../../Store';
// import LanguageSelector from '../CustomComponents/LanguageSelector';
// import Place from '../CustomComponents/PlaceSelector';
import Item from '../CustomComponents/ItemsSelector';
import ProfileUpDown from '../CustomComponents/LoginUpDown';
import { CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT, TYPE } from '../../Interface/constant';
import { ROUTES_CONFIG } from '../../Shared/Constants';

export default function Navbar() {

  const navigate = useNavigate();
  const { access, username } = useSelector((state: RootState) => state?.common);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const profileRef = useRef<HTMLButtonElement>(null);

  // click
  // handle click on sell
  function onClickSell() {
    if (access) {
      navigate(ROUTES_CONFIG.SELL.path);
    } else {
      navigate(ROUTES_CONFIG.LOGIN.path);
    }
  }
  // handle click on cart
  function onClickWishlist() {
    if (access) {
      navigate(ROUTES_CONFIG.WISHLIST.path);
    } else {
      navigate(ROUTES_CONFIG.LOGIN.path);
    }
  }
  // handle profile dropdown toggle
  function onClickProfileUpDown() {
    setOpenProfile(!openProfile);
  }
  //handle click on chat
  function handleClickChat() {
    navigate(ROUTES_CONFIG.CHAT.path);
  }

  //  Hooks
  // Close  dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setOpenProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className={CLASSNAME.NAV_PARENT}>
      <div className={CLASSNAME.NAV}>
        {/* olx logo */}
        <button
          type={TYPE.BUTTON}
          title={COMMON_TEXT.BUTTON}
          className={CLASSNAME.LOGO}
          onClick={() => navigate(ROUTES_CONFIG.HOMEPAGE.path)}
        >
          <img src={ICONS.Olx} alt={COMMON_TEXT.IMG} />
        </button>

        {/* place selector */}
        {/* <div className={CLASSNAME.PLACE_WRAPPER}>
          <Place />
        </div> */}

        {/* item selector */}
        <Item />

        {/* Language selector */}
        {/* <div className={CLASSNAME.LANGUAGE_WRAPPER}>
          <LanguageSelector />
        </div> */}
        {/* cart login sell section */}
        <div className={CLASSNAME.CART_LOGIN_SELL}>
          {/* cart section */}
          <button
            type={TYPE.BUTTON}
            className={CLASSNAME.CART}
            onClick={onClickWishlist}
            title={COMMON_TEXT.BUTTON}
          >
            <img
              src={ICONS.heartIcon}
              alt={COMMON_TEXT.IMG}
              className={CLASSNAME.CART_ICON}
            />
          </button>
          {/* If not logged in */}
          {access && (
            <>
              {/* chat section */}
              <button className={CLASSNAME.CHAT} onClick={handleClickChat}>
                <img src={ICONS.chat} alt={COMMON_TEXT.IMG} />
              </button>

              {/* notification section */}
              {/* <button className={CLASSNAME.NOTIFICATION}>
                <img src={ICONS.notification} alt={COMMON_TEXT.IMG} />
              </button> */}

              {/* Profile dropdown */}
              <button className={CLASSNAME.PROFILE} ref={profileRef}>
                <span className={CLASSNAME.PROFILE_PHOTO}>
                  <div
                    className={CLASSNAME.PROFILE_INITIAL}
                    onClick={onClickProfileUpDown}
                  >
                    {username?.[0]}
                  </div>
                </span>
                <span
                  className={CLASSNAME.PROFILE_UPDOWN}
                  onClick={onClickProfileUpDown}
                >
                  <img src={ICONS.upDown} alt={COMMON_TEXT.IMG} />
                </span>
                {openProfile && (
                  <ProfileUpDown setOpenProfile={setOpenProfile} />
                )}
              </button>
            </>
          )}
          {/* If not logged in, show login */}
          {!access && (
            <Link to={ROUTES_CONFIG.LOGIN.path} className={CLASSNAME.LOGIN}>
              Login
            </Link>
          )}
          {/* Sell button */}
          <button
            title={COMMON_TEXT.BUTTON}
            type={TYPE.BUTTON}
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
