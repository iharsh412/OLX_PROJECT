import { useGetTypeProductsQuery } from '../../Services/Api/module/imageApi/index.ts';
import ImagesLayout from '../../Components/CustomComponents/imagesLayout/CarImage/index.ts';
import './dashboard.css';
import { useEffect, useState } from 'react';
import { COMMON_TEXT } from '../../Interface/constant.ts';
import { CLASSNAME, TEXT } from './constant.ts';
import { Product } from '../../Interface/constant.ts';
import { RootState } from '../../Store/index.ts';
import { useSelector } from 'react-redux';
// import { setItem } from '../../Store/AreaItem/index.ts';

export default function Dashboard() {
  // const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state?.areaItem?.item);
  // const token = useSelector((state: RootState) => state?.common);
  // console.log(token, 'token');

  const [page, setPage] = useState(1);

  const limit = 12;
  const { data, error, isLoading, refetch } = useGetTypeProductsQuery(
    { page, limit, search },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true }
  );
  // console.log(error, data, 'data');

  const [totalImages, setTotalImages] = useState<Product[]>([]);
  // console.log(totalImages, 'totalImages')

  useEffect(() => {
    setTotalImages([]);
    refetch();
  }, [search]);

  useEffect(() => {
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
      {isLoading ? (
        <h1>{COMMON_TEXT.LOADING}</h1>
      ) : error ? (
        <h1>{COMMON_TEXT.ERROR}</h1>
      ) : (
        <div className={CLASSNAME.WRAPPER}>
          <div className={CLASSNAME.IMAGE_SECTION}>
            {totalImages.length ? (
              totalImages?.map((product: Product) => (
                <ImagesLayout
                  key={product.id}
                  data={product}
                  refetchDashboard={refetch}
                />
              ))
            ) : (
              <h2>{COMMON_TEXT.NO_PRODUCTS}</h2>
            )}
          </div>

          {data?.length === limit && (
            <div
              className={CLASSNAME.LOAD}
              onClick={() => setPage((prev) => prev + 1)}
            >
              {TEXT.LOAD}
            </div>
          )}
        </div>
      )}
    </>
  );
}
