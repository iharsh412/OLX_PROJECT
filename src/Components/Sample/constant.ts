import { Product } from "../../Interface/constant";

export const CLASSNAME = {
  WRAPPER: 'sample-Wrapper',
  ADD_SECTION: 'sample-addSection',
  TEXT_SECTION: 'sample-textSection',
  MAIN_SECTION_WRAPPER: 'sample-mainSectionWrapper',
  MAIN_SECTION_IMAGE: 'sample-mainSectionImage',
  MAIN_IMAGE_SECTION_WRAPPER: "sample-mainImageSectionWrapper",
  SELECTED_OPTION: "sample-selectedOptions",
  SELECTED_OPTION_WRAPPER: "sample-selectedWrapper",
  SELECTED_OPTION_TEXT: "sample-selectedText",
  SELECTED_OPTION_CROSS: "sample-selectedCross",
  NO_PRODUCTS: "sample-noProduct",

};

export const TEXT = {
  NO_PRODUCT_AVAILABLE: "No product available"

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
  count?: number | undefined;
}
