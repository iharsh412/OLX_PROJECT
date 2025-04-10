import './verification.css';
import { CLASSNAME, TEXT } from './constant';
import { useNavigate } from 'react-router-dom';
import { ROUTES_CONFIG } from '../../../Shared/Constants';


export default function Verification() {
    const navigate= useNavigate()
  return (
    <div className={CLASSNAME.WRAPPER}>
      <span>{TEXT.VERIFICATION_TEXT}</span>
      <div className={CLASSNAME.TEXT_WRAPPER}>
        <button className={CLASSNAME.LOGIN} onClick={()=>navigate(ROUTES_CONFIG.SIGNIN.path,{replace:true})}>{TEXT.LOGIN}</button>
        <span className={CLASSNAME.TEXT}>{TEXT.LOGIN_TEXT}</span>
      </div>
      <footer className="login_footer_parent">
          <p className="login_footer_first_section">
            All your personal details are safe with us
          </p>
          <p className="login_footer_second_section">
            If you continue, you are accepting OLX Terms and Conditions and
            Privacy Policy
          </p>
        </footer>
    </div>
  );
}
