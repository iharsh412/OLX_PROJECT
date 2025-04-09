import * as Yup from 'yup';

export const INITIAL_VALUES = {
 
  email: '',
  password: '',
  confirmPassword: '',
};
export const VALIDATION = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords must match'
  ),
});

export interface FORM_VALUES {
  
  email: string;
  password: string;
  confirmPassword: string;
}
export const CLASSNAME ={
    WRAPPER:"forget_Wrapper",
    TITLE:"forget_title",
   
    EMAIL_INPUT:"forget_emailInput",
    PASSWORD_INPUT:"forget_passwordInput",
    CONFIRM_PASSWORD_INPUT:"forget_confirmPasswordInput",
    SUBMIT_BUTTON:"forget_submitButton",
    ERROR:"forget_error",

}