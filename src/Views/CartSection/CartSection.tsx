import { useGetWishlistProductsQuery } from '../../Services/Api/module/imageApi';
import ImageLayout from '../../Components/CustomComponents/ImageLayout/CarImage';
import './CartSection.css';
import { Product } from '../../Interface/constant';
import { CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT } from '../../Interface/constant';

export default function CartSection() {
  const { data, isError, isLoading, refetch } = useGetWishlistProductsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  return (
    <>
      <div className={CLASSNAME.WRAPPER}>
        <span className={CLASSNAME.TEXT}>{TEXT.WISHLIST}</span>
        {isLoading && <h1>{COMMON_TEXT.LOADING}</h1>}
        {isError && <h1>{COMMON_TEXT.ERROR}</h1>}
        {/*  data then render */}
        {data && data.length >0 && (
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
        {/* if data length === 0 */}
        {data && data.length === 0 && <h1>{COMMON_TEXT.NO_PRODUCTS}</h1>}
      </div>
    </>
  );
}
