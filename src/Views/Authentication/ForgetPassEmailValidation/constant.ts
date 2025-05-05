import * as Yup from 'yup';

export const INITIAL_VALUES = {
  email: '',
};
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
export const VALIDATION = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .matches(emailRegex, 'Please enter a valid email address'),
});
export interface FormValue {
  email: string;
}
export const CLASSNAME = {
  WRAPPER: 'forget_Wrapper',
  HEADER: 'forget_Header',
  CROSS: 'forget_Cross',
  BACK: 'forget_Back',
  TITLE: 'forget_title',
  EMAIL_INPUT: 'forget_emailInput',
  TEXT: 'forget_text',
  SUBMIT_BUTTON: 'forget_submitButton',
  ERROR: 'forget_error',
  REQUIRED: 'forget_required',
};
export const TEXT = {
  NEXT: 'CHECK YOUR EMAIL',
  TITLE: 'Forgot Password',
  VALID:
    'Please enter your email address and we will send you a link to reset your password.',
  SUBMIT_BUTTON: 'Send Reset Link',
  ERROR: 'Please enter a valid email address',
  SUCCESS: 'Check your Email',
  FAILURE: 'Something went wrong, please try again',
};
