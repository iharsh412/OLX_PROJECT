import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostChangePasswordDataMutation } from '../../../Services/Api/module/imageApi';
import './newPass.css';
import { VALIDATION, INITIAL_VALUES, FormValue, CLASSNAME } from './constant';
import { COMMON_TEXT, TYPE } from '../../../Helper/constant';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import { CLASSNAME as LOGIN_SECTION_CLASSNAME } from '../LoginSection/constant';
import ICONS from '../../../assets';

export default function NewPass() {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [post, { isLoading }] = usePostChangePasswordDataMutation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  // handle submit
  async function handleSubmit(values: FormValue) {
    try {
      await post({
        password: values.password,
        token,
        id,
      }).unwrap();
      setDisabled(true);
      toast.success(COMMON_TEXT.PASSWORD_CHANGED_SUCCESSFULLY);
    } catch (error) {
      toast.error(COMMON_TEXT.ERROR_IN_CHANGING_PASSWORD);
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
            <h2 className={CLASSNAME.TITLE}>{COMMON_TEXT.FORGET_PASWORD}</h2>
            <form onSubmit={handleSubmit}>
              {/* password input */}
              <div className={CLASSNAME.PASSWORD_INPUT}>
                <label htmlFor={COMMON_TEXT.PASSWORD_S}>
                  {COMMON_TEXT.NEW_PASSWORD}
                  <span className={CLASSNAME.REQUIRED}>*</span>
                </label>
                <div className={CLASSNAME.INPUT_PASSWORD_WRAPPER}>
                  <input
                    type={isPasswordVisible ? TYPE.TEXT : TYPE.PASSWORD}
                    name={COMMON_TEXT.PASSWORD_S}
                    title={COMMON_TEXT.PASSWORD}
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
              </div>
              {errors.password && touched.password && (
                <div className={CLASSNAME.ERROR}>{errors.password}</div>
              )}
              {/* confirm password input */}
              <div className={CLASSNAME.CONFIRM_PASSWORD_INPUT}>
                <label htmlFor={COMMON_TEXT.PASSWORD_S}>
                  {COMMON_TEXT.CONFIRM_PASSWORD}
                  <span className={CLASSNAME.REQUIRED}>*</span>
                </label>
                <div className={CLASSNAME.INPUT_PASSWORD_WRAPPER}>
                  <input
                    title={COMMON_TEXT.CONFIRM_PASSWORD_S}
                    type={isConfirmPasswordVisible ? TYPE.TEXT : TYPE.PASSWORD}
                    name={COMMON_TEXT.CONFIRM_PASSWORD_S}
                    value={values.confirmPassword}
                    onChange={(e) => {
                      setFieldValue('confirmPassword', e.target.value.trim());
                    }}
                    onBlur={handleBlur}
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
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <div className={CLASSNAME.ERROR}>{errors.confirmPassword}</div>
              )}
              {!disabled && (
                <button
                  className={CLASSNAME.SUBMIT_BUTTON}
                  type="submit"
                  disabled={isSubmitting || isLoading || disabled}
                >
                  {isLoading ? COMMON_TEXT.SENDING : COMMON_TEXT.SET}
                </button>
              )}
              {disabled && (
                <div className={CLASSNAME.SUCCESS}>
                  <span className={CLASSNAME.SUCCESS_TEXT}>
                    {COMMON_TEXT.PASSWORD_CHANGED}
                  </span>
                  <span className={CLASSNAME.SUCCESS_LOGIN}>
                    <button
                      title={COMMON_TEXT.BUTTON}
                      type="button"
                      onClick={() => {
                        navigate(ROUTES_CONFIG.SIGNIN.path, {
                          replace: true,
                        });
                      }}
                    >
                      {COMMON_TEXT.SIGN_IN}
                    </button>
                  </span>
                </div>
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
            </form>
          </div>
        );
      }}
    </Formik>
  );
}
