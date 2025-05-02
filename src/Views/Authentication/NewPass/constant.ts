import * as Yup from 'yup';

export const INITIAL_VALUES = {
  password: '',
  confirmPassword: '',
};
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
export const VALIDATION = Yup.object().shape({
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

export interface FORM_VALUES {
  password: string;
  confirmPassword: string;
}
export const CLASSNAME = {
  WRAPPER: 'newpass_Wrapper',
  TITLE: 'newpass_title',
  PASSWORD_INPUT: 'newpass_passwordInput',
  CONFIRM_PASSWORD_INPUT: 'newpass_confirmPasswordInput',
  SUBMIT_BUTTON: 'newpass_submitButton',
  EMAIL_INPUT: 'newpass_emailInput',
  ERROR: 'newpass_error',
  SUCCESS: 'newpass_success',
  SUCCESS_TEXT: 'newpass_sucessText',
  SUCCESS_LOGIN: 'newpass_sucessLogin',
  REQUIRED: 'newpass_required',
  EYE: 'newpass_isSeenPassword',
  INPUT_PASSWORD_WRAPPER: 'newpass_passwordWrapper',
};
export const TEXT = {
  TITLE: 'Forgot Password',
  CONFIRM_PASSWORD: 'Confirm Password',
  PASSWORD: 'New Password',
  FORGET_PASWORD: 'Forget Password',
  SUBMIT_BUTTON: 'Set',
  PASSWORD_CHANGED:
    '🔐  Your password has been changed. Please sign in again to continue.',
  LOGIN: 'Sign In',
  FAILURE: 'Error in changing password',
  SUCCESS: 'Password Changed Successfully',
};
