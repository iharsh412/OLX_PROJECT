import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import { CustomRouter } from './RootRoutes';
import HomeLayout from '../Views/Home';
import Dashboard from '../Views/Dashboard';
import SellLayout from '../Views/SellLayout';
import SellSection from '../Components/CustomComponents/SellSection/SellSection';
import Wishlist from '../Views/WishlistSection';
import Post from '../Views/Post';
import ProductDetail from '../Views/ImageDetail';
import TypeSection from '../Views/TypeSection';
import NewPass from '../Views/Authentication/NewPass';
import MyAds from '../Views/MyAds';
import Profile from '../Views/ProfileSection';
import EditProfile from '../Views/EditProfile';
import FirebaseChatApp from '../Views/FirebaseChatApp';
import SingleChatApp from '../Views/FirebaseSingleChat';

const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <HomeLayout />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
    children: [
      { index: true, element: <Dashboard /> },
      { path: ROUTES_CONFIG.NEWPASSWORD.path, element: <NewPass /> },
      { path: ROUTES_CONFIG.WISHLIST.path, element: <Wishlist /> },
      { path: ROUTES_CONFIG.PRODUCT.path, element: <ProductDetail /> },
      { path: ROUTES_CONFIG.MYADS.path, element: <MyAds /> },
      { path: ROUTES_CONFIG.CATEGORY.path, element: <TypeSection /> },
      { path: ROUTES_CONFIG.PROFILE.path, element: <Profile /> },
      { path: ROUTES_CONFIG.EDIT_PROFILE.path, element: <EditProfile /> },
      { path: ROUTES_CONFIG.FIREBASE_CHAT.path, element: <FirebaseChatApp /> },
      { path: ROUTES_CONFIG.SINGLE_CHAT.path, element: <SingleChatApp /> },
    ],
  },
  {
    path: ROUTES_CONFIG.SELL.path,
    element: <SellLayout />,
    title: ROUTES_CONFIG.SELL.title,
    children: [
      { index: true, element: <SellSection /> },
      { path: ROUTES_CONFIG.ATTRIBUTES.path, element: <Post /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: 'Rendering wildcard',
  },
];

export { PRIVATE_ROUTES };
