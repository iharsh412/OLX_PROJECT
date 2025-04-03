import './textField.css';
import { ErrorMessage } from 'formik';
import { CLASSNAME } from './contant';
import { TextFieldProps } from './contant';



const TextField: React.FC<TextFieldProps> = ({
  htmlFor,
  type,
  err,
  label,
  value,
  tch,
  handleChange,
  handleBlur,
}) => {
    
  return (
    <div className={CLASSNAME.CONTAINER}>
      <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
        {label} *
      </label>
      <input
        type={type}
        name={htmlFor}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value as string}
        title={htmlFor}
        className={`${CLASSNAME.INPUT} ${
          err && tch ? CLASSNAME.INPUT_ERROR : ''
        }`}
      />
      <ErrorMessage name={htmlFor} component="div" className={CLASSNAME.ERROR} />
    </div>
  );
};

export default TextField;
