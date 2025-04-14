import { useGetTypeProductsQuery } from '../../Services/Api/module/imageApi/index.ts';
import ImagesLayout from '../../Components/CustomComponents/ImageLayout/CarImage/index.ts';
import './dashboard.css';
import { useEffect, useState } from 'react';
import { COMMON_TEXT } from '../../Interface/constant.ts';
import { CLASSNAME, TEXT } from './constant.ts';
import { Product } from '../../Interface/constant.ts';
import { RootState } from '../../Store/index.ts';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const search = useSelector((state: RootState) => state?.areaItem?.item);
  const [page, setPage] = useState(1);
  const limit = 8;
  const { data, isError, isLoading, refetch } = useGetTypeProductsQuery(
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
    if (data) {
      setTotalImages((prevImages) => {
        const newDataMap = new Map(data.map((item) => [item.id, item]));

        const updatedImages = prevImages.map((product) => {
          const matchingItem = newDataMap.get(product.id);
          if (matchingItem) {
            return { ...product, is_favourite: matchingItem.is_favourite };
          }
          return product;
        });

        const newItems = data.filter(
          (item) => !prevImages.some((product) => product.id === item.id)
        );

        return [...updatedImages, ...newItems];
      });
    }
  }, [data]);
  return (
    <>
      {isLoading && <h1>{COMMON_TEXT.LOADING}</h1>}
      {isError && <h1>{COMMON_TEXT.ERROR}</h1>}
      {/* total images  */}
      {totalImages && (
        <div className={CLASSNAME.WRAPPER}>
          <div className={CLASSNAME.IMAGE_SECTION}>
            {/* totalImages.length greater then 0 */}
            {data &&
              totalImages.length > 0 &&
              totalImages?.map((product: Product) => (
                <ImagesLayout
                  key={product.id}
                  data={product}
                  refetchDashboard={refetch}
                />
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
