export interface PaginationProps {
  setPage: (prev: any) => any;
  totalpage: number;
  page: number;
  showButton: { prev: boolean; next: boolean };
}
export const CLASSNAME = {
  WRAPPER: 'sample-PageChange',
  PREV: 'sample-PREV',
  DISABLED: 'sample-disabled',
  PAGE_COUNT_WRAPPER: 'sample-pagewrapper',
  PAGE_NUMBER: 'sample-pageNumber',
  ACTIVE_PAGE: 'sample-activepage',
  NEXT: 'sample-NEXT',
};
export const TEXT = {
  NEXT: 'Next',
  PREV: 'Prev',
};
