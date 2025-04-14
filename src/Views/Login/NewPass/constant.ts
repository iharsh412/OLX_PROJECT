import * as Yup from 'yup';

export const INITIAL_VALUES = {
  password: '',
  confirmPassword: '',
};
export const VALIDATION = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
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
  SUCCESS:"newPass_success",
  SUCCESS_TEXT:"newPass_sucessText",
  SUCCESS_LOGIN:"newPass_sucessLogin"

};
export const TEXT = {
  TITLE: 'Forgot Password',
  CONFIRM_PASSWORD: 'Confirm Password',
  PASSWORD: 'New Password',
  FORGET_PASWORD: 'Forget Password',
  SUBMIT_BUTTON: 'Set',
  PASSWORD_CHANGED: 'Password Changed',
  LOGIN:"Login",
  FAILURE:'Error in changing password',
  SUCCESS:"Password Changed Successfully"
};
