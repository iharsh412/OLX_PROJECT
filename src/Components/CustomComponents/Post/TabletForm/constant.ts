import * as Yup from 'yup';

export const CLASSNAME = {
  LABEL: 'post-label',
  DETAIL_TEXT: 'postForm_detailText',
  WRAPPER: 'postFormWrapper',
  ERROR: "textField_error",
  LOCATION_WRAPPER: 'postForm_LocationWrapper',
  LOCATION_TEXT: 'postForm_LocationText',
  SELLER_WRAPPER: 'postForm_SellerWrapper',
  SELLER_TEXT: 'postForm_SellerText',
  POST: 'postForm_post',
};


export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required')
    .max(20, 'Must be less than 15 characters'),
  description: Yup.string().required('Required'),
  brand: Yup.string().required('Required'),
  price: Yup.number().required('Required').min(100, "Must be greater than 100").max(10000000, "Must be less than 10 lakhs"),
  photos: Yup.array()
    .min(1, 'Please upload at least one photo')
    .max(5, 'min 5 photos')
    .required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  mobileNumber: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
  sellerName: Yup.string()
    .required('Seller name is required')
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
export interface FormValues {
  title?: string;
  description?: string;
  brand?: string;
  year?: string;
  fuel?: string;
  distance?: string;
  price?: string;
  photos: File[];
  state?: string;
  city?: string;
  sellerName?: string;
  mobileNumber?: string;
}
export const TEXT ={
  INCLUDE_DETAIL:"INCLUDE SOME DETAILS",
  CONFIRM_LOCATION:"CONFIRM YOUR LOCATION",
  REVIEW_DETAIL:"REVIEW YOUR DETAILS"
} 