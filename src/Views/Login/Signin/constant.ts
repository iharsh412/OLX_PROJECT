import * as Yup from 'yup';
export interface FORM_VALUES {
  email: string;
  password: string;
}
export const INITIAL_VALUES = {
  email: '',
  password: '',
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
export const VALIDATION = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .matches(emailRegex, 'Please enter a valid email address'),
  password: Yup.string()
    .required('Password is required')
    // .matches(
    //   passwordRegex,
    //   'Password must be at least 8 characters, include uppercase, lowercase, number, and special character'
    // ),
});
export const CLASSNAME = {
  WRAPPER: 'signin_Wrapper',
  HEADER: 'signin_header',
  CROSS: 'signin_cross',
  BACK: 'signin_back',
  TITLE: 'signin_title',
  EMAIL_INPUT: 'signin_emailInput',
  PASSWORD_INPUT: 'signin_passwordInput',
  SUBMIT_BUTTON: 'signin_submitButton',
  ERROR: 'signin_error',
  FORGET: 'signin_forgetpass',
  SINUP: 'signin_signup',
  REQUIRED:"signin_required",
  EYE: "signin_isSeenPassword",
  INPUT_PASSWORD_WRAPPER:'signin_passwordWrapper',
};
export const TEXT = {
  LOGIN: 'Login',
  SIGN_IN: 'Sign In',
  FORGET_PASSWORD: 'forgot password?',
  LOGIN_SUCCESSFUL: 'Login Successfull',
  DONOT_HAVE_ACCOUNT: "Don't have an account ?",
  SIGN_UP: 'Sign Up',
};
