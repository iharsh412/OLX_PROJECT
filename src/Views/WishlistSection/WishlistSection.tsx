import { useGetWishlistProductsQuery } from '../../Services/Api/module/imageApi';
import ImageLayout from '../../Components/CustomComponents/ImageLayout/CarImage';
import './wishlistSection.css';
import { Product } from '../../Interface/constant';
import { CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT } from '../../Interface/constant';
import Schemer from '../../Components/Atom/Schemer';
import Error from '../../Components/Atom/Error';
import { Link } from 'react-router-dom';
import { ROUTES_CONFIG } from '../../Shared/Constants';

export default function WishlistSection() {
  const { data, isError, isLoading, refetch } = useGetWishlistProductsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  return (
    <>
      <div className={CLASSNAME.WRAPPER}>
        <span className={CLASSNAME.TEXT}>{TEXT.WISHLIST}</span>
        {isError && <Error />}
        {/*  data LENGTH>0 then render */}

        <div className={CLASSNAME.IMAGE_SECTION}>
          {isLoading
            ? Array.from({ length: 12 }, (_, i) => <Schemer key={i} />)
            : data &&
              data.length > 0 &&
              data?.map((products: Product) => (
                <ImageLayout
                  key={products?.id}
                  data={products}
                  refetch={refetch}
                />
              ))}
        </div>
        {/* if data length === 0 */}
        {data && data.length === 0 && (
          <>
            <h1>{COMMON_TEXT.NO_WISHLIST}</h1>
            <Link to={ROUTES_CONFIG.HOMEPAGE.path}>{TEXT.GO_TO_HOME}</Link>
          </>
        )}
      </div>
    </>
  );
}
