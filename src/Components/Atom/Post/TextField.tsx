import './textField.css';
import { ErrorMessage } from 'formik';
import { CLASSNAME } from './contant';
import { FormikErrors, FormikTouched } from 'formik';
import { FormValues } from './CarForm/constant';

interface TextFieldProps {
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  values: FormValues;
  touched: FormikTouched<FormValues>;
  errors: FormikErrors<FormValues>;
  htmlFor: string;
  label?: string;
  value?: string|number|boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  htmlFor,
  label,
  values,
  errors,
  value,
  touched,
  handleChange,
  handleBlur,
}) => {
  console.log(values, 'values');
  console.log(errors, 'errors');
  console.log(touched, 'touched');
  return (
    <div className={CLASSNAME.CONTAINER}>
      <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
        {label} *
      </label>
      <input
        type="text"
        name={htmlFor}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value as string}
        title={htmlFor}
        className={`${CLASSNAME.INPUT} ${
          errors.brand && touched.brand ? CLASSNAME.INPUT_ERROR : ''
        }`}
      />
      <ErrorMessage name={htmlFor} component="div" className={CLASSNAME.ERROR} />
    </div>
  );
};

export default TextField;
