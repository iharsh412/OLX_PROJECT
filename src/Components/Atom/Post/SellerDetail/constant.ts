import * as Yup from 'yup';
export const CLASSNAME ={
   LABEL:"post-label",
   DETAIL_TEXT:"postForm_detailText",
   WRAPPER :"postFormWrapper",
   BRAND:"postForm_Brand",
   INPUTERROR : "postErrorInput",
   YEAR: "postForm_Year",
    FUEL: "postForm_FuelOption",
    TITLE:"postForm_Title",
    DESCRIPTION:"postForm_Description",
    DISTANCE :"postForm_Distance",
    PRICE_WRAPPER:"postForm_PriceWrapper",
    PRICE_TEXT:"postForm_PriceText",
    PRICE:"postForm_Price",
    PRICE_INPUT_WRAPPER:"postForm_PriceInputWrapper",






}
export const FuelOptions = [
  { id: "1", label: "CNG" },
  { id: "2", label: "Diesel" },
  { id: "3", label: "Electric" },
  { id: "4", label: "LPG" },
  { id: "5", label: "Petrol" },
];

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required')
    .max(15, 'Must be less than 15 characters'),
  description: Yup.string().required('Required'),
  brand: Yup.string().required('Required'),
  year: Yup.number().required("Required"),
  fuel: Yup.string().required("Please select a fuel type"),
  distance: Yup.number().required("Required"),
  price: Yup.number().required("Required"),
  photos: Yup.array().max(5, "min 5 photos").required("Required"),

});

export const initialValues={
    title: "",
    description: "",
    brand: "",
    year: "",
    fuel: "",
    distance: "",
    price: "",
    photos: [],
  }