import { useNavigate, useParams } from 'react-router-dom';
import './productDetail.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ImageTransition from '../../Components/CustomComponents/ProductDetailImageTransition';
import { CLASSNAME } from './constant';
import { COMMON_TEXT } from '../../Helper/constant';
import LocationMap from '../../Components/CustomComponents/LocationMap';
import { ROUTES_CONFIG } from '../../Shared/Constants';
import { RootState } from '../../Store';
import { setUserId } from '../../Store/ChatUser';
// import Loader from '../../Components/Atom/Loader';
// import ErrorSection from '../../Components/Atom/ErrorSection';
import { ProductDetail } from '../../Helper/interface';
import {
  getDaysFromNow,
  getProductById,
  capitalizeFirstLetter,
} from '../../Helper/function';

export default function ProductDetails() {
  const { productId } = useParams();

  const { access, id: uid } = useSelector((state: RootState) => state?.common);
  const id = productId !== undefined ? Number(productId) : undefined;
  const navigate = useNavigate();
  const [data, setData] = useState<ProductDetail | null>(null);
  const product = Array.isArray(data) ? data[0] : data;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductById(productId as string);
      console.log(productData, 'product data');
      setData(productData);
    };
    fetchProduct();
  }, [productId]);
  console.log(data, 'data');
  // handle click on chat
  function handleClickChat() {
    if (!access) {
      toast.error(COMMON_TEXT.LOGIN_TO_CHAT);
      navigate(ROUTES_CONFIG.LOGIN.path);
    } else {
      dispatch(setUserId(data?.uid));
      navigate(ROUTES_CONFIG.SINGLE_CHAT.path);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  // if (isLoading) {
  //   return <Loader />;
  // }
  // if (isError) {
  //   return <ErrorSection />;
  // }

  return (
    <div className={CLASSNAME.WRAPPER}>
      {/* image transition / detail / description */}
      <div className={CLASSNAME.IMAGE_DETAIL_DESCRIPTION}>
        {/* image section */}
        <div className={CLASSNAME.IMAGE}>
          <ImageTransition photos={data?.photos} />
        </div>
        {/* detail / description section */}
        <div className={CLASSNAME.DETAIL_DESCRIPTION}>
          {/* detail section */}
          <div className={CLASSNAME.DETAIL}>
            <span className={CLASSNAME.DETAIL_TEXT}>{COMMON_TEXT.DETAIL}</span>
            <div className={CLASSNAME.BRAND}>
              <span className={CLASSNAME.BRAND_TEXT}>
                {COMMON_TEXT.CATEGORY}
              </span>
              <span className={CLASSNAME.BRAND_VALUE}>
                {capitalizeFirstLetter(data?.category ?? '')}
              </span>
            </div>
            <div className={CLASSNAME.BRAND}>
              <span className={CLASSNAME.BRAND_TEXT}>
                {COMMON_TEXT.SUBCATEGORY}
              </span>
              <span className={CLASSNAME.BRAND_VALUE}>{data?.subCategory}</span>
            </div>
            <div className={CLASSNAME.BRAND}>
              <span className={CLASSNAME.BRAND_TEXT}>{COMMON_TEXT.BRAND}</span>
              <span className={CLASSNAME.BRAND_VALUE}>{data?.brand}</span>
            </div>
            <div className={CLASSNAME.BRAND}>
              <span className={CLASSNAME.BRAND_TEXT}>{COMMON_TEXT.TITLE}</span>
              <span className={CLASSNAME.BRAND_VALUE}>{data?.title}</span>
            </div>
          </div>
          <hr />
          {/* description section */}
          <div className={CLASSNAME.DESCRIPTION}>
            <span className={CLASSNAME.DESCRIPTION_TITLE}>
              {COMMON_TEXT.DESCRIPTION}
            </span>
            <span className={CLASSNAME.DESCRITION_VALUE}>
              {product?.description}
            </span>
          </div>
        </div>
      </div>
      {/*  price / chat/ map section */}
      <div className={CLASSNAME.PRICE_CHAT_WRAPPER}>
        {/* price section */}
        <div className={CLASSNAME.PRICE}>
          <span className={CLASSNAME.PRICE_VALUE}>₹ {data?.price}</span>
          <span className={CLASSNAME.PRICE_TEXT}>
            {COMMON_TEXT.PURCHASE_IN} {data?.year}
          </span>
          <div className={CLASSNAME.PRICE_TAG}>
            <span className={CLASSNAME.PRICE_PLACE}>{data?.city}</span>
            <span className={CLASSNAME.PRICE_PLACE}>
              {getDaysFromNow(data?.createdAt ?? '')}
            </span>
          </div>
        </div>
        {/*  chat section */}
        {uid !== data?.uid && (
          <div className={CLASSNAME.CHAT}>
            <div className={CLASSNAME.CHAT_TEXT_PHOTO}>
              <span className={CLASSNAME.CHAT_PHOTO}>
                <img src={`${data?.photos?.[0]}`} alt={COMMON_TEXT.IMG} />
              </span>
              <span className={CLASSNAME.CHAT_TEXT}>
                {COMMON_TEXT.OLX_INDIA}
              </span>
            </div>
            <span>{data?.username}</span>
            <button
              type="button"
              title={COMMON_TEXT.CHAT}
              className={CLASSNAME.CHAT_BUTTON}
              onClick={handleClickChat}
            >
              {COMMON_TEXT.CHAT_WITH_SELLER}
            </button>
          </div>
        )}
        {/* post section */}
        <div className={CLASSNAME.POST}>
          <span className={CLASSNAME.POST_TEXT}>{COMMON_TEXT.POSTED_IN}</span>
          <span className={CLASSNAME.POST_VALUE}>
            {data?.state} , {data?.city}
          </span>
        </div>
        {/* map section */}
        <div className={CLASSNAME.MAP}>
          <LocationMap
            cityName={data?.city ?? ''}
            mapHeadingText={COMMON_TEXT.POSTED_IN}
          />
        </div>
      </div>
    </div>
  );
}
