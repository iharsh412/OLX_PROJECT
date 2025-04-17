import { useGetWishlistProductsQuery } from '../../Services/Api/module/imageApi';
import ImageLayout from '../../Components/CustomComponents/ImageLayout/CarImage';
import './wishlistSection.css';
import { Product } from '../../Interface/constant';
import { CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT } from '../../Interface/constant';
import { ClipLoader } from 'react-spinners';

export default function WishlistSection() {
  const { data, isError, isLoading, refetch } = useGetWishlistProductsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  return (
    <>
      <div className={CLASSNAME.WRAPPER}>
        <span className={CLASSNAME.TEXT}>{TEXT.WISHLIST}</span>
        {isLoading && (
          <div className="loading">
            <ClipLoader color="black" size={50} loading={true} />
          </div>
        )}
        {isError && <h1>{COMMON_TEXT.ERROR}</h1>}
        {/*  data then render */}
        {data && data.length > 0 && (
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
