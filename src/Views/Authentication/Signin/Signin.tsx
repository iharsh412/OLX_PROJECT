import { Formik } from 'formik';
import './signin.css';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FormValue, INITIAL_VALUES, VALIDATION, CLASSNAME } from './constant';
import { usePostSigninDataMutation } from '../../../Services/Api/module/imageApi';
import { updateAuthState } from '../../../Store/Common';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import { COMMON_TEXT, TYPE } from '../../../Helper/constant';
import { CLASSNAME as LOGIN_SECTION_CLASSNAME } from '../LoginSection/constant';
import ICONS from '../../../assets';

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [post] = usePostSigninDataMutation();
  const passwordFocus = useRef<HTMLInputElement | null>(null);

  // handle submit
  async function handleSubmit(
    values: FormValue,
    { resetForm }: { resetForm: () => void }
  ) {
    try {
      const response = await post(values).unwrap();
      toast(COMMON_TEXT.LOGIN_SUCCESSFUL);
      resetForm();
      dispatch(updateAuthState(response));
      navigate(ROUTES_CONFIG.HOMEPAGE.path, { replace: true });
    } catch (error) {
      passwordFocus.current?.focus();
      toast.error((error as any)?.data?.detail);
    }
  }

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        setFieldValue,
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
              <h2 className={CLASSNAME.TITLE}>{COMMON_TEXT.LOGIN}</h2>
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
                  type={TYPE.TEXT}
                  id={COMMON_TEXT.EMAIL_S}
                  name={COMMON_TEXT.EMAIL_S}
                  value={values.email}
                  onChange={(e) =>
                    setFieldValue('email', e.target.value.trim())
                  }
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
                <div className={CLASSNAME.INPUT_PASSWORD_WRAPPER}>
                  <input
                    ref={passwordFocus}
                    type={isPasswordVisible ? TYPE.TEXT : TYPE.PASSWORD}
                    id={COMMON_TEXT.PASSWORD_S}
                    name={COMMON_TEXT.PASSWORD_S}
                    value={values.password}
                    onChange={(e) => {
                      setFieldValue('password', e.target.value.trim());
                    }}
                    onBlur={handleBlur}
                  />
                  {values.password && (
                    <button
                      type="button"
                      className={CLASSNAME.EYE}
                      onClick={() => {
                        setIsPasswordVisible(!isPasswordVisible);
                      }}
                    >
                      <img
                        src={isPasswordVisible ? ICONS.closeEye : ICONS.eye}
                        alt={COMMON_TEXT.IMG}
                      />
                    </button>
                  )}
                </div>
                {errors.password && touched.password && (
                  <div className={CLASSNAME.ERROR}>{errors.password}</div>
                )}
              </div>
              {/* submit button */}
              <button
                className={CLASSNAME.SUBMIT_BUTTON}
                type="button"
                disabled={isSubmitting}
              >
                {COMMON_TEXT.LOGIN}
              </button>
            </form>
            {/* forget password */}
            <button
              className={CLASSNAME.FORGET}
              type="button"
              title={COMMON_TEXT.PASSWORD_S}
              onClick={() => navigate(ROUTES_CONFIG.FORGETPASS.path)}
            >
              {COMMON_TEXT.FORGOT_PASSWORD}
            </button>
            {/* signup text */}
            <div className={CLASSNAME.SINUP}>
              <span>{COMMON_TEXT.DONOT_HAVE_ACCOUNT}</span>
              <Link to={ROUTES_CONFIG.SIGNUP.path}>{COMMON_TEXT.SIGN_UP}</Link>
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
      }}
    </Formik>
  );
}
