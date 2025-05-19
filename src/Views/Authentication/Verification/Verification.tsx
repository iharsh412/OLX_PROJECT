import './verification.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { CLASSNAME } from './constant';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import { CLASSNAME as LOGIN_SECTION_CLASSNAME } from '../LoginSection/constant';
import { COMMON_TEXT } from '../../../Helper/constant';

export default function Verification() {
  const navigate = useNavigate();
  const {
    state: { email },
  } = useLocation();

  return (
    <div className={CLASSNAME.WRAPPER}>
      {/* verification text */}
      <span>
        {COMMON_TEXT.VERIFICATION_TEXT}
        <div className={CLASSNAME.EMAIL}>{email}</div>
      </span>
      {/* login button and text */}
      <div className={CLASSNAME.TEXT_WRAPPER}>
        <button
          type="button"
          className={CLASSNAME.LOGIN}
          onClick={() => navigate(ROUTES_CONFIG.SIGNIN.path, { replace: true })}
        >
          {COMMON_TEXT.LOGIN}
        </button>
        <span className={CLASSNAME.TEXT}>{COMMON_TEXT.AFTER_VERIFICATION}</span>
      </div>
      {/* footer section */}
      <footer className={LOGIN_SECTION_CLASSNAME.FOOTER}>
        <p className={LOGIN_SECTION_CLASSNAME.FOOTER_UPPER_TEXT}>
          {COMMON_TEXT.PERSONAL_DETAIL}
        </p>
        <p className={LOGIN_SECTION_CLASSNAME.FOOTER_SECOND_TEXT}>
          {COMMON_TEXT.PRIVACY_POLICY}
        </p>
      </footer>
    </div>
  );
}
