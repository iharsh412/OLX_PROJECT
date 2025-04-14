import { FormikErrors } from "formik";

export const CLASSNAME = {
    //   Description
    LABEL_WRAPPER: "post-labelWrapper",
    LABEL: 'post-label',
    DESCRIPTION: 'postForm_Description',
    INPUTERROR: 'postErrorInput',
    //Text Field
    CONTAINER: "textField",
    INPUT: "textField_input",
    ERROR: "textField_error",
    // Photos Field
    UPLOAD_TEXT: "postForm_UploadText",
    PHOTO_CONTAINER: "postForm_photo-container",
    PHOTO_BOX: "postForm_photo-box",
    PREVIEW: "postForm_photo-preview",
    UPLOAD: "postForm_photo-upload",
    FILE_INPUT: "postForm_file-input",
    CAMERA: "postForm_Camera",
    ADD_PHOT0: "postForm_phototext",
    PREVIEW_WRAPPER: "postForm_PreviewWrapper",
    // Price Field
    PRICE_WRAPPER: 'postForm_PriceWrapper',
    PRICE_TEXT: 'postForm_PriceText',
    PRICE: 'postForm_Price',
    PRICE_INPUT_WRAPPER: 'postForm_PriceInputWrapper',
    // Seller
    SELLER_VERIFY_TEXT: 'postForm_SellerVerifyText',
    SELLER_CODE_TEXT: 'postForm_SellerCodeText',
    MOBILE_NUMBER: 'postForm_MobileNumber',
    MOBILE_NUMBER_WRAPPER: 'postForm_mobileNumberWrapper',
    // State
    STATE_INPUT_WRAPPER: "postForm_StateWrapper",
    STATE: 'postForm_State',
    STATE_LIST :"postForm_StateList",
    STATE_ITEMS:"postForm_StateItems",
    //City
    CITY: 'postForm_City',
    CITY_LIST :"postForm_CityList",








}

export const LOCATION = {
    PUNJAB: ["MOHALI", "JALANDHAR", "CHANDIGARH"],
    HARYANA: ["AMBALA", "KURUKSHETRA", "KARNAL"],
    ["UTTAR PRDESH"]: ["DELHI"],
    ["HIMACHA PRADESH"]: ["SHIMLA"]
}

export enum COUNT {
    Description = 50,
    Brand = 10,
    Name = 15,
    Year = 4,
    "KM driven" = 5,
    "Ad title" = 20

}
export interface TextFieldProps {
    handleChange?: (e: React.ChangeEvent<any>) => void;
    handleBlur?: (e: React.FocusEvent<any>) => void;
    htmlFor: string;
    label: string;
    value?: string | number | boolean | [];
    type?: string;
    err?: string | object | boolean | undefined;
    tch?: boolean;
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<any>>;
    state?:string
}
export interface PhotosProps {
    value: File[] ;
    type?: string;
    label: string;
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<any>>;

}
export const TEXT = {
    VERIFY: "Let's verify your account",
    CONFIRMATION: " We will send you a confirmation code by sms on the next step.",
    CODE: "+91",
    UPLOAD_PHOTOS: "UPLOAD UP TO 5 PHOTOS",
    ADD_PHOTO: "Add Photo"
} 