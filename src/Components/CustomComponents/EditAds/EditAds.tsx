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

import './EditAds.css';
import {
  usePostEditDataMutation,
  useGetProductsDetailQuery,
} from '../../../Services/Api/module/imageApi';
import Loader from '../../Atom/Loader';
import Error from '../../Atom/ErrorSection';
import Form from '../Form/index';

export default function EditAds({
  setEditOpen,
  data: product,
  refetch,
}: Readonly<EditAdsProps>) {
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
      formData.append('category', JSON.stringify(product.category));
    if (product?.subcategory !== undefined)
      formData.append('subcategory', JSON.stringify(product.subcategory));

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
              <Form
                share={share}
                values={values}
                touched={touched}
                errors={errors}
              />

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
