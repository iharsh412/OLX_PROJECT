import './loginSection.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import {  User } from 'firebase/auth';
import ImageSection from './LoginImage.tsx';
import { signInWithGoogle, logout } from '../../../firebase.ts';
import ICONS from '../../../assets';
import { updateAuthTokenRedux } from '../../../Store/Common';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../../../Store/index.ts';


export default function LoginPage() {

  const token = useSelector((state:RootState) => state?.common?.token)
  console.log(token,"token")
  const dispatch = useDispatch();



  const navigate = useNavigate();
  const [, setUser] = useState<User | null>(null);
  


  function onClickPhone() {
    navigate('/loginPhone');
  }

  async function onClickGoogle() {

    try {
      const result = await signInWithGoogle();


      if (result?.user) {
        setUser(result.user)
        const token = await result?.user?.getIdToken();
       

        dispatch(updateAuthTokenRedux({ token: token, uId: result?.user?.uid }));
      }
      else {
        setUser(null)
      }
    } catch (e) {
      console.log("error during signin", e);

    }
  }
  return (
    <div className="loginPageParent">
      <div className="loginPageChild">
        <ImageSection />
        {token ? (
          <>
            <p>Welcome, !</p>
            <button
              type="button"
              onClick={() => {
                logout();
                dispatch(updateAuthTokenRedux({token:null,uid:null}))

                navigate('/');
              }}
            >
              logout
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="countinue_with_phone_parent"
              onClick={onClickPhone}
            >
              <span className="continue_with_phone_icon">
                <img src={ICONS.phone} alt="phone" />
              </span>
              <span className="continue_with_phone_text">
                Continue with phone
              </span>
            </button>

            <button
              type="button"
              className="continue_with_google_parent"
              onClick={onClickGoogle}
            >
              <span className="continue_with_google_icon">
                <img src={ICONS.google} alt="google" />
              </span>
              <span className="continue_with_google_text">
                Continue with Google
              </span>
            </button>

            <span className="login_Or_section">OR</span>
            <Link to="/" type="button" className="login_login_with_email">
              Login with Email
            </Link>
          </>
        )}

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
    </div>
  );
}
