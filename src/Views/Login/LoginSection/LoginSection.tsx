import './loginSection.css';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import ImageSection from './LoginImage.tsx';
import ICONS from '../../../assets';
import { toast } from 'react-toastify';
import { CLASSNAME, TEXT } from './constant.ts';
import { ROUTES_CONFIG } from '../../../Shared/Constants.ts';
import { COMMON_TEXT, TYPE } from '../../../Interface/constant.ts';

export default function LoginPage() {
 
   
  async function onClickGoogle() {
    toast.success(TEXT.SUCCESS);
      // through firebase authentiaction
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
    //  onclick on phone
  // function onClickPhone() {
  //   navigate('/loginPhone');
  // }

  return (
    <div className={CLASSNAME.WRAPPER}>
      <div className={CLASSNAME.SECTION}>
        <ImageSection />
        {/* if you want to add phone login then uncomment the code below */}
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
          type={TYPE.BUTTON}
          className={CLASSNAME.GOOGLE_WRAPPER}
          onClick={onClickGoogle}
        >
          <span className={CLASSNAME.GOOGLE_ICON}>
            <img src={ICONS.google} alt={COMMON_TEXT.IMG} />
          </span>
          <span className={CLASSNAME.GOOGLE_TEXT}>
            {TEXT.CONTINUE_WITH_GOOGLE}
          </span>
        </button>

        <span className={CLASSNAME.OR}>or</span>
        <Link
          to={ROUTES_CONFIG.SIGNUP.path}
          type={TYPE.BUTTON}
          className={CLASSNAME.SIGNUP}
        >
          {TEXT.SIGN_UP}
        </Link>
        <div className={CLASSNAME.SIGNIN}>
          <span>{TEXT.ALREADY_HAVE_ACCOUNT}</span>
          <Link
            to={ROUTES_CONFIG.SIGNIN.path}
            className={CLASSNAME.SIGNIN_TEXT}
          >
            {TEXT.LOGIN}
          </Link>
        </div>

        <footer className={CLASSNAME.FOOTER}>
          <p className={CLASSNAME.FOOTER_UPPER_TEXT}>{TEXT.PERSONAL_DETAIL}</p>
          <p className={CLASSNAME.FOOTER_SECOND_TEXT}>{TEXT.PRIVACY_POLICY}</p>
        </footer>
      </div>
    </div>
  );
}
