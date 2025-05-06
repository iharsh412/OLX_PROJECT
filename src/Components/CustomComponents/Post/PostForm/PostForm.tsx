import { Formik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { usePostNewProductsMutation } from '../../../../Services/Api/module/imageApi';
import './postForm.css';
import { validationSchema, initialValues } from './constant';
import { ROUTES_CONFIG } from '../../../../Shared/Constants';
import { TEXT, FormValues, CLASSNAME } from '../Common/constant';
import Form from '../../Form';

export default function CarForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showResponse, setShowResponse] = useState<string>('');
  const [postNewProducts] = usePostNewProductsMutation();

  // HandleSubmit
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
      toast.success(TEXT.SUCCESS);
      setShowResponse('Added');
      navigate(ROUTES_CONFIG.HOMEPAGE.path);
      resetForm();
    } catch (error) {
      toast.error(TEXT.ERROR);
      setShowResponse('Error');
    }
  };

  // HOOKS
  useEffect(() => {
    if (showResponse) {
      const timer = setTimeout(() => {
        setShowResponse('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showResponse]);

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
            <Form
              touched={touched}
              errors={errors}
              values={values}
              share={share}
            />
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
