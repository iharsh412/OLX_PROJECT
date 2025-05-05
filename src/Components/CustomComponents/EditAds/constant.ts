import * as Yup from 'yup';

export const CLASSNAME = {
  DETAIL_TEXT: 'editForm_detailText',
  WRAPPER: 'editForm_Wrapper',
  MAIN: 'editForm_Main',
  LOCATION_WRAPPER: 'editForm_LocationWrapper',
  LOCATION_TEXT: 'editForm_LocationText',
  POST: 'editForm_post',
};

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required')
    .max(20, 'Must be less than 15 characters'),
  description: Yup.string().required('Required'),
  brand: Yup.string().required('Required'),
  year: Yup.number()
    .required('Required')
    .integer('year must be integer')
    .min(1900, 'Must be greater than 1900')
    .max(new Date().getFullYear(), 'Select correct year'),
  price: Yup.number()
    .required('Required')
    .min(100, 'Must be greater than 100')
    .max(10000000, 'Must be less than 10 lakhs'),
  images: Yup.array()
    .min(1, 'Please upload at least one photo')
    .max(5, 'min 5 photos')
    .required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
});

export const initialValues = {
  title: '',
  description: '',
  brand: '',
  year: '',
  price: '',
  images: [] as File[],
  state: '',
  city: '',
};
export interface FormValues {
  title?: string;
  description?: string;
  brand?: string;
  year?: string;
  price?: string;
  images?: File[];
  state?: string;
  city?: string;
}
export const TEXT = {
  INCLUDE_DETAIL: 'EDIT YOUR ADS',
  CONFIRM_LOCATION: 'CONFIRM YOUR LOCATION',
  EDIT: 'Edit',
  REVIEW_DETAIL: 'REVIEW YOUR DETAILS',
  EDITING: 'Sending...',
  SUCCESS: 'ADs edited successfully',
  ERROR: 'Error in editing',
};
export interface EditAdsProps {
  readonly setEditOpen: (open: boolean) => void;
  readonly refetch?: () => void;
  readonly data: {
    created_at?: React.ReactNode;
    id: number;
    name: string;
    price: React.ReactNode;
    display_photo?: string | null;
    category?: React.ReactNode;
    city?: React.ReactNode;
    district?: React.ReactNode;
    state?: React.ReactNode;
    status?: React.ReactNode;
    subcategory?: React.ReactNode;
    user?: React.ReactNode;
    description?: string;
    is_favourite?: boolean;
  };
}
