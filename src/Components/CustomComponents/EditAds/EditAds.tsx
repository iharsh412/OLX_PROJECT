import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { CLASSNAME, initialValues } from './constant';
import { validationSchema } from '../Post/PostForm/constant';
import './EditAds.css';
import {
  usePostEditDataMutation,
  useGetProductsDetailQuery,
} from '../../../Services/Api/module/imageApi';
import Loader from '../../Atom/Loader';
import ErrorSection from '../../Atom/ErrorSection';
import Form from '../Form/index';
import { COMMON_TEXT } from '../../../Helper/constant';
import { InitialValuesProps, EditAdsProps } from '../../../Helper/interface';

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
          acc[key as keyof InitialValuesProps] =
            data[key] ?? prev[key as keyof InitialValuesProps];
          if (key === 'photos') {
            acc.photos = data.images;
          }
          return acc;
        }, {} as InitialValuesProps),
      }));
    }
  }, [data]);

  const handleSubmit = async (
    values: InitialValuesProps,
    { resetForm }: { resetForm: () => void }
  ) => {
    const formData = new FormData();
    if (product?.id !== undefined) formData.append('id', String(product.id));
    if (product?.category !== undefined)
      formData.append('category', JSON.stringify(product.category));
    if (product?.subcategory !== undefined)
      formData.append('subcategory', JSON.stringify(product.subcategory));

    Object.entries(values).forEach(([key, value]) => {
      const typedKey = key as keyof InitialValuesProps;

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
      toast.success(COMMON_TEXT.SUCCESS_IN_EDITING);
      resetForm();
      refetch?.();
    } catch (error) {
      toast.error(COMMON_TEXT.ERROR_IN_EDITING);
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
  if (isError) return <ErrorSection />;

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
                {isSubmitting ? COMMON_TEXT.EDITING : COMMON_TEXT.EDIT}
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
