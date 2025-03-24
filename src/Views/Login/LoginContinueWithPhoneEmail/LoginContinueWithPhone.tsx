import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useState } from 'react';
import { E164Number } from 'libphonenumber-js';
import './loginContinueWithPhone.css';
import { useNavigate } from 'react-router-dom';
import ICONS from '../../../assets';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState<E164Number | undefined>();
  const navigate = useNavigate();
  function onClickNext() {
    navigate('/loginphonesms', { state: { phone: phoneNumber } });
  }

  return (
    <div className="login_phone_number_parent">
      <div className="login_phone_number_child">
        <span className="login_phone_number_olx_logo">
          <img src={ICONS.Olx} alt="olx_logo" />
        </span>

        <span className="login_phone_number_text">Enter your phone number</span>

        <div className="login_phone_number_input">
          <PhoneInput
            placeholder="Phone Number"
            value={phoneNumber}
            defaultCountry="IN"
            onChange={setPhoneNumber}
          />
        </div>

        <button
          type="submit"
          className={`login_phone_number_next ${phoneNumber && phoneNumber.length === 13
              ? 'login_phone_number_validation'
              : ''
            }`}
          onClick={onClickNext}
          disabled={!phoneNumber || phoneNumber.length !== 13}
        >
          Next
        </button>

        <span className="login_phone_number_info">
          Your contact number is never shared with external parties nor do we
          use it to spam you in any way.
        </span>
      </div>
    </div>
  );
}
