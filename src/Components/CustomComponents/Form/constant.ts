import { FormikTouched } from 'formik';

export interface FormProps {
  touched: FormikTouched<{
    title?: string;
    description?: string;
    brand?: string;
    year?: string;
    fuel?: string;
    distance?: string;
    price?: string;
    photos?: never[];
    state?: string;
    city?: string;
    sellerName?: string;
    mobileNumber?: string;
  }>;
  errors: any;
  values: {
    title?: string;
    description?: string;
    brand?: string;
    year?: string;
    fuel?: string;
    distance?: string;
    price?: string;
    photos?: never[];
    state?: string;
    city?: string;
    sellerName?: string;
    mobileNumber?: string;
  };
  share: any;
}
