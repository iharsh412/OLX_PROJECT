import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import Dashboard from '../Views/Dashboard';
import { CustomRouter } from './RootRoutes';
import { HomeLayout } from '../Views/Home/HomeLayout';
import Login from '../Views/Login/LoginLayout';
import LoginWithPhone from '../Views/Login/LoginContinueWithPhoneEmail';
import LoginPhoneSms from '../Views/Login/OtpSection/LoginOtp';
// eslint-disable-next-line import/prefer-default-export
export const PUBLIC_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <HomeLayout />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'login', element: <Login /> },
      { path: 'loginPhone', element: <LoginWithPhone /> },
      { path: 'loginphonesms', element: <LoginPhoneSms /> },
    ],
  },
  {
    path: `${ROUTES_CONFIG.LOGIN.path}`,
    title: ROUTES_CONFIG.LOGIN.title,
    element: '<Login />',
  },
  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PUBLIC} />,
    title: 'Rendering wildcard',
  },
];
