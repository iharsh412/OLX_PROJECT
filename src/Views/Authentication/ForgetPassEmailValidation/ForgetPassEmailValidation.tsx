import { Formik } from 'formik';
import './forgetPassEmailValidation.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { usePostForgetPasswordDataMutation } from '../../../Services/Api/module/imageApi';
import { VALIDATION, INITIAL_VALUES, FormValue, CLASSNAME } from './constant';
import { COMMON_TEXT, TYPE } from '../../../Helper/constant';
import { CLASSNAME as LOGIN_SECTION_CLASSNAME } from '../LoginSection/constant';
import ICONS from '../../../assets';
import { ROUTES_CONFIG } from '../../../Shared/Constants';

export default function ForgetPassEmailValidation() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [post, { isLoading }] = usePostForgetPasswordDataMutation();

  //  submit
  async function handleSubmit(values: FormValue) {
    try {
      await post(values).unwrap();
      setDisabled(true);
      toast.success(COMMON_TEXT.CHECK_YOUR_INBOX);
    } catch (error) {
      toast.error(COMMON_TEXT.SOMETHING_WENT_WRONG_TRY_AGAIN);
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
        setFieldValue,
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
              <h2 className={CLASSNAME.TITLE}>{COMMON_TEXT.FORGOT_PASSWORD}</h2>
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
              <label htmlFor={COMMON_TEXT.EMAIL_S}>
                Email
                <div className={CLASSNAME.REQUIRED}>*</div>
              </label>
              <input
                type={TYPE.TEXT}
                id={COMMON_TEXT.EMAIL_S}
                name={COMMON_TEXT.EMAIL_S}
                value={values.email}
                onChange={(e) => setFieldValue('email', e.target.value.trim())}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <div className={CLASSNAME.ERROR}>{errors.email}</div>
              )}
            </div>
            {/* validation text */}
            <span className={CLASSNAME.TEXT}>
              {COMMON_TEXT.PLEASE_ENTER_YOUR_EMAIL}
            </span>
            {/* send reset link text */}
            {!disabled && (
              <button
                title={COMMON_TEXT.SUBMIT}
                className={CLASSNAME.SUBMIT_BUTTON}
                type="submit"
                disabled={isSubmitting || isLoading || disabled}
                onClick={() => handleSubmit()}
              >
                {isLoading ? COMMON_TEXT.SENDING : COMMON_TEXT.SEND_RESET_LINK}
              </button>
            )}
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
