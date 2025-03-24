import { useRef, useState, useEffect } from 'react';
import './loginOtpBox.css';

export default function OtpFill() {
  const lengthOfOtp = 4;
  const [otp, setOtp] = useState(Array(lengthOfOtp).fill(''));
  const elementRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (elementRef.current[0]) {
      elementRef.current[0].focus();
    }
  }, []);

  function handleChange(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < lengthOfOtp - 1) {
      elementRef.current[index + 1]?.focus();
    }
  }

  function handleBackspace(
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === 'Backspace') {
      const newOtp = [...otp];

      if (!newOtp[index] && index > 0) {
        elementRef.current[index - 1]?.focus();
      }

      newOtp[index] = '';
      setOtp(newOtp);
    }
  }

  return (
    <div className="login_otp_section_otpFillSection">
      {otp.map((value, index) => (
        <input
          key={`otp${index + 1}`}
          type="text"
          placeholder="-"
          maxLength={1}
          className="login_otp_section_otpFillSection_box"
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleBackspace(index, e)}
          value={value}
          ref={(e) => {
            elementRef.current[index] = e;
          }}
        />
      ))}
    </div>
  );
}
