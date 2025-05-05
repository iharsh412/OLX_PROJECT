export interface PaginationProps {
  readonly page: number;
  readonly totalpage: number;
  readonly setPage: (prev: any) => any;
  readonly showButton: { prev: boolean; next: boolean };
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
