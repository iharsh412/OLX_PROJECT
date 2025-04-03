import { Formik, ErrorMessage } from 'formik';
import TextField from '../TextField';
import {
  CLASSNAME,
  validationSchema,
  initialValues,
  FormValues,
} from './constant';
import ICONS from '../../../../assets';
import { usePostNewProductsMutation } from '../../../../Services/Api/module/imageApi';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ComputerForm() {
  const { state } = useLocation();
  const [showResponse, setShowResponse] = useState<string>('');
  const [postNewProducts] = usePostNewProductsMutation();
  console.log(state, 'state');

  useEffect(() => {
    if (showResponse) {
      const timer = setTimeout(() => {
        setShowResponse('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showResponse]);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log(values, 'values');
    const formData = new FormData();
    formData.append('user', '1');
    formData.append('category', state.categoryId);
    formData.append('subcategory', state.subcategory);

    for (let key in values) {
      const typedKey = key as keyof FormValues;

      if (Array.isArray(values[typedKey])) {
        (values[typedKey] as File[]).forEach((file) => {
          formData.append(`${typedKey}`, file);
        });
      } else {
        formData.append(typedKey, values[typedKey] as string);
      }
    }

    try {
      await postNewProducts(formData).unwrap();
      setShowResponse('Added');

      resetForm();
    } catch (error) {
      setShowResponse('Error');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        touched,
        errors,
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => {

        const share = { handleChange, handleBlur, handleSubmit,  }
        return (
          <>
            <div className={CLASSNAME.WRAPPER}>
              <h3 className={CLASSNAME.DETAIL_TEXT}>INCLUDE SOME DETAILS</h3>

              < TextField type="text" htmlFor="brand" value={values.brand} err={errors.brand} tch={touched.brand} label="Brand" {...share} />


              {/* Title Input */}


              < TextField type="text" htmlFor="title" value={values.title} label="Ad title" err={errors.title} tch={touched.title} {...share} />




              {/* Description Input */}

              <label htmlFor="description" className={CLASSNAME.LABEL}>
                Description *
              </label>
              <textarea
                title="Enter a brief description of your ad"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className={`${CLASSNAME.DESCRIPTION} ${errors.description && touched.description
                    ? CLASSNAME.INPUTERROR
                    : ''
                  }`}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="postError"
              />
            </div>

            <hr />

            {/* Price Input */}
            <div className={CLASSNAME.PRICE_WRAPPER}>
              <h3 className={CLASSNAME.PRICE_TEXT}>SET A PRICE</h3>
              <label htmlFor="price" className={CLASSNAME.LABEL}>
                Price *
              </label>
              <div className={CLASSNAME.PRICE_INPUT_WRAPPER}>
                <span>
                  <img src={ICONS.rupees} alt="img" width="10px" />
                </span>
                <input
                  title="Enter the price of your ad"
                  type="number"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  className={`${CLASSNAME.PRICE} ${errors.price && touched.price ? CLASSNAME.INPUTERROR : ''
                    }`}
                />
              </div>
              <ErrorMessage
                name="price"
                component="div"
                className="postError"
              />
            </div>

            <hr />

            {/* Photos input */}
            <h3 className="postForm_UploadText">UPLOAD UP TO 5 PHOTOS</h3>
            <div className="postForm_photo-container">
              {Array.from({
                length: Math.max(5, values?.photos?.length + 1),
              }).map((_, index) => (
                <div key={index} className="postForm_photo-box">
                  {values.photos[index] ? (
                    <img
                      src={URL.createObjectURL(values.photos[index])}
                      alt="preview"
                      className="postForm_photo-preview"
                    />
                  ) : (
                    <label className="postForm_photo-upload">
                      <input
                        type="file"
                        accept="image/*"
                        className="postForm_file-input"
                        onChange={(e) => {
                          const { files } = e.target;
                          if (files) {
                            setFieldValue('photos', [
                              ...values.photos,
                              files[0],
                            ]);
                          }
                        }}
                      />
                      <span className="postForm_Camera">
                        <img src={ICONS.camera} alt="img" />
                      </span>
                      <span className="postForm_text">Add Photo</span>
                    </label>
                  )}
                </div>
              ))}
            </div>

            <ErrorMessage name="photos" component="div" className="postError" />

            <hr />
            {/* Location */}

            <div className={CLASSNAME.LOCATION_WRAPPER}>
              <h3 className={CLASSNAME.LOCATION_TEXT}>CONFIRM YOUR LOCATION</h3>
              <label htmlFor="state" className={CLASSNAME.LABEL}>
                State *
              </label>
              <input
                title="Enter the state where you are located"
                type="text"
                name="state"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.state}
                className={`${CLASSNAME.STATE} ${errors.state && touched.state ? CLASSNAME.INPUTERROR : ''
                  }`}
              />

              <ErrorMessage
                name="state"
                component="div"
                className="postError"
              />

              <label htmlFor="city" className={CLASSNAME.LABEL}>
                City *
              </label>
              <input
                title="Enter the city where you are located"
                type="text"
                name="city"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                className={`${CLASSNAME.CITY} ${errors.city && touched.city ? CLASSNAME.INPUTERROR : ''
                  }`}
              />

              <ErrorMessage name="city" component="div" className="postError" />
            </div>

            <hr />

            {/* Review Your Detail */}

            <div className={CLASSNAME.SELLER_WRAPPER}>
              <h3 className={CLASSNAME.SELLER_TEXT}>REVIEW YOUR DETAILS</h3>
              
              
              < TextField type="text" htmlFor="sellerName" value={values.sellerName} label="Name" err={errors.sellerName} tch={touched.sellerName} {...share} />


              
             
              <h3 className={CLASSNAME.SELLER_VERIFY_TEXT}>
                Let's verify your account
              </h3>
              <span className={CLASSNAME.SELLER_CODE_TEXT}>
                We will send you a confirmation code by sms on the next step.
              </span>
              <div className={CLASSNAME.MOBILE_NUMBER_WRAPPER}>
                <span>+91</span>
                <label htmlFor="mobileNumber" className={CLASSNAME.LABEL}>
                  Mobile Number *
                </label>
                <input
                  title="Enter your mobile number"
                  type="text"
                  name="mobileNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mobileNumber}
                  className={`${CLASSNAME.MOBILE_NUMBER} ${errors.mobileNumber && touched.mobileNumber
                      ? CLASSNAME.INPUTERROR
                      : ''
                    }`}
                />
              </div>
              <ErrorMessage
                name="mobileNumber"
                component="div"
                className="postError"
              />
            </div>
            <hr />

            {/* Submit Button */}
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className={CLASSNAME.POST}
              disabled={isSubmitting}
            >
              {showResponse === 'Added'
                ? 'POST SUCCESSFULLY'
                : showResponse === 'Error '
                  ? 'ERROR IN POSTING'
                  : 'POST'}
            </button>
          </>
        );
      }}
    </Formik>
  );
}
