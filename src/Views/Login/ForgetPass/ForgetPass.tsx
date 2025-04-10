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
import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import { COMMON_TEXT } from '../../../Shared/constant';
import { useState } from 'react';

export default function ForgetPass() {
  // const navigate = useNavigate();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [post, { isLoading }] = usePostForgetPasswordDataMutation();
  async function handleSubmit(values: FORM_VALUES) {
    try {
      const response = await post(values);
      console.log(response);
      setDisabled(true);
      //   toast.success('Password reset link sent to your email address');
      // navigate('/newpassword');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, please try again');
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
              <h2 className={CLASSNAME.TITLE}>{TEXT.TITLE}</h2>
              <div className={CLASSNAME.EMAIL_INPUT}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <div className={CLASSNAME.ERROR}>{errors.email}</div>
                )}
              </div>
              <span className={CLASSNAME.TEXT}>{TEXT.VALID}</span>
              <button
              title='Submit'
                className={CLASSNAME.SUBMIT_BUTTON}
                type="submit"
                disabled={isSubmitting || isLoading || disabled}
                onClick={() => handleSubmit()}
              >
                {isLoading ? COMMON_TEXT.SENDING : TEXT.SUBMIT_BUTTON}
              </button>
              {disabled && (
                <span className={CLASSNAME.TEXT}>{TEXT.NEXT}</span>
              )}{' '}
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
            </div>
          );
        }}
      </Formik>
    </>
  );
}
