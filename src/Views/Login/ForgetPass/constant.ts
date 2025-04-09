import * as Yup from 'yup';

export const INITIAL_VALUES = {
 
  email: '',

};
export const VALIDATION = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
 
});

export interface FORM_VALUES {
  
  email: string;

}
export const CLASSNAME ={
    WRAPPER:"forget_Wrapper",
    TITLE:"forget_title",
   
    EMAIL_INPUT:"forget_emailInput",
    TEXT:"forget_text",
    SUBMIT_BUTTON:"forget_submitButton",
    ERROR:"forget_error",

}
export const TEXT ={
      NEXT:"CHECK YOUR EMAIL",
      TITLE:"Forgot Password",
    VALID:"Please enter your email address and we will send you a link to reset your password.",
    SUBMIT_BUTTON:"Send Reset Link",
    ERROR:"Please enter a valid email address",
}