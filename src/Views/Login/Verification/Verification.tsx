import './verification.css';
import { CLASSNAME, TEXT } from './constant';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import {
  CLASSNAME as LOGIN_SECTION_CLASSNAME,
  TEXT as LOGIN_SECTION_TEXT,
} from '../LoginSection/constant';

export default function Verification() {
  const navigate = useNavigate();
  const {
    state: { email },
  } = useLocation();

  return (
    <div className={CLASSNAME.WRAPPER}>
      {/* verification text */}
      <span>
        {TEXT.VERIFICATION_TEXT}
        <div className={CLASSNAME.EMAIL}>{email}</div>
      </span>
      {/* login button and text */}
      <div className={CLASSNAME.TEXT_WRAPPER}>
        <button
          className={CLASSNAME.LOGIN}
          onClick={() => navigate(ROUTES_CONFIG.SIGNIN.path, { replace: true })}
        >
          {TEXT.LOGIN}
        </button>
        <span className={CLASSNAME.TEXT}>{TEXT.LOGIN_TEXT}</span>
      </div>
      {/* footer section */}
      <footer className={LOGIN_SECTION_CLASSNAME.FOOTER}>
        <p className={LOGIN_SECTION_CLASSNAME.FOOTER_UPPER_TEXT}>
          {LOGIN_SECTION_TEXT.PERSONAL_DETAIL}
        </p>
        <p className={LOGIN_SECTION_CLASSNAME.FOOTER_SECOND_TEXT}>
          {LOGIN_SECTION_TEXT.PRIVACY_POLICY}
        </p>
      </footer>
    </div>
  );
}
