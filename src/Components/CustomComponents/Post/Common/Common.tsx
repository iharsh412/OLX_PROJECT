import { ErrorMessage } from 'formik';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import './common.css';
import {
  CLASSNAME,
  COUNT,
  LOCATION,
  PhotosProps,
  TEXT,
  TextFieldProps,
} from './constant';
import ICONS from '../../../../assets';
import { COMMON_TEXT } from '../../../../Helper/constant';

const Year: React.FC<TextFieldProps> = ({
  htmlFor,
  type,
  err,
  label,
  value,
  tch,
  handleBlur,
  setFieldValue,
}) => {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value: string = e.target.value.slice(
      0,
      COUNT[label as keyof typeof COUNT]
    );
    setFieldValue?.(htmlFor, value);
  }

  return (
    <div className={CLASSNAME.CONTAINER}>
      <div className={CLASSNAME.LABEL_WRAPPER}>
        <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
          {label}{' '}
          <div
            style={{
              display: 'inline-block',
              color: 'red',
              width: '10px',
              height: '10px',
            }}
          >
            *
          </div>
        </label>
      </div>
      <input
        type={type}
        name={htmlFor}
        onChange={(e) => handleChange(e)}
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
};

const TextField: React.FC<TextFieldProps> = ({
  htmlFor,
  type,
  err,
  label,
  value,
  tch,
  handleBlur,
  setFieldValue,
}) => {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value: string = e.target.value.slice(
      0,
      COUNT[label as keyof typeof COUNT]
    );
    setFieldValue?.(htmlFor, value);
  }

  return (
    <div className={CLASSNAME.CONTAINER}>
      <div className={CLASSNAME.LABEL_WRAPPER}>
        <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
          {label}{' '}
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
        </label>
        <span>
          {value?.toString().length}/{COUNT[label as keyof typeof COUNT]}
        </span>
      </div>
      <input
        type={type}
        name={htmlFor}
        onChange={(e) => handleChange(e)}
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
};
const Email: React.FC<TextFieldProps> = ({
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
      <div className={CLASSNAME.LABEL_WRAPPER}>
        <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
          {label} <div style={{ display: 'inline-block', color: 'red' }}>*</div>
        </label>
      </div>
      <input
        type={type}
        name={htmlFor}
        onChange={handleChange}
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
};

const Price: React.FC<TextFieldProps> = ({
  type,
  htmlFor,
  err,
  label,
  value,
  handleChange,
  tch,
  handleBlur,
}) => {
  return (
    <>
      <div className={CLASSNAME.PRICE_WRAPPER}>
        <h3 className={CLASSNAME.PRICE_TEXT}>SET A PRICE</h3>
        <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
          {label} <div style={{ display: 'inline-block', color: 'red' }}>*</div>
        </label>
        <div className={CLASSNAME.PRICE_INPUT_WRAPPER}>
          <span>
            <img src={ICONS.rupees} alt={COMMON_TEXT.IMG} width="10px" />
          </span>
          <input
            title={htmlFor}
            type={type}
            name={htmlFor}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value as string}
            className={`${CLASSNAME.PRICE} ${
              err && tch ? CLASSNAME.INPUTERROR : ''
            }`}
          />
        </div>
        <ErrorMessage
          name={htmlFor}
          component="div"
          className={CLASSNAME.ERROR}
        />
      </div>
    </>
  );
};

const Description: React.FC<TextFieldProps> = ({
  htmlFor,
  err,
  label,
  value,
  tch,
  handleBlur,
  setFieldValue,
}) => {
  return (
    <>
      <div className={CLASSNAME.LABEL_WRAPPER}>
        <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
          {label}
          <div style={{ display: 'inline-block', color: 'red' }}>*</div>
        </label>
        <span>
          {value?.toString().length}/{COUNT.Description}
        </span>
      </div>
      <textarea
        title={htmlFor}
        name={htmlFor}
        onChange={(e) => {
          setFieldValue?.(
            htmlFor,
            e.target.value.slice(0, COUNT['Description'])
          );
        }}
        onBlur={handleBlur}
        value={value as string}
        className={`${CLASSNAME.DESCRIPTION} ${
          err && tch ? CLASSNAME.INPUTERROR : ''
        }`}
      />
      <ErrorMessage
        name={htmlFor}
        component="div"
        className={CLASSNAME.ERROR}
      />
    </>
  );
};
const AboutMe: React.FC<TextFieldProps> = ({
  htmlFor,
  err,
  label,
  value,
  tch,
  handleBlur,
  setFieldValue,
}) => {
  return (
    <>
      <div className={CLASSNAME.LABEL_WRAPPER}>
        <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
          {label}
        </label>
        <span>
          {value?.toString().length}/{COUNT.Description}
        </span>
      </div>
      <textarea
        title={htmlFor}
        name={htmlFor}
        onChange={(e) => {
          setFieldValue?.(
            htmlFor,
            e.target.value.slice(0, COUNT['Description'])
          );
        }}
        onBlur={handleBlur}
        value={value as string}
        className={`${CLASSNAME.DESCRIPTION} ${
          err && tch ? CLASSNAME.INPUTERROR : ''
        }`}
      />
      <ErrorMessage
        name={htmlFor}
        component="div"
        className={CLASSNAME.ERROR}
      />
    </>
  );
};

