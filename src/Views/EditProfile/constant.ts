import * as Yup from 'yup';
export const CLASSNAME = {
  WRAPPER: 'edit-profile-wrapper',
  HEADER_WRAPPER: 'edit-profile-header-wrapper',
  EDIT_TEXT: 'edit-profile-text',
  POST: 'edit-profile-edit',
  CROSS: 'edit-profile-cross',
  VIEW_PROFILE: 'edit-profile-view-profile',
};
export const TEXT = {
  TITLE: 'Edit Profile',
  SUBMIT_BUTTON: 'Save Changes',
  EDIT: 'Edit',
  VIEW_PROFILE: 'View Profile',
  SUCCESS: 'Profile updated successfully',
  ERROR: 'Error updating profile',
};

export const validationSchema = Yup.object().shape({
  phonenumber: Yup.string().matches(
    /^[0-9]{10}$/,
    'Mobile number must be exactly 10 digits'
  ),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  username: Yup.string()
    .required('Seller name is required')
    .matches(
      /^[A-Za-z\s]+$/,
      'Seller name should contain only alphabets and spaces'
    )
    .min(3, 'Seller name should be at least 3 characters long'),
});

export const initialValues = {
  username: '',
  phonenumber: '',
  ['about me']: '',
  email: '',
};
export interface FormValues {
  username: string;
  phonenumber: string;
  ['about me']: string;
  email: string;
}
