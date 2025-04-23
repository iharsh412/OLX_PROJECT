import { LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../../Store';
// import { logout } from '../../../firebase';
import { updateAuthState } from '../../../Store/Common';
import { toast } from 'react-toastify';
import { usePostLogoutDataMutation } from '../../../Services/Api/module/imageApi';
import './loginUpDown.css';
import {
  ProfileDropdownProps,
  dropdownItems,
  CLASSNAME,
  TEXT,
} from './constant';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import { useEffect, useState } from 'react';
import Modal from '../../CustomComponents/Modal';
import { setWishlistCount } from '../../../Store/WishlistCount';
import { setUserId } from '../../../Store/ChatUser';

const LoginUpDown: React.FC<ProfileDropdownProps> = ({ setOpenProfile }) => {
  const { username, refresh } = useSelector(
    (state: RootState) => state?.common
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post] = usePostLogoutDataMutation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [answer, setAnswer] = useState<String>('no');
  console.log(openModal, 'openModal');

  // on click any item
  const handleItemClick = () => {
    setOpenProfile?.((prev) => !prev);
  };
  // onclick logout
  const handleLogout = () => {
    try {
      post({ refresh: refresh }).unwrap();
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
      toast.success(TEXT.SUCCESS);
      navigate(ROUTES_CONFIG.HOMEPAGE.path);
    } catch (error) {
      toast.error(TEXT.ERROR_LOGOUT);
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
            <div className={CLASSNAME.PROFILE_INITIAL}>{username?.[0]}</div>
            <div className={CLASSNAME.PROFILE_INFO}>
              <h3>{username}</h3>
              <Link
                onClick={handleItemClick}
                to={ROUTES_CONFIG.PROFILE.path}
                className={CLASSNAME.PROFILE_EDIT_PROFILE}
              >
                {TEXT.VIEW_EDIT}
              </Link>
            </div>
          </div>
        </div>

        <div className={CLASSNAME.PROFILE_MENU_ITEMS}>
          {dropdownItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => {
                  handleItemClick();
                  item.clickHandler && item?.clickHandler(navigate);
                }}
                className={CLASSNAME.PROFILE_MENU_ITEM}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            title={TEXT.LOGOUT}
            onClick={() => {
              setOpenModal(true);
              // handleItemClick();
            }}
            className={CLASSNAME.PROFILE_MENU_ITEM}
          >
            <LogOut />
            <span>{TEXT.LOGOUT}</span>
          </button>
        </div>
        {openModal && (
          <Modal
            setAnswer={setAnswer}
            setOpen={setOpenModal}
            text={TEXT.ARE_YOU_SURE}
            setDropdown={(dropdown: boolean) =>
              setOpenProfile?.(() => dropdown)
            }
          />
        )}
      </div>
    </div>
  );
};

export default LoginUpDown;
