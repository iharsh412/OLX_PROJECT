import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Schemer from '../../Components/Atom/Schemer/Schemer';
import { useGetTypeProductsQuery } from '../../Services/Api/module/imageApi/index';
import ImagesLayout from '../../Components/CustomComponents/ImageLayout/ProductImage/index';
import './dashboard.css';
<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';

export default function Dashboard() {
  const [start, setStart] = useState(1);
  const limit = 1;

  const { data, error, isLoading } = useGetProductsQuery({ start, limit });

  const imagesData = useRef<any[]>([]); // Use ref to store loaded products
  const [, forceRender] = useState({}); // Dummy state to trigger re-render

  // Append new data to ref and trigger re-render
  useEffect(() => {
    if (data && data.length) {
      imagesData.current = [...imagesData.current, ...data]; // Concatenate old and new data
      forceRender({}); // Trigger a re-render
    }
  }, [data]);
=======
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
>>>>>>> features

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
<<<<<<< HEAD
    <div className="homeImageSectionWraper">
      <div className="homeImageSection">
        {imagesData.current.map((product: any) => (
          <ImagesLayout key={product?.id} data={product} />
        ))}
      </div>
      <div
        className="homeImageLoadMore"
        onClick={() => setStart((prev) => prev + limit)}
      >
        Load More
      </div>
    </div>
=======
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
>>>>>>> features
  );
}
