import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {
  CLASSNAME,
  EditAdsProps,
  FormValues,
  TEXT,
  validationSchema,
  initialValues,
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

import {
  usePostEditDataMutation,
  useGetProductsDetailQuery,
} from '../../../Services/Api/module/imageApi';
import Loader from '../../Atom/Loader';
import Error from '../../Atom/ErrorSection';

export default function EditAds({
  setEditOpen,
  data: product,
  refetch,
}: EditAdsProps) {
  const [post] = usePostEditDataMutation();
  const { data, isLoading, isError } = useGetProductsDetailQuery({
    id: product.id,
  });
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const dropdownRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (data) {
      setFormInitialValues((prev) => ({
        ...prev,
        ...Object.keys(initialValues).reduce((acc, key) => {
          acc[key as keyof FormValues] =
            data[key] ?? prev[key as keyof FormValues];
          return acc;
        }, {} as FormValues),
      }));
    }
  }, [data]);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const formData = new FormData();
    if (product?.id !== undefined) formData.append('id', String(product.id));
    if (product?.category !== undefined)
      formData.append('category', String(product.category));
    if (product?.subcategory !== undefined)
      formData.append('subcategory', String(product.subcategory));

    Object.entries(values).forEach(([key, value]) => {
      const typedKey = key as keyof FormValues;

      if (Array.isArray(value)) {
        (value as File[]).forEach((file) => {
          formData.append(typedKey, file);
        });
      } else if (value !== undefined && value !== null) {
        formData.append(typedKey, String(value));
      }
    });

    try {
      await post(formData).unwrap();
      setEditOpen(false);
      toast.success(TEXT.SUCCESS);
      resetForm();
      refetch?.();
    } catch (error) {
      toast.error(TEXT.ERROR);
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setEditOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className={CLASSNAME.WRAPPER}>
      <Formik
        initialValues={formInitialValues}
        enableReinitialize
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
            <form
              className={CLASSNAME.MAIN}
              ref={dropdownRef}
              onSubmit={handleSubmit}
            >
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
              <Photos
                type="file"
                label="images"
                value={values?.images}
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
              <button
                type="submit"
                className={CLASSNAME.POST}
                disabled={isSubmitting}
              >
                {isSubmitting ? TEXT.EDITING : TEXT.EDIT}
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