const Seller: React.FC<TextFieldProps> = ({
  htmlFor,
  err,
  label,
  value,
  tch,
  type,
  handleBlur,
  // handleChange,
  setFieldValue,
}) => {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value;
    const numericOnly = rawValue.replace(/\D/g, ''); 
    const trimmed = numericOnly.slice(0, COUNT[label as keyof typeof COUNT]);
    setFieldValue?.(htmlFor, trimmed);
  }
  return (
    <>
      <h3 className={CLASSNAME.SELLER_VERIFY_TEXT}>{TEXT.VERIFY}</h3>
      <span className={CLASSNAME.SELLER_CODE_TEXT}>{TEXT.CONFIRMATION}</span>
      <div className={CLASSNAME.MOBILE_NUMBER_WRAPPER}>
        <span>{TEXT.CODE}</span>
        <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
          {label} <div style={{ display: 'inline-block', color: 'red' }}>*</div>
        </label>
        <input
          title={htmlFor}
          type={type}
          name={htmlFor}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value as string}
          className={`${CLASSNAME.MOBILE_NUMBER} ${
            err && tch ? CLASSNAME.INPUTERROR : ''
          }`}
        />
      </div>
      <ErrorMessage
        name={htmlFor}
        component="div"
        className={CLASSNAME.ERROR}
      />
    </>
  );
};
const PhoneNumber: React.FC<TextFieldProps> = ({
  htmlFor,
  err,
  label,
  value,
  tch,
  type,
  handleBlur,
  // handleChange,
  setFieldValue,
}) => {
  function handleChangeMobileNumber(e: ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value;
    const numericOnly = rawValue.replace(/\D/g, ''); 
    const trimmed = numericOnly.slice(0, COUNT[label as keyof typeof COUNT]);
    setFieldValue?.(htmlFor, trimmed);

    
  
  }
  return (
    <>
      <div className={CLASSNAME.MOBILE_NUMBER_WRAPPER}>
        <span>{TEXT.CODE}</span>
        <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
          {label}
        </label>
        <input
          title={htmlFor}
          type={type}
          name={htmlFor}
          onChange={handleChangeMobileNumber}
          onBlur={handleBlur}
          value={value as string}
          className={`${CLASSNAME.MOBILE_NUMBER} ${
            err && tch ? CLASSNAME.INPUTERROR : ''
          }`}
        />
      </div>
      <ErrorMessage
        name={htmlFor}
        component="div"
        className={CLASSNAME.ERROR}
      />
    </>
  );
};

