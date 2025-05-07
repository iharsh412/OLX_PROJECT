import './pagination.css';
import { CLASSNAME } from './contant';
import { COMMON_TEXT } from '../../../Helper/constant';
import { PaginationProps } from '../../../Helper/interface';

function Pagination({
  page,
  totalpage,
  showButton,
  setPage,
}: Readonly<PaginationProps>) {
  const handlePrevPage = () => {
    setPage((prev: number) => prev - 1);
  };
  const handleNextPage = () => {
    setPage((prev: number) => prev + 1);
  };
  if (totalpage < 2) return null;
  return (
    <div className={CLASSNAME.WRAPPER}>
      <button
        type="button"
        className={`${CLASSNAME.PREV} ${
          showButton.prev ? '' : CLASSNAME.DISABLED
        }`}
        onClick={handlePrevPage}
      >
        {COMMON_TEXT.PREV}
      </button>
      <div className={CLASSNAME.PAGE_COUNT_WRAPPER}>
        {Array(totalpage)
          ?.fill('')
          ?.map((_, index) => {
            return (
              <button
                type="button"
                key={`${COMMON_TEXT.PAGE}-${index + 1}`}
                onClick={() => setPage(index + 1)}
                disabled={index + 1 === page}
                className={`${CLASSNAME.PAGE_NUMBER} ${
                  index + 1 === page ? CLASSNAME.ACTIVE_PAGE : ''
                }`}
              >
                {index + 1}
              </button>
            );
          })}
      </div>

      <button
        type="button"
        className={`${CLASSNAME.NEXT} ${
          showButton.next ? '' : CLASSNAME.DISABLED
        }`}
        onClick={handleNextPage}
      >
        {COMMON_TEXT.NEXT}
      </button>
    </div>
  );
}
export default Pagination;
