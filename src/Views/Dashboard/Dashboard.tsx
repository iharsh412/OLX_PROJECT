// import { useSelector } from 'react-redux';
// import { useEffect, useRef, useState } from 'react';
import './dashboard.css';
// import { RootState } from '../../Store/index';
// import ErrorSection from '../../Components/Atom/ErrorSection';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import ImagesLayout from '../../Components/CustomComponents/ImageLayout/ProductImage/index';
import { ProductDetail } from '../../Helper/interface';
import { COMMON_TEXT } from '../../Helper/constant';
import CLASSNAME from './constant';
import { dashboardFirstPage, dashboardNextPage } from '../../Helper/function';
import Schemer from '../../Components/Atom/Schemer/Schemer';

export default function Dashboard() {
  const [data, setData] = useState<ProductDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastAds, setLastAds] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const lastVisibleAds = useRef<QueryDocumentSnapshot<DocumentData> | null>(
    null
  );
  const limit = 3;
  // const search = useSelector((state: RootState) => state?.areaItem?.item);
  // const [page, setPage] = useState(1);

  // const [totalImages, setTotalImages] = useState<Product[]>([]);

  // useEffect(() => {
  //   setTotalImages([]);
  //   setPage(1);
  // }, [search]);

  // useEffect(() => {
  //   if (data && page === 1) {
  //     setTotalImages(() => {
  //       return [...data];
  //     });
  //   } else if (data) {
  //     setTotalImages((prev) => {
  //       return [...prev, ...data];
  //     });
  //   }
  // }, [data, search]);
  useEffect(() => {
    async function fetchData() {
      const { adsData, lastVisible } = await dashboardFirstPage();
      setData(adsData);
      lastVisibleAds.current = lastVisible;
      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (lastAds) {
        const { adsData, lastVisible } = await dashboardNextPage(lastAds);
        setData((prev) => [...prev, ...adsData]);
        lastVisibleAds.current = lastVisible;
        setLastAds(null);
      }
    }

    if (lastAds) {
      fetchData();
    }
  }, [lastAds]);

  return (
    <>
      {/* total images  */}
      {data && (
        <div className={CLASSNAME.WRAPPER}>
          {isLoading && (
            <div className={CLASSNAME.LOADER}>
              {Array.from({ length: 10 }, (_, i) => (
                <Schemer key={i} />
              ))}
            </div>
          )}
          {/* {isError && <ErrorSection />} */}
          <div className={CLASSNAME.IMAGE_SECTION}>
            {/* totalImages.length greater then 0 */}
            {data &&
              data.length > 0 &&
              data?.map((product: ProductDetail) => (
                <ImagesLayout key={product.id} data={product} />
              ))}
            {/* totalImages.length is eqauls to 0 */}
          </div>
          {data && data.length === 0 && (
            <h2 className={CLASSNAME.NO_PRODUCTS}>{COMMON_TEXT.NO_PRODUCTS}</h2>
          )}
          {/* load section */}
          {data && data.length !== 0 && data.length % limit === 0 && (
            <button
              type="button"
              className={CLASSNAME.LOAD}
              onClick={() => setLastAds(lastVisibleAds.current)}
            >
              {COMMON_TEXT.LOAD_MORE}
            </button>
          )}
        </div>
      )}
    </>
  );
}
