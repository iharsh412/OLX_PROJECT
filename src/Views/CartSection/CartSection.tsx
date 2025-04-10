// import { useSelector } from 'react-redux';
import { useGetWishlistProductsQuery } from '../../Services/Api/module/imageApi';
// import { RootState } from '../../Store';
import ImageLayout from '../../Components/CustomComponents/imagesLayout/CarImage';
import './CartSection.css';
import { Product } from '../../Interface/constant';
import { CLASSNAME } from './constant';
import { COMMON_TEXT } from '../../Interface/constant';

export default function CartSection() {
  const { data, error, isLoading, refetch } = useGetWishlistProductsQuery(
    {},{ refetchOnMountOrArgChange: true }
  );

  return (
    <>
      <div className={CLASSNAME.WRAPPER}>
        <span className={CLASSNAME.TEXT}> WISHLIST</span>
        {isLoading ? (
          <h1>{COMMON_TEXT.LOADING}</h1>
        ) : error ? (
          <h1>{COMMON_TEXT.ERROR}</h1>
        ) : (
          <div className={CLASSNAME.IMAGE_SECTION}>
            {data?.map((products: Product) => (
              <ImageLayout
                key={products?.id}
                data={products}
                refetch={refetch}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
