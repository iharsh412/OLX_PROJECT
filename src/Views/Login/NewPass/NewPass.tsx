import { Formik } from 'formik';
import { usePostChangePasswordDataMutation } from '../../../Services/Api/module/imageApi';
import './newPass.css';
import {
  VALIDATION,
  INITIAL_VALUES,
  FORM_VALUES,
  CLASSNAME,
  TEXT,
} from './constant';
import { useNavigate, useParams } from 'react-router-dom';
import { COMMON_TEXT, TYPE } from '../../../Interface/constant';
import { useState } from 'react';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import { toast } from 'react-toastify';
import { CLASSNAME as LOGIN_SECTION_CLASSNAME, TEXT as LOGIN_SECTION_TEXT } from "../LoginSection/constant"

export default function NewPass() {

  const { id, token } = useParams();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [post, { isLoading }] = usePostChangePasswordDataMutation();

  // handle click
  async function handleSubmit(values: FORM_VALUES) {
    try {
      await post({
        password: values.password,
        token: token,
        id: id,
      }).unwrap;
      setDisabled(true);
      toast.success(TEXT.SUCCESS)
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
              <h2 className={CLASSNAME.TITLE}>{TEXT.FORGET_PASWORD}</h2>
              <form onSubmit={handleSubmit}>
                <div className={CLASSNAME.PASSWORD_INPUT}>
                  <label htmlFor={COMMON_TEXT.PASSWORD_S}>{TEXT.PASSWORD}</label>
                  <input
                    type={TYPE.PASSWORD}
                    name={COMMON_TEXT.PASSWORD_S}
                    title={COMMON_TEXT.PASSWORD}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className={CLASSNAME.ERROR}>{errors.password}</div>
                  )}
                </div>
                <div className={CLASSNAME.CONFIRM_PASSWORD_INPUT}>
                  <label htmlFor={COMMON_TEXT.PASSWORD_S}> {TEXT.CONFIRM_PASSWORD}</label>
                  <input
                    title={COMMON_TEXT.PASSWORD}
                    type={TYPE.PASSWORD}
                    name={COMMON_TEXT.PASSWORD_S}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className={CLASSNAME.ERROR}>
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <button
                  className={CLASSNAME.SUBMIT_BUTTON}
                  type={TYPE.SUBMIT}
                  disabled={isSubmitting || isLoading || disabled}
                >
                  {isLoading ? COMMON_TEXT.SENDING : TEXT.SUBMIT_BUTTON}
                </button>
                {disabled && (
                  <div className={CLASSNAME.SUCCESS}>
                    <span className={CLASSNAME.SUCCESS_TEXT}>
                      {TEXT.PASSWORD_CHANGED}
                    </span>
                    <span className={CLASSNAME.SUCCESS_LOGIN}>
                      <button
                        title={COMMON_TEXT.BUTTON}
                        type={TYPE.BUTTON}
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
