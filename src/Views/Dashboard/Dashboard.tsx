import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Schemer from '../../Components/Atom/Schemer/Schemer';
import { useGetTypeProductsQuery } from '../../Services/Api/module/imageApi/index';
import ImagesLayout from '../../Components/CustomComponents/ImageLayout/ProductImage/index';
import './dashboard.css';
import { COMMON_TEXT } from '../../Helper/constant';
import { Product } from '../../Helper/interface';
import { CLASSNAME } from './constant';
import { RootState } from '../../Store/index';
import ErrorSection from '../../Components/Atom/ErrorSection';

export default function Dashboard() {
  const search = useSelector((state: RootState) => state?.areaItem?.item);
  const [page, setPage] = useState(1);
  const limit = 20;
  const { data, isError, isLoading } = useGetTypeProductsQuery(
    { page, limit, search },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true }
  );
  const [totalImages, setTotalImages] = useState<Product[]>([]);

  // Hooks
  useEffect(() => {
    setTotalImages([]);
    setPage(1);
  }, [search]);

  useEffect(() => {
    if (data && page === 1) {
      setTotalImages(() => {
        return [...data];
      });
    } else if (data) {
      setTotalImages((prev) => {
        return [...prev, ...data];
      });
    }
  }, [data, search]);

  return (
    <>
      {/* total images  */}
      {totalImages && (
        <div className={CLASSNAME.WRAPPER}>
          {isLoading && (
            <div className={CLASSNAME.LOADER}>
              {Array.from({ length: 10 }, (_, i) => (
                <Schemer key={i} />
              ))}
            </div>
          )}
          {isError && <ErrorSection />}
          <div className={CLASSNAME.IMAGE_SECTION}>
            {/* totalImages.length greater then 0 */}
            {data &&
              totalImages.length > 0 &&
              totalImages?.map((product: Product) => (
                <ImagesLayout key={product.id} data={product} />
              ))}
            {/* totalImages.length is eqauls to 0 */}
          </div>
          {data && totalImages.length === 0 && (
            <h2 className={CLASSNAME.NO_PRODUCTS}>{COMMON_TEXT.NO_PRODUCTS}</h2>
          )}
          {/* load section */}
          {data?.length !== 0 && data?.length === limit && (
            <button
              type="button"
              className={CLASSNAME.LOAD}
              onClick={() => setPage((prev) => prev + 1)}
            >
              {COMMON_TEXT.LOAD_MORE}
            </button>
          )}
        </div>
      )}
    </>
  );
}
