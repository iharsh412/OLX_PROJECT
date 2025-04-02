import * as Yup from 'yup';

export const CLASSNAME = {
  LABEL: 'post-label',
  DETAIL_TEXT: 'postForm_detailText',
  WRAPPER: 'postFormWrapper',
  BRAND: 'postForm_Brand',
  INPUTERROR: 'postErrorInput',
  YEAR: 'postForm_Year',
  FUEL: 'postForm_FuelOption',
  TITLE: 'postForm_Title',
  DESCRIPTION: 'postForm_Description',
  DISTANCE: 'postForm_Distance',
  PRICE_WRAPPER: 'postForm_PriceWrapper',
  PRICE_TEXT: 'postForm_PriceText',
  PRICE: 'postForm_Price',
  PRICE_INPUT_WRAPPER: 'postForm_PriceInputWrapper',
  LOCATION_WRAPPER: 'postForm_LocationWrapper',
  LOCATION_TEXT: 'postForm_LocationText',
  STATE: 'postForm_State',
  CITY: 'postForm_City',
  SELLER_WRAPPER: 'postForm_SellerWrapper',
  SELLER_TEXT: 'postForm_SellerText',
  SELLER_NAME: 'postForm_SellerName',
  SELLER_VERIFY_TEXT: 'postForm_SellerVerifyText',
  SELLER_CODE_TEXT: 'postForm_SellerCodeText',
  MOBILE_NUMBER: 'postForm_MobileNumber',
  MOBILE_NUMBER_WRAPPER: 'postForm_mobileNumberWrapper',
  POST: 'postForm_post',
};


export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required')
    .max(15, 'Must be less than 15 characters'),
  description: Yup.string().required('Required'),
  brand: Yup.string().required('Required'),
  price: Yup.number().required('Required'),
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