import { Link } from 'react-router-dom';
import { useGetWishlistProductsQuery } from '../../Services/Api/module/imageApi';
import ImageLayout from '../../Components/CustomComponents/ImageLayout/ProductImage';
import './wishlist.css';
import { COMMON_TEXT } from '../../Helper/constant';
import { Product } from '../../Helper/interface';
import CLASSNAME from './constant';
import Schemer from '../../Components/Atom/Schemer';
import ErrorSection from '../../Components/Atom/ErrorSection';
import { ROUTES_CONFIG } from '../../Shared/Constants';

export default function Wishlist() {
  const { data, isError, isLoading, refetch } = useGetWishlistProductsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  return (
    <div className={CLASSNAME.WRAPPER}>
      <span className={CLASSNAME.TEXT}>{COMMON_TEXT.WISHLIST}</span>
      {isError && <ErrorSection />}

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
          <Link to={ROUTES_CONFIG.HOMEPAGE.path}>{COMMON_TEXT.GO_TO_HOME}</Link>
        </>
      )}
    </div>
  );
}
