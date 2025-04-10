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
import { COMMON_TEXT } from '../../../Shared/constant';
import { useState } from 'react';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import { toast, ToastContainer } from 'react-toastify';

export default function NewPass() {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState<boolean>(false);

  const [post, { isLoading }] = usePostChangePasswordDataMutation();
  async function handleSubmit(values: FORM_VALUES) {
    try {
      const response = await post({
        password: values.password,
        token: token,
        id: id,
      });
      setDisabled(true);
      console.log(response, 'response');
    } catch (error) {
      console.log(error, 'error');
      toast.error('Error in changing password');
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
                  <label htmlFor="password">{TEXT.PASSWORD}</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    title="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className={CLASSNAME.ERROR}>{errors.password}</div>
                  )}
                </div>
                <div className={CLASSNAME.CONFIRM_PASSWORD_INPUT}>
                  <label htmlFor="password"> {TEXT.CONFIRM_PASSWORD}</label>
                  <input
                    title="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
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
                  type="submit"
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
                        title="Login"
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
                 <footer className="login_footer_parent">
          <p className="login_footer_first_section">
            All your personal details are safe with us
          </p>
          <p className="login_footer_second_section">
            If you continue, you are accepting OLX Terms and Conditions and
            Privacy Policy
          </p>
        </footer>

                <ToastContainer />
              </form>
            </div>
          );
        }}
      </Formik>
    </>
  );
}
