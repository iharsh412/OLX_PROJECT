import { ErrorMessage } from 'formik';
import { CLASSNAME, COUNT } from '../../CustomComponents/Post/Common/constant';
import { InputFieldProps } from '../../../Helper/interface';

export default function InputField({
  compulsory,
  label,
  type,
  value,
  handleChange,
  handleBlur,
  err,
  tch,
  htmlFor,
  countRequired,
  setFieldValue,
}: Readonly<InputFieldProps>) {
  return (
    <div className={CLASSNAME.CONTAINER}>
      <div className={CLASSNAME.LABEL_WRAPPER}>
        <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
          {label}{' '}
          {compulsory && (
            <div
              style={{
                display: 'inline-block',
                color: 'red',
                height: '20px',
                width: '20px',
                fontWeight: '900',
              }}
            >
              *
            </div>
          )}
        </label>
        {countRequired && (
          <span>
            {value?.toString().length}/{COUNT[label as keyof typeof COUNT]}
          </span>
        )}
      </div>
      <input
        type={type}
        name={htmlFor}
        onChange={(e) => {
          if (setFieldValue) {
            handleChange(e, htmlFor, setFieldValue, label);
          }
        }}
        onBlur={handleBlur}
        value={value as string}
        title={htmlFor}
        className={`${CLASSNAME.INPUT} ${
          err && tch ? CLASSNAME.INPUTERROR : ''
        }`}
      />

      <ErrorMessage
        name={htmlFor}
        component="div"
        className={CLASSNAME.ERROR}
      />
    </div>
  );
}
