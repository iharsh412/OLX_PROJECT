import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import Dashboard from '../Views/Dashboard';
import { CustomRouter } from './RootRoutes';
import HomeLayout from '../Views/Home';
import Login from '../Views/Authentication/LoginSection';
import TypeSection from '../Views/TypeSection';
import Signup from '../Views/Authentication/Signup';
import ProductDetail from '../Views/ImageDetail';
import Signin from '../Views/Authentication/Signin';
import ForgetPass from '../Views/Authentication/ForgetPassEmailValidation';
import Verification from '../Views/Authentication/Verification';
import NewPass from '../Views/Authentication/NewPass';

// eslint-disable-next-line import/prefer-default-export
export const PUBLIC_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <HomeLayout />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
    children: [
      { index: true, element: <Dashboard /> },
      { path: ROUTES_CONFIG.LOGIN.path, element: <Login /> },
      { path: ROUTES_CONFIG.SIGNUP.path, element: <Signup /> },
      { path: ROUTES_CONFIG.SIGNIN.path, element: <Signin /> },
      { path: ROUTES_CONFIG.FORGETPASS.path, element: <ForgetPass /> },
      { path: ROUTES_CONFIG.VERIFICATION.path, element: <Verification /> },
      { path: ROUTES_CONFIG.NEWPASSWORD.path, element: <NewPass /> },
      { path: ROUTES_CONFIG.PRODUCT.path, element: <ProductDetail /> },
      { path: ROUTES_CONFIG.CATEGORY.path, element: <TypeSection /> },
    ],
  },

  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PUBLIC} />,
    title: 'Rendering wildcard',
  },
];
