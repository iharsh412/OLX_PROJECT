import { useGetTypeProductsQuery } from '../../Services/Api/module/imageApi/index.ts';
import ImagesLayout from '../../Components/CustomComponents/ImageLayout/CarImage/index.ts';
import './dashboard.css';
import { useEffect, useState } from 'react';
import { COMMON_TEXT } from '../../Interface/constant.ts';
import { CLASSNAME, TEXT } from './constant.ts';
import { Product } from '../../Interface/constant.ts';
import { RootState } from '../../Store/index.ts';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

export default function Dashboard() {
  const search = useSelector((state: RootState) => state?.areaItem?.item);
  const [page, setPage] = useState(1);
  const limit = 12;
  const { data, isError, isLoading } = useGetTypeProductsQuery(
    { page, limit, search },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true }
  );
  const [totalImages, setTotalImages] = useState<Product[]>([]);
  console.log(page, 'page');

  // Hooks
  useEffect(() => {
    setTotalImages([]);
    setPage(1);
  }, [search]);

  useEffect(() => {
    console.log(data, 'data');
    if (data && page === 1) {
      setTotalImages(() => {
        return [...data];
      });
    } else {
      if (data)
        setTotalImages((prev) => {
          return [...prev, ...data];
        });
    }
  }, [data]);
console.log(totalImages, 'totalImages');
console.log(data, 'data')
  return (
    <>
      {/* total images  */}
      {totalImages && (
        <div className={CLASSNAME.WRAPPER}>
          <div className={CLASSNAME.IMAGE_SECTION}>
            {isLoading && (
              <div className="loading">
                <ClipLoader color="black" size={50} loading={true} />
              </div>
            )}
            {isError && <ClipLoader color="#ffffff" size={50} loading={true} />}
            {/* totalImages.length greater then 0 */}
            {data &&
              totalImages.length > 0 &&
              totalImages?.map((product: Product) => (
                <ImagesLayout key={product.id} data={product} />
              ))}
            {/* totalImages.length is eqauls to 0 */}
            {data && totalImages.length === 0 && (
              <h2>{COMMON_TEXT.NO_PRODUCTS}</h2>
            )}
          </div>
          {/* load section */}
          {data?.length === limit && (
            <button
              className={CLASSNAME.LOAD}
              onClick={() => setPage((prev) => prev + 1)}
            >
              {TEXT.LOAD}
            </button>
          )}
        </div>
      )}
    </>
  );
}
