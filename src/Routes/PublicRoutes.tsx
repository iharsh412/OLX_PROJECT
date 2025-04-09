import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import Dashboard from '../Views/Dashboard';
import { CustomRouter } from './RootRoutes';
import { HomeLayout } from '../Views/Home/HomeLayout';
import Login from '../Views/Login/LoginSection';
import LoginWithPhone from '../Views/Login/LoginContinueWithPhoneEmail';
import LoginPhoneSms from '../Views/Login/OtpSection/LoginOtp';
import TypeSection from '../Views/TypeSection';
import Signup from '../Views/Login/Signup';
import Signin from '../Views/Login/Signin';
import ForgetPass from "../Views/Login/ForgetPass"

// eslint-disable-next-line import/prefer-default-export
export const PUBLIC_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <HomeLayout />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
    children: [
      { index: true, element: <Dashboard /> },
      { path: ROUTES_CONFIG.LOGIN.path, element: <Login /> },
      { path: ROUTES_CONFIG.LOGIN_PHONE.path, element: <LoginWithPhone /> },
      { path: ROUTES_CONFIG.SIGNUP.path, element: <Signup /> },
      { path: ROUTES_CONFIG.SIGNIN.path, element: <Signin /> },
      { path: ROUTES_CONFIG.FORGETPASS.path, element: <ForgetPass /> },
      { path: ROUTES_CONFIG.LOGIN_PHONE_SMS.path, element: <LoginPhoneSms /> },
      { path: ROUTES_CONFIG.CATEGORY.path, element: <TypeSection /> },
    ],
  },

  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PUBLIC} />,
    title: 'Rendering wildcard',
  },
];
