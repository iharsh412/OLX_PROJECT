import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import {
  City,
  Description,
  Photos,
  Price,
  Seller,
  State,
  TextField,
} from '../Common/Common';
import {
  CLASSNAME,
  validationSchema,
  initialValues,
  FormValues,
  TEXT,
} from './costant';
import { usePostNewProductsMutation } from '../../../../Services/Api/module/imageApi';

import { ROUTES_CONFIG } from '../../../../Shared/Constants';
import { TEXT as COMMON_TEXT } from '../Common/constant';

export default function MobileForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showResponse, setShowResponse] = useState<string>('');
  const [postNewProducts] = usePostNewProductsMutation();

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
    const formData = new FormData();
    formData.append('user', '1');
    formData.append('category', state.categoryId);
    formData.append('subcategory', state.subcategory);

    Object.keys(values).forEach((key) => {
      const typedKey = key as keyof FormValues;

      if (Array.isArray(values[typedKey])) {
        (values[typedKey] as File[]).forEach((file) => {
          formData.append(`${typedKey}`, file);
        });
      } else {
        formData.append(typedKey, values[typedKey] as string);
      }
    });

    try {
      await postNewProducts(formData).unwrap();
      toast.success(COMMON_TEXT.SUCCESS);
      setShowResponse('Added');
      navigate(ROUTES_CONFIG.HOMEPAGE.path);

      resetForm();
    } catch (error) {
      toast.error(COMMON_TEXT.ERROR);
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
        const share = { handleChange, handleBlur, setFieldValue };

        return (
          <>
            <div className={CLASSNAME.WRAPPER}>
              <h3 className={CLASSNAME.DETAIL_TEXT}>{TEXT.INCLUDE_DETAIL}</h3>

              <TextField
                type="text"
                htmlFor="brand"
                value={values.brand}
                err={errors.brand}
                tch={touched.brand}
                label="Brand"
                {...share}
              />
              {/* Title Input */}
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
            </div>
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
            {/* Location */}
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
            {/* Review Your Detail */}
            <div className={CLASSNAME.SELLER_WRAPPER}>
              <h3 className={CLASSNAME.SELLER_TEXT}>{TEXT.REVIEW_DETAIL}</h3>
              <TextField
                type="text"
                htmlFor="sellerName"
                value={values.sellerName}
                label="Name"
                err={errors.sellerName}
                tch={touched.sellerName}
                {...share}
              />
              <Seller
                type="text"
                htmlFor="mobileNumber"
                value={values.mobileNumber}
                label="Mobile Number"
                err={errors.mobileNumber}
                tch={touched.mobileNumber}
                {...share}
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
              {(() => {
                if (showResponse === 'Added') return 'POST SUCCESSFULLY';
                if (showResponse === 'Error') return 'ERROR IN POSTING';
                return 'POST';
              })()}
            </button>
          </>
        );
      }}
    </Formik>
  );
}
