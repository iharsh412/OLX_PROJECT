import './loginSection.css';
import {  Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import ImageSection from './LoginImage.tsx';
// import { signInWithGoogle } from '../../../firebase.ts';
import ICONS from '../../../assets';
// import { updateAuthState } from '../../../Store/Common';
import { toast } from 'react-toastify';
// import { RootState } from '../../../Store/index.ts';

export default function LoginPage() {
  // const { token } = useSelector((state: RootState) => state?.common);
  // console.log(token, 'token');

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  async function onClickGoogle() {
    toast.success("not working please signup")
    // try {
    //   const result = await signInWithGoogle();
    //   if (result?.user) {
    //     const token = await result?.user?.getIdToken();
    //     dispatch(
    //       updateAuthState({
    //         refresh: token,
    //         access: token,
    //         id: result?.user?.uid,
    //         username: result?.user?.displayName,
    //       })
    //     );
    //     navigate('/');
    //   } else {
    //     dispatch(
    //       updateAuthState({
    //         access: null,
    //         id: null,
    //         username: null,
    //         refresh: null,
    //       })
    //     );
    //   }
    // } catch (e) {
    //   console.log('error during signin', e);
    // }
  }
   
  // function onClickPhone() {
  //   navigate('/loginPhone');
  // }

  return (
    <div className="loginPageParent">
      <div className="loginPageChild">
        <ImageSection />
        {/* continue with phone */}
        {/* <button
          type="button"
          className="countinue_with_phone_parent"
          onClick={onClickPhone}
        >
          <span className="continue_with_phone_icon">
            <img src={ICONS.phone} alt="phone" />
          </span>
          <span className="continue_with_phone_text">Continue with phone</span>
        </button> */}

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

        <span className="login_Or_section">or</span>
        <Link to="/signup" type="button" className="login_signup">
          signup with email
        </Link>
        <div className="login_signin">
          <span>Already have an account?</span>
          <Link to="/signin" className="login_signin_link">
            Login
          </Link>
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
    </div>
  );
}
