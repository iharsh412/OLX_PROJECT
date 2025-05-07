import { ErrorMessage } from 'formik';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import './common.css';
import InputField from '../../../Atom/InputField';
import { CLASSNAME, COUNT, LOCATION } from './constant';
import ICONS from '../../../../assets';
import { COMMON_TEXT } from '../../../../Helper/constant';
import { PhotosProps, TextFieldProps } from '../../../../Helper/interface';

function handleChangeMobileNumber(
  e: ChangeEvent<HTMLInputElement>,
  htmlFor: string,
  label: string,
  setFieldValue: any
) {
  const rawValue = e.target.value;
  const numericOnly = rawValue.replace(/\D/g, '');
  const trimmed = numericOnly.slice(0, COUNT[label as keyof typeof COUNT]);
  setFieldValue?.(htmlFor, trimmed);
}
function handleChange(
  e: ChangeEvent<HTMLInputElement>,
  htmlFor: string,
  setFieldValue: (field: string, value: any) => void,
  label: string
) {
  const value: string = e.target.value.slice(
    0,
    COUNT[label as keyof typeof COUNT]
  );
  setFieldValue?.(htmlFor, value);
}

function TextField({
  htmlFor,
  type,
  err,
  label,
  value,
  tch,
  handleBlur,
  setFieldValue,
  countRequired,
  compulsory,
}: Readonly<TextFieldProps>) {
  return (
    <InputField
      htmlFor={htmlFor}
      type={type}
      err={!!err}
      label={label}
      value={value}
      tch={tch}
      handleBlur={handleBlur || (() => {})}
      setFieldValue={setFieldValue}
      handleChange={handleChange}
      compulsory={compulsory}
      countRequired={countRequired}
    />
  );
}

function Price({
  type,
  htmlFor,
  err,
  label,
  value,
  handleChange,
  tch,
  handleBlur,
}: Readonly<TextFieldProps>) {
  return (
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
  );
}

function Description({
  htmlFor,
  err,
  label,
  value,
  tch,
  handleBlur,
  setFieldValue,
  compulsory,
}: Readonly<TextFieldProps>) {
  return (
    <>
      <div className={CLASSNAME.LABEL_WRAPPER}>
        <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
          {label}
          {compulsory && (
            <div style={{ display: 'inline-block', color: 'red' }}>*</div>
          )}
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
}

function Seller({
  htmlFor,
  err,
  label,
  value,
  tch,
  type,
  handleBlur,
  setFieldValue,
  compulsory,
}: Readonly<TextFieldProps>) {
  return (
    <>
      <h3 className={CLASSNAME.SELLER_VERIFY_TEXT}>{COMMON_TEXT.VERIFY}</h3>
      <span className={CLASSNAME.SELLER_CODE_TEXT}>
        {COMMON_TEXT.CONFIRMATION}
      </span>
      <PhoneNumber
        {...{
          htmlFor,
          err,
          label,
          value,
          tch,
          type,
          handleBlur,
          setFieldValue,
          compulsory,
        }}
      />
    </>
  );
}

function PhoneNumber({
  htmlFor,
  err,
  label,
  value,
  tch,
  type,
  handleBlur,
  setFieldValue,
  compulsory,
}: Readonly<TextFieldProps>) {
  return (
    <>
      <div className={CLASSNAME.MOBILE_NUMBER_WRAPPER}>
        <span>{COMMON_TEXT.CODE}</span>
        <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
          {label}{' '}
          {compulsory && (
            <div style={{ display: 'inline-block', color: 'red' }}>*</div>
          )}
        </label>
        <input
          title={htmlFor}
          type={type}
          name={htmlFor}
          onChange={(e) =>
            handleChangeMobileNumber(e, htmlFor, label, setFieldValue)
          }
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
}

function Photos({ type, value, label, setFieldValue }: Readonly<PhotosProps>) {
  return (
    <>
      <h3 className={CLASSNAME.UPLOAD_TEXT}>{COMMON_TEXT.UPLOAD_PHOTOS}</h3>
      <div className={CLASSNAME.PHOTO_CONTAINER}>
        {Array.from({
          length: Math.max(5, 0),
        }).map((_, index) => (
          <div key={`label-${index + 1}`} className={CLASSNAME.PHOTO_BOX}>
            {value?.[index] ? (
              <div className={CLASSNAME.PREVIEW_WRAPPER}>
                <button
                  type="button"
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
                      if (files?.[0]) {
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
                <span className={CLASSNAME.ADD_PHOT0}>
                  {COMMON_TEXT.ADD_PHOTO}
                </span>
              </label>
            )}
          </div>
        ))}
      </div>

      <ErrorMessage name={label} component="div" className={CLASSNAME.ERROR} />
    </>
  );
}

function State({
  htmlFor,
  err,
  label,
  value,
  tch,
  type,
  handleBlur,
  setFieldValue,
}: Readonly<TextFieldProps>) {
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
      <button
        className={CLASSNAME.STATE_INPUT_WRAPPER}
        type="button"
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
      </button>
      {state && (
        <div className={CLASSNAME.STATE_LIST} ref={wrapperRef}>
          {Object.keys(LOCATION).map((state) => (
            <button
              type="button"
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
}

function City({
  htmlFor,
  err,
  label,
  value,
  tch,
  type = 'text',
  handleBlur,
  setFieldValue,
  state,
}: Readonly<TextFieldProps>) {
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
    <div ref={dropdownRef} className="postForm_CityWrapper">
      <label htmlFor={htmlFor} className={CLASSNAME.LABEL}>
        {label} <div style={{ display: 'inline-block', color: 'red' }}>*</div>
      </label>

      <button
        className="postForm_CityInputWrapper"
        onClick={toggleDropdown}
        type="button"
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
      </button>

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
}

export {
  Description,
  TextField,
  PhoneNumber,
  Photos,
  Price,
  Seller,
  State,
  City,
};
