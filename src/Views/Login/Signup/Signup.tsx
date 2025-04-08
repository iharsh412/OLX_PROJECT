import { Formik } from 'formik';
import { usePostSignupDataMutation } from '../../../Services/Api/module/imageApi';
import './signup.css';
import { VALIDATION, INITIAL_VALUES, FORM_VALUES, CLASSNAME } from './constant';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  
  const [post] = usePostSignupDataMutation();
  async function handleSubmit(values: FORM_VALUES,{ resetForm }: { resetForm: () => void }) {
    console.log(values);
    const { confirmPassword, ...data } = { ...values };
    try {
       await post(data).unwrap();
      toast('Login Successfull');
      resetForm()
      navigate('/');
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
          return (
            <div className={CLASSNAME.WRAPPER}>
              <h2 className={CLASSNAME.TITLE}>Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className={CLASSNAME.USERNAME_INPUT}>
                  <label htmlFor="useername">Username </label>
                  <input
                    title="Username"
                    type="text"
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username && (
                    <div className={CLASSNAME.ERROR}>{errors.username}</div>
                  )}
                </div>
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
                <div className={CLASSNAME.PASSWORD_INPUT}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className={CLASSNAME.ERROR}>{errors.password}</div>
                  )}
                </div>
                <div className={CLASSNAME.CONFIRM_PASSWORD_INPUT}>
                  <label htmlFor="password"> Confirm Password</label>
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
                  disabled={isSubmitting}
                >
                  Sign Up
                </button>
                <ToastContainer />
              </form>
            </div>
          );
        }}
      </Formik>
    </>
  );
}
