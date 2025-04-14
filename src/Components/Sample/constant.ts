import { Product } from "../../Interface/constant";

export const CLASSNAME = {
  WRAPPER: 'sample-Wrapper',
  ADD_SECTION: 'sample-addSection',
  TEXT_SECTION: 'sample-textSection',
  MAIN_SECTION_WRAPPER: 'sample-mainSectionWrapper',
  MAIN_SECTION_IMAGE: 'sample-mainSectionImage',
  MAIN_SECTION_FILTER: 'sample-mainSectionFilter',
  MAIN_IMAGE_SECTION_WRAPPER:"sample-mainImageSectionWrapper",
  FILTER_TITLE: 'sample-filterTitle',
  SUBCATEGORY: 'sample-subcategory',
  BRAND: 'sample-brand',
  PRICE: 'sample-price',
};

export const TEXT = {
  TEXT_SECTION: {
    H3: 'Buy & Sell Used Bikes in India',
  },
};
export interface SampleData {
  category?: string;
  subcategory: string;
  brand: string[];
  price: [number, number];
}
export interface ResponseData {
  products?: Product[];
  subcategories?: { subcategory_name: string; product_count: number }[];
  Brand?: string[];
  count?:number |undefined ;
}
