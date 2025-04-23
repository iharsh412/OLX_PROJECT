import './myAds.css';
import { useGetAdsDataQuery } from '../../Services/Api/module/imageApi';
import { CLASSNAME, TEXT } from './constant';
import Images from '../../Components/CustomComponents/ImageLayout/MyAdsImage';
import { Product } from '../../Interface/constant';
import Error from '../../Components/Atom/Error';
import Schemer from '../../Components/Atom/Schemer'; // Import Schemer component
import { ROUTES_CONFIG } from '../../Shared/Constants';
import { Link } from 'react-router-dom';

export default function MyAds() {
  const { data, refetch, isError, isLoading } = useGetAdsDataQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  console.log(data, 'data');

  return (
    <div className={CLASSNAME.WRAPPER}>
      {/* my ads text */}
      <h1 className={CLASSNAME.TITLE}>{TEXT.MY_ADS}</h1>
      {/* schemer  */}
      <div className={CLASSNAME.AD_WRAPPER}>
        {isLoading && (
          <div className="loader">
            {Array.from({ length: 10 }, (_, i) => (
              <Schemer key={i} />
            ))}
          </div>
        )}
        {isError && <Error />}
        {/* no ads */}
        {data?.length === 0 && (
          <>
            <div className={CLASSNAME.NO_ADS}>
              {TEXT.NO_ADS} <Link to={ROUTES_CONFIG.SELL.path}>{TEXT.ADS}</Link>
            </div>
          </>
        )}
        {data?.map((product: Product) => (
          <Images key={product.id} data={product} refetch={refetch} />
        ))}
      </div>
    </div>
  );
}
