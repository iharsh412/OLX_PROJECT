import React, { useEffect, useRef } from 'react';
import { LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../Store';
import { logout } from '../../../firebase';
import { updateAuthState } from '../../../Store/Common';
import { usePostLogoutDataMutation } from '../../../Services/Api/module/imageApi';

import './loginUpDown.css';
import {
  ProfileDropdownProps,
  dropdownItems,
  CLASSNAME,
  TEXT,
} from './constant';

const LoginUpDown: React.FC<ProfileDropdownProps> = ({ setOpenProfile }) => {
  const { username, refresh } = useSelector(
    (state: RootState) => state?.common
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post] = usePostLogoutDataMutation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // HANDLE CLICK
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenProfile?.(() => false);
    }
  };
  const handleItemClick = () => {
    setOpenProfile?.((prev) => !prev);
  };
  const handleLogout = () => {
    try {
       post({ refresh: refresh }).unwrap();
       logout();
       dispatch(
        updateAuthState({
          refresh: null,
          access: null,
          id: null,
          username: null,
        })
      );
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  // HOOKS

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={CLASSNAME.PROFILE_DROPDOWN} ref={dropdownRef}>
      <div className={CLASSNAME.DROPDOWN_MENU}>
        <div className={CLASSNAME.PROFILE_SECTION}>
          <div className={CLASSNAME.PROFILE_HEADER}>
            <div className={CLASSNAME.PROFILE_INITIAL}>{username?.[0]}</div>
            <div className={CLASSNAME.PROFILE_INFO}>
              <h3>{username}</h3>
              <button className={CLASSNAME.PROFILE_EDIT_PROFILE}>
                {TEXT.VIEW_EDIT}
              </button>
            </div>
          </div>
        </div>

        <div className={CLASSNAME.PROFILE_MENU_ITEMS}>
          {dropdownItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={handleItemClick}
                className={CLASSNAME.PROFILE_MENU_ITEM}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            key="logout"
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
