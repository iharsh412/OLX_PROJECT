import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './postForm.css';
import { validationSchema, initialValues } from './constant';
import { CLASSNAME } from '../Common/constant';
import Form from '../../Form';
import { COMMON_TEXT } from '../../../../Helper/constant';
import {
  InitialValuesProps,
  ProductDetail,
} from '../../../../Helper/interface';
import { getURLfromSupabase, uploadAds } from '../../../../Helper/function';
import { RootState } from '../../../../Store/index';

export default function PostForm() {
  const { id, username } = useSelector((state: RootState) => state.common);
  const { state } = useLocation();
  const [showResponse, setShowResponse] = useState<string>('');

  // HandleSubmit
  const handleSubmit = async (
    values: InitialValuesProps,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const { photos } = values;

      // Upload all images to Supabase using Promise.all
      const urls = await Promise.all(
        (photos ?? []).map(async (photo) => {
          const result = await getURLfromSupabase(photo);
          return result?.publicUrl || '';
        })
      );

      const productDetail: ProductDetail = {
        ...values,
        photos: urls,
        category: state?.categoryId,
        subCategory: state?.subcategory,
        createdAt: new Date().toISOString(),
        uid: id ?? '',
        username: username ?? '',
      };

      // upload to the the firebase
      await uploadAds(productDetail);
      setShowResponse('Added');
      resetForm();
    } catch (error) {
      toast.error(COMMON_TEXT.ERROR_IN_POSTING);
      setShowResponse('Error');
    }
  };

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
                if (isSubmitting) return COMMON_TEXT.POSTING;
                if (showResponse === 'Added')
                  return COMMON_TEXT.POSTED_SUCCESSFULLY;
                if (showResponse === 'Error')
                  return COMMON_TEXT.ERROR_IN_POSTING;
                return COMMON_TEXT.POST;
              })()}
            </button>
          </>
        );
      }}
    </Formik>
  );
}
