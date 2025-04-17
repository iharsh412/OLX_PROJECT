import * as Yup from 'yup';

export const INITIAL_VALUES = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
export const VALIDATION = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().required('Confirm your password ').oneOf(
    [Yup.ref('password')],
    'Passwords must match'
  )
});

export interface FORM_VALUES {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export const CLASSNAME ={
    WRAPPER:"signup_Wrapper",
    HEADER:"signup_Header",
    CROSS:"signup_Cross",
    BACK:"signup_Back",
    TITLE:"signup_title",
    USERNAME_INPUT:"signup_usernameInput",
    EMAIL_INPUT:"signup_emailInput",
    PASSWORD_INPUT:"signup_passwordInput",
    CONFIRM_PASSWORD_INPUT:"signup_confirmPasswordInput",
    SUBMIT_BUTTON:"signup_submitButton",
    ERROR:"signup_error",
    

}
export const TEXT = {
  TITLE: 'Sign Up',
  USERNAME: 'Username',
  USERNAME_S: 'username',
  EMAIL: 'Email',
  PASSWORD: 'Password',
  CONFIRM_PASSWORD: 'Confirm Password',
  SUBMIT: 'Sign Up',
  SUCCESS:"Signup Successfully"

};