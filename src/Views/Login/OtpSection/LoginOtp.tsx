import './loginOtp.css';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line import/extensions, import/no-self-import
import OtpBox from './LoginOtpBox.tsx';
import ICONS from '../../../assets/index.ts';

export default function App() {
  const { state } = useLocation();

  return (
    <div className="login_otp_section_parent">
      <div className="login_otp_section_child">
        <span className="login_otp_section_olx_logo">
          <img src={ICONS.Olx} alt="olx_logo" />
        </span>
        <span className="login_otp_section_text">Enter verification code</span>
        <span className="login_otp_section_text_number">
          We sent a 4-digit code to <b>{state?.phone}</b>
        </span>
        <span className="login_otp_section_box">
          <OtpBox />
        </span>
        <span className="login_otp_section_resendSms">Resend code by SMS</span>
        <span className="login_otp_section_resendCode">
          Resend code by Call
        </span>
      </div>
    </div>
  );
}
