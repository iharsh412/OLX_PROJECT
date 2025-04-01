import './sellerDetail.css';
import { Formik, ErrorMessage } from 'formik';
import {
  CLASSNAME,
  FuelOptions,
  validationSchema,
  initialValues,
} from './constant';
import ICONS from '../../../../assets';

export default function SellerDetail() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({
        values,
        touched,
        errors,
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        console.log(errors.brand, errors.year, 'error');

        return (
          <>
            <div className={CLASSNAME.WRAPPER}>
              <h3 className={CLASSNAME.DETAIL_TEXT}>INCLUDE SOME DETAILS</h3>

              {/* Brand Input */}
              <label htmlFor="brand" className={CLASSNAME.LABEL}>
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.brand}
                className={`${CLASSNAME.BRAND} ${
                  errors.brand && touched.brand ? CLASSNAME.INPUTERROR : ''
                }`}
              />
              <ErrorMessage
                name="brand"
                component="div"
                className="postError"
              />

              {/* Year Input */}
              <label htmlFor="year" className={CLASSNAME.LABEL}>
                Year *
              </label>
              <input
                type="number"
                name="year"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.year}
                className={`${CLASSNAME.YEAR} ${
                  errors.year && touched.year ? CLASSNAME.INPUTERROR : ''
                }`}
              />
              <ErrorMessage name="year" component="div" className="postError" />

              {/* Fuel Selection */}
              <label htmlFor="fuel" className={CLASSNAME.LABEL}>
                Fuel *
              </label>
              <div className={CLASSNAME.FUEL}>
                {FuelOptions.map((value) => (
                  <button
                    type="button"
                    key={value.id}
                    onClick={() => setFieldValue('fuel', value.label)}
                    style={{
                      backgroundColor:
                        values.fuel === value.label ? 'lightblue' : 'white',
                    }}
                  >
                    {value.label}
                  </button>
                ))}
              </div>
              <ErrorMessage name="fuel" component="div" className="postError" />

              {/* KM Driven */}

              <label htmlFor="distance" className={CLASSNAME.LABEL}>
                KM driven *
              </label>
              <input
                type="number"
                name="distance"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.distance}
                className={`${CLASSNAME.DISTANCE} ${
                  errors.distance && touched.distance
                    ? CLASSNAME.INPUTERROR
                    : ''
                }`}
              />
              <ErrorMessage
                name="distance"
                component="div"
                className="postError"
              />

              {/* Title Input */}

              <label htmlFor="title" className={CLASSNAME.LABEL}>
                Ad title *
              </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                className={`${CLASSNAME.TITLE} ${
                  errors.title && touched.title ? CLASSNAME.INPUTERROR : ''
                }`}
              />
              <ErrorMessage
                name="title"
                component="div"
                className="postError"
              />

              {/* Description Input */}

              <label htmlFor="description" className={CLASSNAME.LABEL}>
                Description *
              </label>
              <textarea
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className={`${CLASSNAME.DESCRIPTION} ${
                  errors.description && touched.description
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
                  type="number"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  className={`${CLASSNAME.PRICE} ${
                    errors.price && touched.price ? CLASSNAME.INPUTERROR : ''
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
            {/* Submit Button */}
            <button type="submit" onClick={() => handleSubmit()}>
              Submit
            </button>
          </>
        );
      }}
    </Formik>
  );
}
