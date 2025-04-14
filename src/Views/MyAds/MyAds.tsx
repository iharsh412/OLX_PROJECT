import './myAds.css';
import { useGetAdsDataQuery } from '../../Services/Api/module/imageApi';
import { CLASSNAME } from './constant';
import Images from '../../Components/CustomComponents/ImageLayout/MyAdsImage';
import { COMMON_TEXT, Product } from '../../Interface/constant';

export default function MyAds() {

  const { data, refetch, isError, isLoading} = useGetAdsDataQuery({},{refetchOnMountOrArgChange: true});
 
  return (
    <div className={CLASSNAME.WRAPPER}>
      <h1 className={CLASSNAME.TITLE}>My Ads</h1>
      <div className={CLASSNAME.AD_WRAPPER}>
        {isLoading && (
          <div className={CLASSNAME.LOADING}>{COMMON_TEXT.LOADING}</div>
        )}
        {isError && (
          <div className={CLASSNAME.ERROR}>{COMMON_TEXT.ERROR}</div>
        )}
        {data?.length === 0 && (
          <div className={CLASSNAME.NO_ADS}>No Ads Found</div>
        )}
        {data?.map((product: Product) => (
          <Images key={product.id} data={product} refetch={refetch} />
        ))}
      </div>
    </div>
  );
}