const Photos: React.FC<PhotosProps> = ({
  type,
  value,
  label,
  setFieldValue,
}) => {
  return (
    <>
      <h3 className={CLASSNAME.UPLOAD_TEXT}>{TEXT.UPLOAD_PHOTOS}</h3>
      <div className={CLASSNAME.PHOTO_CONTAINER}>
        {Array.from({
          length: Math.max(5, 0),
        }).map((_, index) => (
          <div key={index} className={CLASSNAME.PHOTO_BOX}>
            {value?.[index] ? (
              <div className={CLASSNAME.PREVIEW_WRAPPER}>
                <button
                  className="post-form-remove-btn"
                  onClick={() => {
                    const updated: File[] = [...value];
                    updated.splice(index, 1);
                    setFieldValue?.(label, updated);
                  }}
                >
                  <img src={ICONS.cross} alt="Edit" />
                </button>
                <img
                  src={
                    typeof value?.[index] === 'string'
                      ? `${import.meta.env.VITE_BASE_URL}${value?.[index]}`
                      : URL.createObjectURL(value?.[index])
                  }
                  alt={COMMON_TEXT.IMG}
                  className={CLASSNAME.PREVIEW}
                />
                <label>
                  <input
                    type={type}
                    accept="image/*"
                    className={CLASSNAME.FILE_INPUT}
                    onChange={(e) => {
                      const { files } = e.target;
                      if (files && files[0]) {
                        const updated: File[] = [...value];
                        updated[index] = files[0];
                        setFieldValue?.(label, updated);
                      }
                    }}
                  />
                  <span>
                    <img src={ICONS.camera} alt="Edit" />
                  </span>
                </label>
              </div>
            ) : (
              <label className={CLASSNAME.UPLOAD}>
                <input
                  type={type}
                  accept="image/*"
                  className={CLASSNAME.FILE_INPUT}
                  onChange={(e) => {
                    const { files } = e.target;
                    if (files) {
                      setFieldValue?.(label, [...value, files[0]]);
                    }
                  }}
                />
                <span className={CLASSNAME.CAMERA}>
                  <img src={ICONS.camera} alt={COMMON_TEXT.IMG} />
                </span>
                <span className={CLASSNAME.ADD_PHOT0}>{TEXT.ADD_PHOTO}</span>
              </label>
            )}
          </div>
        ))}
      </div>

      <ErrorMessage name={label} component="div" className={CLASSNAME.ERROR} />
    </>
  );
};

const State: React.FC<TextFieldProps> = ({
  htmlFor,
  err,
  label,
  value,
  tch,
  type,
  handleBlur,
  setFieldValue,
  // handleChange
}) => {
  const [state, setState] = useState<boolean>(false);
  function handleState(e: React.MouseEvent) {
    e.stopPropagation();
    setState(!state);
  }
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside the wrapper
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setState(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
        {label} <div style={{ display: 'inline-block', color: 'red' }}>*</div>
      </label>
      <div
        className={CLASSNAME.STATE_INPUT_WRAPPER}
        onClick={(e) => handleState(e)}
      >
        <input
          title={htmlFor}
          type={type}
          name={htmlFor}
          onBlur={handleBlur}
          value={value as string}
          readOnly
          className={`${CLASSNAME.STATE} ${
            err && tch ? CLASSNAME.INPUTERROR : ''
          }`}
        />
        <span>
          <img src={ICONS.upDown} alt={COMMON_TEXT.IMG} />
        </span>
      </div>
      {state && (
        <div className={CLASSNAME.STATE_LIST} ref={wrapperRef}>
          {Object.keys(LOCATION).map((state) => (
            <button
              className={CLASSNAME.STATE_ITEMS}
              key={state}
              onClick={(e) => {
                setFieldValue?.('city', '');
                setFieldValue?.(htmlFor, state);
                handleState(e);
              }}
            >
              {state}
            </button>
          ))}
        </div>
      )}

      <ErrorMessage
        name={htmlFor}
        component="div"
        className={CLASSNAME.ERROR}
      />
    </>
  );
};

const City: React.FC<TextFieldProps> = ({
  htmlFor,
  err,
  label,
  value,
  tch,
  type = 'text',
  handleBlur,
  setFieldValue,
  state,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown open/close
  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef}>
      <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
        {label} <div style={{ display: 'inline-block', color: 'red' }}>*</div>
      </label>

      <div
        className={CLASSNAME.STATE_INPUT_WRAPPER}
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleDropdown(e as any);
        }}
      >
        <input
          title={htmlFor}
          type={type}
          name={htmlFor}
          readOnly
          onBlur={handleBlur}
          value={value as string}
          className={`${CLASSNAME.CITY} ${
            err && tch ? CLASSNAME.INPUTERROR : ''
          }`}
          placeholder="Select City"
        />
        <span>
          <img src={ICONS.upDown} alt={COMMON_TEXT.IMG} />
        </span>
      </div>

      {isDropdownOpen && (
        <div className={CLASSNAME.CITY_LIST}>
          {LOCATION?.[state as keyof typeof LOCATION]?.map((cityName) => (
            <button
              type="button"
              className={CLASSNAME.STATE_ITEMS}
              key={cityName}
              onClick={(e) => {
                e.stopPropagation();
                setFieldValue?.(htmlFor, cityName);
                setIsDropdownOpen(false);
              }}
            >
              {cityName}
            </button>
          ))}
        </div>
      )}

      <ErrorMessage
        name={htmlFor}
        component="div"
        className={CLASSNAME.ERROR}
      />
    </div>
  );
};

export {
  Description,
  TextField,
  PhoneNumber,
  Photos,
  Price,
  Seller,
  Email,
  State,
  City,
  Year,
  AboutMe,
};
