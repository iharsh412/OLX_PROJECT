import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostChangePasswordDataMutation } from '../../../Services/Api/module/imageApi';
import './newPass.css';
import {
  VALIDATION,
  INITIAL_VALUES,
  FormValue,
  CLASSNAME,
  TEXT,
} from './constant';
import { COMMON_TEXT, TYPE } from '../../../Helper/constant';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import {
  CLASSNAME as LOGIN_SECTION_CLASSNAME,
  TEXT as LOGIN_SECTION_TEXT,
} from '../LoginSection/constant';
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
      toast.success(TEXT.SUCCESS);
    } catch (error) {
      toast.error(TEXT.FAILURE);
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
            <h2 className={CLASSNAME.TITLE}>{TEXT.FORGET_PASWORD}</h2>
            <form onSubmit={handleSubmit}>
              {/* password input */}
              <div className={CLASSNAME.PASSWORD_INPUT}>
                <label htmlFor={COMMON_TEXT.PASSWORD_S}>
                  {TEXT.PASSWORD}
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
                  {TEXT.CONFIRM_PASSWORD}
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
                  {isLoading ? COMMON_TEXT.SENDING : TEXT.SUBMIT_BUTTON}
                </button>
              )}
              {disabled && (
                <div className={CLASSNAME.SUCCESS}>
                  <span className={CLASSNAME.SUCCESS_TEXT}>
                    {TEXT.PASSWORD_CHANGED}
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
                      {TEXT.LOGIN}
                    </button>
                  </span>
                </div>
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
            </form>
          </div>
        );
      }}
    </Formik>
  );
}
