import './myAds.css';
import { useGetAdsDataQuery } from '../../Services/Api/module/imageApi';
import { CLASSNAME, TEXT } from './constant';
import Images from '../../Components/CustomComponents/ImageLayout/MyAdsImage';
import { Product } from '../../Interface/constant';
import Loader from '../../Components/Atom/Loader';
import Error from '../../Components/Atom/Error';

export default function MyAds() {
  const { data, refetch, isError, isLoading } = useGetAdsDataQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  return (
    <div className={CLASSNAME.WRAPPER}>
      <h1 className={CLASSNAME.TITLE}>{TEXT.MY_ADS}</h1>
      <div className={CLASSNAME.AD_WRAPPER}>
        {isLoading && <Loader />
        }
        {isError && <Error />}
        {data?.length === 0 && (
          <div className={CLASSNAME.NO_ADS}>{TEXT.NO_ADS}</div>
        )}
        {data?.map((product: Product) => (
          <Images key={product.id} data={product} refetch={refetch} />
        ))}
      </div>
    </div>
  );
}
