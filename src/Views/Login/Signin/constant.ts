import * as Yup from 'yup';
export interface FORM_VALUES {
   
    email: string;
    password: string;
  
  }
  
  
  export const INITIAL_VALUES = {
    
    email: '',
    password: '',
    
  };
  export const VALIDATION = Yup.object().shape({
     email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
   
  });
  export const CLASSNAME ={
      WRAPPER:"signin_Wrapper",
      TITLE:"signin_title",
       EMAIL_INPUT:"signin_emailInput",
      PASSWORD_INPUT:"signin_passwordInput",
       SUBMIT_BUTTON:"signin_submitButton",
      ERROR:"signin_error",
  
  }
  