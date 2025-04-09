import { Formik } from 'formik';
import { usePostSignupDataMutation } from '../../../Services/Api/module/imageApi';
import './signup.css';
import {
  VALIDATION,
  INITIAL_VALUES,
  FORM_VALUES,
  CLASSNAME,
  TEXT,
} from './constant';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import { COMMON_TEXT } from '../../../Shared/constant';

export default function Signup() {
  const navigate = useNavigate();

  const [post, { isLoading }] = usePostSignupDataMutation();
  async function handleSubmit(
    values: FORM_VALUES,
    { resetForm }: { resetForm: () => void }
  ) {
    const { confirmPassword, ...data } = { ...values };
    try {
      await post(data).unwrap();
      resetForm();
      navigate(ROUTES_CONFIG.VERIFICATION.path, { replace: true });
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
              <h2 className={CLASSNAME.TITLE}>{TEXT.TITLE}</h2>
              <form onSubmit={handleSubmit}>
                <div className={CLASSNAME.USERNAME_INPUT}>
                  <label htmlFor="useername">{TEXT.USERNAME} </label>
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
                  <label htmlFor="email">{TEXT.EMAIL} </label>
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
                  <label htmlFor="password">{TEXT.PASSWORD} </label>
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
                  <label htmlFor="password">{TEXT.CONFIRM_PASSWORD} </label>
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
                  disabled={isSubmitting || isLoading}
                >
                  {isLoading ? COMMON_TEXT.SENDING : TEXT.SUBMIT}
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
