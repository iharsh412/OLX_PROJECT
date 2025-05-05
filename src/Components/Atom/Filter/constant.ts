import { ResponseData, SampleData } from '../../Sample/constant';

export const CLASSNAME = {
  MAIN_SECTION_FILTER: 'sample-mainSectionFilter',
  FILTER_TITLE: 'sample-filterTitle',
  SUBCATEGORY: 'sample-subcategory',
  BRAND: 'sample-brand',
  PRICE: 'sample-price',
  SUBCATEGORY_LIST: 'sample-subcategoryOption',
  SUBCATEGORY_ITEM: 'sample-subcategoryOption__item',
  NO_PRODUCTS: 'sample-brandOption__noBrand',
  BRAND_LIST: 'sample-brandOption',
  BRAND_ITEMS: 'sample-brandOption__item',
  PRICE_LIST: 'sample-priceOption',
  PRICE_MIN: 'sample_priceMin',
  PRICE_MAX: 'sample_priceMax',
  APPLY: 'sample-priceOption__apply',
  ACTIVE: 'sample-active',
};
export interface FilterProps {
  readonly category?: string;
  readonly response?: ResponseData;
  readonly sampleData?: SampleData;
  readonly setSampleData?: (arg: any) => void;
  readonly price?: [number, number];
  readonly setPrice?: (arg: any) => void;
}
export const TEXT = {
  CATEGORY: 'Category',
  NO_CATEGORY: 'No category available',
  NO_BRAND: 'No brand available',
  BRAND: 'Brand',
  PRICE: 'Price',
  PRICE_MIN: 'Min',
  PRICE_MAX: 'Max',
  APPLY: 'Apply',
};
