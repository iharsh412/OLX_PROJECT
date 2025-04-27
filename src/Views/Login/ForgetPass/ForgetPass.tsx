import { Formik } from 'formik';
// import { usePostSignupDataMutation } from '../../../Services/Api/module/imageApi';
import './forgetPass.css';
import { usePostForgetPasswordDataMutation } from '../../../Services/Api/module/imageApi';
import {
  VALIDATION,
  INITIAL_VALUES,
  FORM_VALUES,
  CLASSNAME,
  TEXT,
} from './constant';
import { toast } from 'react-toastify';
import { COMMON_TEXT, TYPE } from '../../../Interface/constant';
import { useState } from 'react';
import {
  CLASSNAME as LOGIN_SECTION_CLASSNAME,
  TEXT as LOGIN_SECTION_TEXT,
} from '../LoginSection/constant';
import ICONS from '../../../assets';
import { Link } from 'react-router-dom';
import { ROUTES_CONFIG } from '../../../Shared/Constants';

export default function ForgetPass() {
 
  const [disabled, setDisabled] = useState<boolean>(false);
  const [post, { isLoading }] = usePostForgetPasswordDataMutation();

  //  submit
  async function handleSubmit(values: FORM_VALUES) {
    try {
      await post(values).unwrap();
      setDisabled(true);
      toast.success(TEXT.SUCCESS);
    } catch (error) {
      toast.error(TEXT.FAILURE);
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
                <Link className={CLASSNAME.BACK} to={ROUTES_CONFIG.SIGNIN.path}>
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
              {/* email section */}
              <div className={CLASSNAME.EMAIL_INPUT}>
                <label htmlFor={COMMON_TEXT.EMAIL_S}>Email
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
              {/* validation text */}
              <span className={CLASSNAME.TEXT}>{TEXT.VALID}</span>
              {/* send reset link text */}
              {!disabled && (
                <button
                  title={COMMON_TEXT.SUBMIT}
                  className={CLASSNAME.SUBMIT_BUTTON}
                  type={TYPE.SUBMIT}
                  disabled={isSubmitting || isLoading || disabled}
                  onClick={() => handleSubmit()}
                >
                  {isLoading ? COMMON_TEXT.SENDING : TEXT.SUBMIT_BUTTON}
                </button>
              )}
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
