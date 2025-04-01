import './loginUpDown.css';
import React from 'react';
import { LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ProfileDropdownProps, dropdownItems, CLASSNAME } from './contant';

import { RootState } from '../../../Store';
import { logout } from '../../../firebase';
import { updateAuthTokenRedux } from '../../../Store/Common';

const LoginUpDown: React.FC<ProfileDropdownProps> = ({ setOpenProfile }) => {
  const userName = useSelector((state: RootState) => state?.common?.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onClickItem() {
    if (setOpenProfile) setOpenProfile((prev) => !prev);
  }
  return (
    <div className={CLASSNAME.PROFILE_DROPDOWN}>
      <div className={CLASSNAME.DROPDOWN_MENU}>
        <div className={CLASSNAME.PROFILE_SECTION}>
          <div className={CLASSNAME.PROFILE_HEADER}>
            <div className={CLASSNAME.PROFILE_HEADER}>H</div>
            <div className={CLASSNAME.PROFILE_INFO}>
              <h3>{userName}</h3>
              <button className={CLASSNAME.PROFILE_EDIT_PROFILE}>
                View and edit profile
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
                onClick={() => {
                  onClickItem();
                }}
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
              onClickItem();
              logout();
              dispatch(
                updateAuthTokenRedux({ token: null, uid: null, userName: null })
              );
              navigate('/');
            }}
            className={CLASSNAME.PROFILE_MENU_ITEM}
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginUpDown;
