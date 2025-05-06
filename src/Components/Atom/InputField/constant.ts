import { FormikErrors } from 'formik';

export interface InputFieldProps {
  compulsory?: boolean;
  label: string;
  type?: string;
  value: string | number | [] | boolean | undefined;
  htmlFor: string;
  err?: boolean;
  tch?: boolean;
  countRequired?: boolean;

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    htmlFor: string,
    setFieldValue: (field: string, value: any) => void,
    label: string
  ) => void;

  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;

  setFieldValue:
    | ((
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
      ) => Promise<void | FormikErrors<any>>)
    | undefined;
}
