import { Formik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { usePostSignupDataMutation } from '../../../Services/Api/module/imageApi';
import './signup.css';
import { VALIDATION, INITIAL_VALUES, FormValue, CLASSNAME } from './constant';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import { COMMON_TEXT, TYPE } from '../../../Helper/constant';
import { CLASSNAME as LOGIN_SECTION_CLASSNAME } from '../LoginSection/constant';
import ICONS from '../../../assets';

export default function Signup() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [post, { isLoading }] = usePostSignupDataMutation();

  // handle form submit
  async function handleSubmit(
    values: FormValue,
    { resetForm }: { resetForm: () => void }
  ) {
    const { confirmPassword, ...data } = { ...values };
    try {
      await post(data).unwrap();
      resetForm();
      navigate(ROUTES_CONFIG.VERIFICATION.path, {
        state: { email: values.email },
        replace: true,
      });
      toast.success(COMMON_TEXT.SIGNUP_SUCCESSFULLY);
    } catch (error) {
      toast.error((error as any)?.data?.email?.[0]);
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
        isSubmitting,
        setFieldValue,
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
              <h2 className={CLASSNAME.TITLE}>{COMMON_TEXT.SIGN_UP}</h2>
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
              {/* username */}
              <div className={CLASSNAME.USERNAME_INPUT}>
                <label htmlFor={COMMON_TEXT.USERNAME}>
                  {COMMON_TEXT.USERNAME}
                  <div className={CLASSNAME.REQUIRED}>*</div>{' '}
                </label>
                <input
                  title={COMMON_TEXT.USERNAME}
                  type="text"
                  name={COMMON_TEXT.USERNAME_S}
                  value={values.username}
                  onChange={(e) =>
                    setFieldValue('username', e.target.value.trim())
                  }
                  onBlur={handleBlur}
                  id={COMMON_TEXT.USERNAME}
                />
                {errors.username && touched.username && (
                  <div className={CLASSNAME.ERROR}>{errors.username}</div>
                )}
              </div>
              {/* email */}
              <div className={CLASSNAME.EMAIL_INPUT}>
                <label htmlFor={COMMON_TEXT.EMAIL_S}>
                  {COMMON_TEXT.EMAIL}
                  <div className={CLASSNAME.REQUIRED}>*</div>
                </label>

                <input
                  title={COMMON_TEXT.EMAIL_S}
                  type={TYPE.TEXT}
                  name="email"
                  value={values.email}
                  onChange={(e) =>
                    setFieldValue('email', e.target.value.trim())
                  }
                  onBlur={handleBlur}
                  id={COMMON_TEXT.EMAIL_S}
                />
                {errors.email && touched.email && (
                  <div className={CLASSNAME.ERROR}>{errors.email}</div>
                )}
              </div>
              {/* password */}
              <div className={CLASSNAME.PASSWORD_INPUT}>
                <label htmlFor={COMMON_TEXT.PASSWORD_S}>
                  {COMMON_TEXT.PASSWORD}
                  <div className={CLASSNAME.REQUIRED}>*</div>
                </label>
                <div className={CLASSNAME.INPUT_PASSWORD_WRAPPER}>
                  <input
                    name={COMMON_TEXT.PASSWORD_S}
                    title={COMMON_TEXT.PASSWORD_S}
                    type={isPasswordVisible ? TYPE.TEXT : TYPE.PASSWORD}
                    value={values.password}
                    onChange={(e) => {
                      setFieldValue('password', e.target.value.trim());
                    }}
                    onBlur={handleBlur}
                    id={COMMON_TEXT.PASSWORD_S}
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
              {/* confirm password */}
              <div className={CLASSNAME.CONFIRM_PASSWORD_INPUT}>
                <label htmlFor={COMMON_TEXT.CONFIRM_PASSWORD}>
                  {COMMON_TEXT.CONFIRM_PASSWORD}
                  <div className={CLASSNAME.REQUIRED}>*</div>
                </label>
                <div className={CLASSNAME.INPUT_PASSWORD_WRAPPER}>
                  <input
                    title={COMMON_TEXT.CONFIRM_PASSWORD_S}
                    name={COMMON_TEXT.CONFIRM_PASSWORD_S}
                    type={isConfirmPasswordVisible ? TYPE.TEXT : TYPE.PASSWORD}
                    value={values.confirmPassword}
                    onChange={(e) =>
                      setFieldValue('confirmPassword', e.target.value.trim())
                    }
                    onBlur={handleBlur}
                    id={COMMON_TEXT.CONFIRM_PASSWORD}
                  />
                  {values.confirmPassword && (
                    <button
                      type="button"
                      className={CLASSNAME.EYE}
                      onClick={() => {
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
                      }}
                    >
                      <img
                        src={
                          isConfirmPasswordVisible ? ICONS.closeEye : ICONS.eye
                        }
                        alt={COMMON_TEXT.IMG}
                      />
                    </button>
                  )}
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className={CLASSNAME.ERROR}>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              {/* send button */}
              <button
                className={CLASSNAME.SUBMIT_BUTTON}
                type="submit"
                disabled={isSubmitting || isLoading}
              >
                {isLoading ? COMMON_TEXT.SENDING : COMMON_TEXT.SIGN_UP}
              </button>
              {/* Sign in text */}
              <div className={CLASSNAME.SIGNIN}>
                <span>{COMMON_TEXT.HAVE_ACCOUNT}</span>
                <Link to={ROUTES_CONFIG.SIGNIN.path}>{COMMON_TEXT.LOGIN}</Link>
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
            </form>
          </div>
        );
      }}
    </Formik>
  );
}
