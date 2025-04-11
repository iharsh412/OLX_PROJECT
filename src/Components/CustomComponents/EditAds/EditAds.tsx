import { Formik } from 'formik';
import {
  CLASSNAME,
  EditAdsProps,
  FormValues,
  TEXT,
  validationSchema,
} from './constant';
import {
  City,
  Description,
  Photos,
  Price,
  State,
  TextField,
} from '../Post/Common/Common';
import './EditAds.css';

const EditAds: React.FC<EditAdsProps> = ({ setEditOpen, data }) => {
    const initialValues: FormValues = {
        title: '',
        description: data?.description ?? '',
        brand: '',
        year: '',
        price: typeof data.price === 'string' ? data.price : String(data.price ?? ''),
        photos: [],
        state: typeof data.state === 'string' ? data.state : String(data.state ?? ''),
        city: typeof data.city === 'string' ? data.city : String(data.city ?? ''),
      };

  console.log(data, 'data');
  console.log(setEditOpen, 'setEditOpen');
  function handleSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <>
      <div className={CLASSNAME.WRAPPER}>
        <Formik
          initialValues={initialValues}
          validateSchema={validationSchema}
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
            const share = { handleChange, handleBlur, setFieldValue };

            return (
              <>
                <div className={CLASSNAME.MAIN}>
                  <h3 className={CLASSNAME.DETAIL_TEXT}>
                    {TEXT.INCLUDE_DETAIL}
                  </h3>

                  <TextField
                    type="text"
                    htmlFor="brand"
                    value={values.brand}
                    err={errors.brand}
                    tch={touched.brand}
                    label="Brand"
                    {...share}
                  />
                  {/* Year Input */}
                  <TextField
                    type="number"
                    htmlFor="year"
                    value={values.year}
                    err={errors.year}
                    tch={touched.year}
                    label="Year"
                    {...share}
                  />
                  <TextField
                    type="text"
                    htmlFor="title"
                    value={values.title}
                    label="Ad title"
                    err={errors.title}
                    tch={touched.title}
                    {...share}
                  />

                  {/* Description Input */}
                  <Description
                    type="text"
                    htmlFor="description"
                    value={values.description}
                    err={errors.description}
                    tch={touched.description}
                    label="Description"
                    {...share}
                  />
                  <hr />

                  {/* Price Input */}
                  <Price
                    type="number"
                    htmlFor="price"
                    value={values.price}
                    err={errors.price}
                    tch={touched.price}
                    label="Price"
                    {...share}
                  />
                  <hr />
                  {/* Photos input */}
                  <Photos
                    type="file"
                    label="photos"
                    value={values?.photos as []}
                    {...share}
                  />
                  <hr />
                  <div className={CLASSNAME.LOCATION_WRAPPER}>
                    <h3 className={CLASSNAME.LOCATION_TEXT}>
                      {TEXT.CONFIRM_LOCATION}
                    </h3>
                    <State
                      type="text"
                      htmlFor="state"
                      value={values.state}
                      err={errors.state}
                      tch={touched.state}
                      label="State"
                      {...share}
                    />

                    {values.state && (
                      <City
                        state={values.state}
                        type="text"
                        htmlFor="city"
                        value={values.city}
                        err={errors.city}
                        tch={touched.city}
                        label="City"
                        {...share}
                      />
                    )}
                  </div>

                  <hr />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    onClick={() => handleSubmit()}
                    className={CLASSNAME.POST}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? TEXT.EDITING : TEXT.EDIT}
                  </button>
                </div>
              </>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default EditAds;
