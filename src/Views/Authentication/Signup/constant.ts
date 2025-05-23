import * as Yup from 'yup';

export const INITIAL_VALUES = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const VALIDATION = Yup.object().shape({
  username: Yup.string()
    .required('Username  is required')
    .matches(
      /^[A-Za-z\s]+$/,
      ' Username should contain only alphabets and spaces'
    ),

  email: Yup.string()
    .required('Email is required')
    .matches(emailRegex, 'Please enter a valid email address'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must be at least 8 characters, include uppercase, lowercase, number, and special character'
    ),

  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});
export interface FormValue {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export const CLASSNAME = {
  WRAPPER: 'signup_Wrapper',
  HEADER: 'signup_Header',
  CROSS: 'signup_Cross',
  BACK: 'signup_Back',
  TITLE: 'signup_title',
  USERNAME_INPUT: 'signup_usernameInput',
  EMAIL_INPUT: 'signup_emailInput',
  PASSWORD_INPUT: 'signup_passwordInput',
  CONFIRM_PASSWORD_INPUT: 'signup_confirmPasswordInput',
  SUBMIT_BUTTON: 'signup_submitButton',
  ERROR: 'signup_error',
  SIGNIN: 'signup_signin',
  REQUIRED: 'signup_required',
  EYE: 'signup_isSeenPassword',
  INPUT_PASSWORD_WRAPPER: 'signup_passwordWrapper',
};
