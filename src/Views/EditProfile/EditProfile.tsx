import { Formik } from 'formik';
import './editProfile.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  CLASSNAME,
  FormValues,
  validationSchema,
  initialValues,
  TEXT,
} from './constant';
import {
  AboutMe,
  TextField,
  Email,
  PhoneNumber,
} from '../../Components/CustomComponents/Post/Common/Common';
import { ROUTES_CONFIG } from '../../Shared/Constants';
import ICONS from '../../assets';
import { COMMON_TEXT } from '../../Helper/constant';
import {
  useGetUserInfoQuery,
  usePostEditProfileDataMutation,
  usePostEmailValidMutation,
} from '../../Services/Api/module/imageApi';
import { updateUsername } from '../../Store/Common';
import Loader from '../../Components/Atom/Loader';
import ErrorSection from '../../Components/Atom/ErrorSection';

export default function EditProfile() {
  const { data, isLoading, isError } = useGetUserInfoQuery({});
  const [post] = usePostEditProfileDataMutation();
  const [postEmailValid] = usePostEmailValidMutation();
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //    submiting form
  const handleSubmit = async (values: FormValues) => {
    try {
      await postEmailValid({ email: values.email }).unwrap();
      await post({
        ...values,
      }).unwrap();
      toast.success(TEXT.SUCCESS);
      dispatch(updateUsername({ username: values?.username }));
      navigate(ROUTES_CONFIG.PROFILE.path);
    } catch (error) {
      toast.error((error as any)?.data?.msg);
    }
  };

  //    to set the initial value
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

  if (isLoading) return <Loader />;
  if (isError) return <ErrorSection />;

  return (
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
          <div className={CLASSNAME.WRAPPER}>
            {/* header wrapper */}
            <div className={CLASSNAME.HEADER_WRAPPER}>
              {/* cross */}
              <Link className={CLASSNAME.CROSS} to={ROUTES_CONFIG.PROFILE.path}>
                <img src={ICONS.arrow} alt={COMMON_TEXT.IMG} />
              </Link>
              {/* text */}
              <h3 className={CLASSNAME.EDIT_TEXT}>{TEXT.TITLE}</h3>
              {/* view profile */}
              <Link
                className={CLASSNAME.VIEW_PROFILE}
                to={ROUTES_CONFIG.PROFILE.path}
              />
            </div>
            {/* name Input */}
            <TextField
              type="text"
              htmlFor="username"
              value={values.username}
              label="Name"
              err={errors.username}
              tch={touched.username}
              {...share}
            />
            {/* email section */}
            <Email
              type="email"
              htmlFor="email"
              value={values.email}
              label="Email"
              err={errors.email}
              tch={touched.email}
              {...share}
            />
            {/* phone number */}
            <PhoneNumber
              type="text"
              htmlFor="phonenumber"
              value={values.phonenumber}
              label="Mobile Number"
              err={errors.phonenumber}
              tch={touched.phonenumber}
              {...share}
            />

            {/* About Me Input */}
            <AboutMe
              type="text"
              htmlFor="about me"
              value={values['about me']}
              err={errors['about me']}
              tch={touched['about me']}
              label="About me"
              {...share}
            />
            <hr />
            {/* Submit Button */}
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className={CLASSNAME.POST}
              disabled={isSubmitting}
            >
              {isSubmitting ? COMMON_TEXT.EDITING : TEXT.EDIT}
            </button>
          </div>
        );
      }}
    </Formik>
  );
}
