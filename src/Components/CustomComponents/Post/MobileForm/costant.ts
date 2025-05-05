import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required')
    .max(50, 'Must be less than 50 characters'),
  description: Yup.string().required('Required'),
  brand: Yup.string().required('Required'),
  price: Yup.number()
    .required('Required')
    .min(100, 'Must be greater than 100')
    .max(15000000, 'Must be less than 15 lakhs'),
  photos: Yup.array().min(1, 'Required').required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  mobileNumber: Yup.string()
    .required('Required')
    .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
  sellerName: Yup.string()
    .required('Required')
    .matches(
      /^[A-Za-z\s]+$/,
      'Seller name should contain only alphabets and spaces'
    )
    .min(3, 'Seller name should be at least 3 characters long'),
});
export const initialValues = {
  title: '',
  description: '',
  brand: '',
  price: '',
  photos: [],
  state: '',
  city: '',
  sellerName: '',
  mobileNumber: '',
};
