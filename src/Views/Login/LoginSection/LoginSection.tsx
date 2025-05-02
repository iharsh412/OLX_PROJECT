import './loginSection.css';
import { Link } from 'react-router-dom';
import ImageSection from '../../../Components/Atom/ImageTransition';
import { CLASSNAME, TEXT } from './constant';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import { TYPE } from '../../../Helper/constant';

export default function LoginPage() {
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
          {TEXT.SIGN_UP}
        </Link>
        {/* signin section */}
        <div className={CLASSNAME.SIGNIN}>
          <span>{TEXT.ALREADY_HAVE_ACCOUNT}</span>
          <Link
            to={ROUTES_CONFIG.SIGNIN.path}
            className={CLASSNAME.SIGNIN_TEXT}
          >
            {TEXT.LOGIN}
          </Link>
        </div>
        {/* footer section */}
        <footer className={CLASSNAME.FOOTER}>
          <p className={CLASSNAME.FOOTER_UPPER_TEXT}>{TEXT.PERSONAL_DETAIL}</p>
          <p className={CLASSNAME.FOOTER_SECOND_TEXT}>{TEXT.PRIVACY_POLICY}</p>
        </footer>
      </div>
    </div>
  );
}
