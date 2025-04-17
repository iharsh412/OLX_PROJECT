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

const LoginUpDown: React.FC<ProfileDropdownProps> = ({ setOpenProfile }) => {
  const { username, refresh } = useSelector(
    (state: RootState) => state?.common
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post] = usePostLogoutDataMutation();
  // Handle CLICK
  // on click any item
  const handleItemClick = () => {
    setOpenProfile?.((prev) => !prev);
  };
  // onclick logout
  const handleLogout = () => {
    try {
      post({ refresh: refresh }).unwrap();
      // logout(); // commenting this line to avoid firebase logout
      dispatch(
        updateAuthState({
          refresh: null,
          access: null,
          id: null,
          username: null,
        })
      );
      toast.success(TEXT.SUCCESS);
      navigate(ROUTES_CONFIG.HOMEPAGE.path);
    } catch (error) {
      toast.error(TEXT.ERROR_LOGOUT);
    }
  };

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
              handleItemClick();
              handleLogout();
            }}
            className={CLASSNAME.PROFILE_MENU_ITEM}
          >
            <LogOut />
            <span>{TEXT.LOGOUT}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginUpDown;
