import { Formik } from 'formik';
import './signin.css';
import {
  FORM_VALUES,
  INITIAL_VALUES,
  VALIDATION,
  CLASSNAME,
  TEXT,
} from './constant';
import { toast } from 'react-toastify';
import { usePostSigninDataMutation } from '../../../Services/Api/module/imageApi';
import { updateAuthState } from '../../../Store/Common';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import { COMMON_TEXT, TYPE } from '../../../Interface/constant';
import {
  CLASSNAME as LOGIN_SECTION_CLASSNAME,
  TEXT as LOGIN_SECTION_TEXT,
} from '../LoginSection/constant';
import ICONS from '../../../assets';
import { useRef } from 'react';

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [post] = usePostSigninDataMutation();
  const passwordFocus = useRef<HTMLInputElement | null>(null);
  // handle click
  // handle submit
  async function handleSubmit(
    values: FORM_VALUES,
    { resetForm }: { resetForm: () => void }
  ) {
    try {
      const response = await post(values).unwrap();
      toast(TEXT.LOGIN_SUCCESSFUL);
      resetForm();
      dispatch(updateAuthState(response));
      navigate(ROUTES_CONFIG.HOMEPAGE.path, { replace: true });
    } catch (error) {
      passwordFocus.current?.focus(); 
      toast.error((error as any)?.data?.detail);
    }
  }

  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <div className={CLASSNAME.WRAPPER}>
              {/* header */}
              <div className={CLASSNAME.HEADER}>
                {/* Back */}
                <Link className={CLASSNAME.BACK} to={ROUTES_CONFIG.LOGIN.path}>
                  <img src={ICONS.arrow} alt={COMMON_TEXT.IMG} />
                </Link>
                {/* text */}
                <h2 className={CLASSNAME.TITLE}>{TEXT.SIGN_IN}</h2>
                {/* cross */}
                <Link
                  className={CLASSNAME.CROSS}
                  to={ROUTES_CONFIG.HOMEPAGE.path}
                >
                  <img src={ICONS.cross} alt={COMMON_TEXT.IMG} />
                </Link>
              </div>
              {/* form section */}
              <form onSubmit={handleSubmit}>
                {/* email section */}
                <div className={CLASSNAME.EMAIL_INPUT}>
                  <label htmlFor={COMMON_TEXT.EMAIL_S}>
                    {COMMON_TEXT.EMAIL}
                    <div className={CLASSNAME.REQUIRED}>*</div>
                  </label>
                  <input
                    type={TYPE.EMAIL}
                    id={COMMON_TEXT.EMAIL_S}
                    name={COMMON_TEXT.EMAIL_S}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <div className={CLASSNAME.ERROR}>{errors.email}</div>
                  )}
                </div>
                {/* password section */}
                <div className={CLASSNAME.PASSWORD_INPUT}>
                  <label htmlFor={COMMON_TEXT.PASSWORD_S}>
                    {COMMON_TEXT.PASSWORD}
                    <div className={CLASSNAME.REQUIRED}>*</div>
                  </label>
                  <input
                    ref={passwordFocus}
                    type={TYPE.PASSWORD}
                    id={COMMON_TEXT.PASSWORD_S}
                    name={COMMON_TEXT.PASSWORD_S}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className={CLASSNAME.ERROR}>{errors.password}</div>
                  )}
                </div>
                {/* submit button */}
                <button
                  className={CLASSNAME.SUBMIT_BUTTON}
                  type={TYPE.SUBMIT}
                  disabled={isSubmitting}
                >
                  {TEXT.LOGIN}
                </button>
              </form>
              {/* forget password*/}
              <button
                className={CLASSNAME.FORGET}
                type={TYPE.BUTTON}
                title={COMMON_TEXT.PASSWORD_S}
                onClick={() => navigate(ROUTES_CONFIG.FORGETPASS.path)}
              >
                {TEXT.FORGET_PASSWORD}
              </button>
              {/* signup text */}
              <div className={CLASSNAME.SINUP}>
                <span>{TEXT.DONOT_HAVE_ACCOUNT}</span>
                <Link to={ROUTES_CONFIG.SIGNUP.path}>{TEXT.SIGN_UP}</Link>
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
        }}
      </Formik>
    </>
  );
}
