import { LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../Store';
import { updateAuthState } from '../../../Store/Common';
import { usePostLogoutDataMutation } from '../../../Services/Api/module/imageApi';
import './loginUpDown.css';
import { dropdownItems, CLASSNAME } from './constant';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import Modal from '../Modal';
import { setWishlistCount } from '../../../Store/WishlistCount';
import { setUserId } from '../../../Store/ChatUser';
import { COMMON_TEXT } from '../../../Helper/constant';
import { LoginUpDownProps } from '../../../Helper/interface';

export default function LoginUpDown({
  setOpenProfile,
}: Readonly<LoginUpDownProps>) {
  const { username, refresh } = useSelector(
    (state: RootState) => state?.common
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post] = usePostLogoutDataMutation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('no');

  // on click any item
  const handleItemClick = () => {
    setOpenProfile?.((prev) => !prev);
  };
  // onclick logout
  const handleLogout = () => {
    try {
      post({ refresh }).unwrap();
      dispatch(setWishlistCount(0));
      dispatch(
        updateAuthState({
          refresh: null,
          access: null,
          id: null,
          username: null,
        })
      );
      dispatch(setUserId(null));
      toast.success(COMMON_TEXT.SIGN_OUT_SUCCESSFULLY);
      navigate(ROUTES_CONFIG.HOMEPAGE.path);
    } catch (error) {
      toast.error(COMMON_TEXT.ERROR_SIGNOUT);
    }
  };

  useEffect(() => {
    if (answer === 'yes') {
      handleLogout();
    }
  }, [answer]);

  return (
    <div className={CLASSNAME.PROFILE_DROPDOWN}>
      <div className={CLASSNAME.DROPDOWN_MENU}>
        <div className={CLASSNAME.PROFILE_SECTION}>
          <div className={CLASSNAME.PROFILE_HEADER}>
            <div className={CLASSNAME.PROFILE_INFO}>
              <div className={CLASSNAME.PROFILE_INITIAL}>{username?.[0]}</div>
              <h3>{username}</h3>
            </div>
            <button
              type="button"
              onClick={() => {
                handleItemClick();
                navigate(ROUTES_CONFIG.PROFILE.path);
              }}
              className={CLASSNAME.PROFILE_EDIT_PROFILE}
            >
              {COMMON_TEXT.VIEW_AND_EDIT_PROFILE}
            </button>
          </div>
        </div>

        <div className={CLASSNAME.PROFILE_MENU_ITEMS}>
          {dropdownItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.label}
                onClick={() => {
                  item?.clickHandler?.(navigate);
                }}
                className={CLASSNAME.PROFILE_MENU_ITEM}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            title={COMMON_TEXT.SIGNOUT}
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal(true);
            }}
            className={CLASSNAME.PROFILE_MENU_ITEM}
          >
            <LogOut />
            <span>{COMMON_TEXT.SIGNOUT}</span>
          </button>
        </div>
        {openModal && (
          <Modal
            setAnswer={setAnswer}
            setOpen={setOpenModal}
            text={COMMON_TEXT.ARE_YOU_SURE}
            setDropdown={() => setOpenProfile?.((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
}
