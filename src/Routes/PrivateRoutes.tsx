import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import { CustomRouter } from './RootRoutes';
import { HomeLayout } from '../Views/Home/HomeLayout';
import Login from '../Views/Login/LoginLayout';
import LoginWithPhone from '../Views/Login/LoginContinueWithPhoneEmail';
import LoginPhoneSms from '../Views/Login/OtpSection/LoginOtp';
import Dashboard from '../Views/Dashboard';
import SellLayout from '../Views/Sell';
import SellSection from '../Views/Sell/SellSection';
import Cart from '../Views/CartSection';
import Post from '../Components/Post';
import ProductDetail from "../Views/ImageDetail"

// eslint-disable-next-line import/prefer-default-export
export const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.ABOUT.path,
    element: '<ABOUT />',
    title: ROUTES_CONFIG.ABOUT.title,
  },
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <HomeLayout />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'login', element: <Login /> },
      { path: 'loginPhone', element: <LoginWithPhone /> },
      { path: 'loginphonesms', element: <LoginPhoneSms /> },
      { path: 'cart', element: <Cart /> },
      {path: "product/:productName/:productId", element: <ProductDetail/>},
      
    ],
  },
  {
    path: 'sell',
    element: <SellLayout />,
    title: 'SellSection',
    children: [
      { index: true, element: <SellSection /> },
      { path: 'attributes', element: <Post /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: 'Rendering wildcard',
  },
];
