import { Formik } from 'formik';
import './signin.css';
import { FORM_VALUES, INITIAL_VALUES, VALIDATION, CLASSNAME } from './constant';
import { ToastContainer, toast } from 'react-toastify';
import { usePostSigninDataMutation } from '../../../Services/Api/module/imageApi';
import { updateAuthState } from '../../../Store/Common';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES_CONFIG } from '../../../Shared/Constants';

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [post] = usePostSigninDataMutation();
  async function handleSubmit(
    values: FORM_VALUES,
    { resetForm }: { resetForm: () => void }
  ) {
    console.log(values);

    try {
      const response = await post(values).unwrap();

      toast('Login Successfull');
      resetForm();
      dispatch(updateAuthState(response));
      navigate('/', { replace: true });
    } catch (error) {
      toast.error((error as any)?.data?.detail);
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
              <h2 className={CLASSNAME.TITLE}>Sign In</h2>
              <form onSubmit={handleSubmit}>
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

                <button
                  className={CLASSNAME.SUBMIT_BUTTON}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>
                <ToastContainer />
              </form>
              <button
                className={CLASSNAME.FORGET}
                type="button"
                title="forget password"
                onClick={() =>
                  navigate(ROUTES_CONFIG.FORGETPASS.path, { replace: true })
                }
              >
                forget password?
              </button>
              <footer className="login_footer_parent">
          <p className="login_footer_first_section">
            All your personal details are safe with us
          </p>
          <p className="login_footer_second_section">
            If you continue, you are accepting OLX Terms and Conditions and
            Privacy Policy
          </p>
        </footer>
            </div>
          );
        }}
      </Formik>
    </>
  );
}
