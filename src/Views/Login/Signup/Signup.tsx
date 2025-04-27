import { Formik } from 'formik';
import { useState } from 'react';
import { usePostSignupDataMutation } from '../../../Services/Api/module/imageApi';
import './signup.css';
import {
  VALIDATION,
  INITIAL_VALUES,
  FORM_VALUES,
  CLASSNAME,
  TEXT,
} from './constant';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import { COMMON_TEXT, TYPE } from '../../../Interface/constant';
import {
  CLASSNAME as LOGIN_SECTION_CLASSNAME,
  TEXT as LOGIN_SECTION_TEXT,
} from '../LoginSection/constant';
import ICONS from '../../../assets';



export default function Signup() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [post, { isLoading }] = usePostSignupDataMutation();


  // handle form submit
  async function handleSubmit(
    values: FORM_VALUES,
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
      toast.success(TEXT.SUCCESS);
    } catch (error) {
      toast.error((error as any)?.data?.email?.[0]);
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
          console.log(values.email, 'email');
          return (
            <div className={CLASSNAME.WRAPPER}>
              {/* header */}
              <div className={CLASSNAME.HEADER}>
                {/* Back */}
                <Link className={CLASSNAME.BACK} to={ROUTES_CONFIG.LOGIN.path}>
                  <img src={ICONS.arrow} alt={COMMON_TEXT.IMG} />
                </Link>
                {/* text */}
                <h2 className={CLASSNAME.TITLE}>{TEXT.TITLE}</h2>
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
                  <label htmlFor={TEXT.USERNAME}>{TEXT.USERNAME}
                    <div className={CLASSNAME.REQUIRED}>*</div> </label>
                  <input
                    title={TEXT.USERNAME}
                    type={TYPE.TEXT}
                    name={TEXT.USERNAME_S}
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id={TEXT.USERNAME}
                  />
                  {errors.username && touched.username && (
                    <div className={CLASSNAME.ERROR}>{errors.username}</div>
                  )}
                </div>
                {/* email */}
                <div className={CLASSNAME.EMAIL_INPUT}>
                  <label htmlFor={COMMON_TEXT.EMAIL_S}>
                    {TEXT.EMAIL}
                    <div className={CLASSNAME.REQUIRED}>*</div>
                  </label>

                  <input
                    title={COMMON_TEXT.EMAIL_S}
                    type={TYPE.EMAIL}
                    name={COMMON_TEXT.EMAIL_S}
                    value={values.email}
                    onChange={handleChange}
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
                    {TEXT.PASSWORD}
                    <div className={CLASSNAME.REQUIRED}>*</div>
                  </label>
                  <div className={CLASSNAME.INPUT_PASSWORD_WRAPPER}>
                    <input
                      name={COMMON_TEXT.PASSWORD_S}
                      title={COMMON_TEXT.PASSWORD_S}
                      type={isPasswordVisible ? TYPE.TEXT : TYPE.PASSWORD}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id={COMMON_TEXT.PASSWORD_S}
                    />
                    {values.password && <button className={CLASSNAME.EYE} onClick={() => { setIsPasswordVisible(!isPasswordVisible) }}><img src={isPasswordVisible ? ICONS.closeEye : ICONS.eye} alt={COMMON_TEXT.IMG} /></button>}
                  </div>
                  {errors.password && touched.password && (
                    <div className={CLASSNAME.ERROR}>{errors.password}</div>
                  )}
                </div>
                {/* confirm password */}
                <div className={CLASSNAME.CONFIRM_PASSWORD_INPUT}>
                  <label htmlFor={TEXT.CONFIRM_PASSWORD}>
                    {TEXT.CONFIRM_PASSWORD}
                    <div className={CLASSNAME.REQUIRED}>*</div>
                  </label>
                  <div className={CLASSNAME.INPUT_PASSWORD_WRAPPER}>
                    <input
                      title={COMMON_TEXT.CONFIRM_PASSWORD_S}
                      name={COMMON_TEXT.CONFIRM_PASSWORD_S}
                      type={isConfirmPasswordVisible ? TYPE.TEXT : TYPE.PASSWORD}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id={TEXT.CONFIRM_PASSWORD}
                    />
                    {values.confirmPassword && <button className={CLASSNAME.EYE} onClick={() => { setIsConfirmPasswordVisible(!isConfirmPasswordVisible) }}><img src={isConfirmPasswordVisible ? ICONS.closeEye : ICONS.eye} alt={COMMON_TEXT.IMG} /></button>}
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
                  type={TYPE.SUBMIT}
                  disabled={isSubmitting || isLoading}
                >
                  {isLoading ? COMMON_TEXT.SENDING : TEXT.SUBMIT}
                </button>
                {/* Sign in text */}
                <div className={CLASSNAME.SIGNIN}>
                  <span>{TEXT.HAVE_ACCOUNT}</span>
                  <Link to={ROUTES_CONFIG.SIGNIN.path}>{TEXT.SIGN_IN}</Link>
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
              </form>
            </div>
          );
        }}
      </Formik>
    </>
  );
}
