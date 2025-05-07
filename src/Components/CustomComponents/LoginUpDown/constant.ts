import { User } from 'lucide-react';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import { DropdownItem } from '../../../Helper/interface';

export const dropdownItems: DropdownItem[] = [
  {
    icon: User,
    label: 'My ADS',
    clickHandler: (navigate) => {
      navigate(ROUTES_CONFIG.MYADS.path);
    },
  },
];
export const CLASSNAME = {
  PROFILE_DROPDOWN: 'profile-dropdown',
  DROPDOWN_MENU: 'dropdown-menu',
  PROFILE_SECTION: 'profile-section',
  PROFILE_HEADER: 'profile-header',
  PROFILE_INITIAL: 'profile-large-initial',
  PROFILE_INFO: 'profile-info',
  PROFILE_EDIT_PROFILE: 'edit-profile-button',
  PROFILE_MENU_ITEMS: 'menu-items',
  PROFILE_MENU_ITEM: 'menu-item',
};
