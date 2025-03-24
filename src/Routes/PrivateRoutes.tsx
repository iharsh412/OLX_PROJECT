import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import { CustomRouter } from './RootRoutes';
import { HomeLayout } from '../Views/Home/HomeLayout';
import Login from '../Views/Login/LoginLayout';
import LoginWithPhone from "../Views/Login/LoginContinueWithPhoneEmail";
import LoginPhoneSms from "../Views/Login/OtpSection/LoginOtp"
import Dashboard from '../Views/Dashboard';
import SellSection from "../Views/Sell"
import Cart from "../Views/CartSection"

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
        { path: "login", element: <Login /> }
        , { path: "loginPhone", element: <LoginWithPhone /> }
        , { path: "loginphonesms", element: <LoginPhoneSms /> }
        ,{path: "cart",element:<Cart/>}
      ]
    },
  {
    path: 'sell',
    element: <SellSection/>,
    title: 'SellSection',
  },
  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: 'Rendering wildcard',
  },
];
