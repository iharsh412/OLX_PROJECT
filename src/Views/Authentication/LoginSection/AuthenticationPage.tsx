import './authenticationPage.css';
import { Link } from 'react-router-dom';
import ImageSection from '../../../Components/Atom/ImageTransition';
import { CLASSNAME } from './constant';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import { TYPE, COMMON_TEXT } from '../../../Helper/constant';

export default function AuthenticationPage() {
  return (
    <div className={CLASSNAME.WRAPPER}>
      <div className={CLASSNAME.SECTION}>
        {/* image section */}
        <ImageSection />
        {/* signup section */}
        <Link
          to={ROUTES_CONFIG.SIGNUP.path}
          type={TYPE.BUTTON}
          className={CLASSNAME.SIGNUP}
        >
          {COMMON_TEXT.SIGN_UP_WITH_EMAIL}
        </Link>
        {/* signin section */}
        <div className={CLASSNAME.SIGNIN}>
          <span>{COMMON_TEXT.ALREADY_HAVE_ACCOUNT}</span>
          <Link
            to={ROUTES_CONFIG.SIGNIN.path}
            className={CLASSNAME.SIGNIN_TEXT}
          >
            {COMMON_TEXT.LOGIN}
          </Link>
        </div>
        {/* footer section */}
        <footer className={CLASSNAME.FOOTER}>
          <p className={CLASSNAME.FOOTER_UPPER_TEXT}>
            {COMMON_TEXT.PERSONAL_DETAIL}
          </p>
          <p className={CLASSNAME.FOOTER_SECOND_TEXT}>
            {COMMON_TEXT.PRIVACY_POLICY}
          </p>
        </footer>
      </div>
    </div>
  );
}
