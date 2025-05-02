import './pagination.css';
import { CLASSNAME, PaginationProps, TEXT } from './contant';

function Pagination({ page, totalpage, showButton, setPage }: PaginationProps) {
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
        {TEXT.PREV}
      </button>
      <div className={CLASSNAME.PAGE_COUNT_WRAPPER}>
        {Array(totalpage)
          ?.fill('')
          ?.map((_, index) => {
            return (
              <button
                type="button"
                key={index}
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
        {TEXT.NEXT}
      </button>
    </div>
  );
}
export default Pagination;
