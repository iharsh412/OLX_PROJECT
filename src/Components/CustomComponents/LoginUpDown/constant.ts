import { User, Package, CreditCard, HelpCircle, Settings } from 'lucide-react';
import {  ROUTES_CONFIG } from '../../../Shared/Constants';

export interface ProfileDropdownProps {
  setOpenProfile?: (arg0: (prev: boolean) => boolean) => void;
}

interface DropdownItem {
  icon: React.ElementType;
  label: string;
  clickHandler?: (arg: any) => void;
}

export const dropdownItems: DropdownItem[] = [
  {
    icon: User,
    label: 'My ADS',
    clickHandler: (navigate) => {
      navigate(ROUTES_CONFIG.MYADS.path)
    }
  },
  {
    icon: Package,
    label: 'Buy Business Packages',
  },
  {
    icon: CreditCard,
    label: 'Bought Packages & Billing',
  },
  {
    icon: HelpCircle,
    label: 'Help',
  },
  {
    icon: Settings,
    label: 'Settings',
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
export const TEXT = {
     VIEW_EDIT:" View and edit profile",
     LOGOUT:"Logout"
}
