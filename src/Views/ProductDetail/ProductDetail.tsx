import { useNavigate, useParams } from 'react-router-dom';
import './productDetail.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ImageTransition from '../../Components/CustomComponents/ProductDetailImageTransition';
import { useGetProductsDetailQuery } from '../../Services/Api/module/imageApi';
import { CLASSNAME } from './constant';
import { COMMON_TEXT } from '../../Helper/constant';
import LocationMap from '../../Components/CustomComponents/LocationMap';
import { ROUTES_CONFIG } from '../../Shared/Constants';
import { RootState } from '../../Store';
import { setUserId } from '../../Store/ChatUser';
import Loader from '../../Components/Atom/Loader';
import ErrorSection from '../../Components/Atom/ErrorSection';
import { getDaysFromNow } from '../../Helper/function';

export default function ProductDetail() {
  const { productId } = useParams();
  const { access, id: uid } = useSelector((state: RootState) => state?.common);
  const id = productId !== undefined ? Number(productId) : undefined;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductsDetailQuery({ id });
  const product = Array.isArray(data) ? data[0] : data;
  const dispatch = useDispatch();

  // handle click on chat
  function handleClickChat() {
    if (!access) {
      toast.error(COMMON_TEXT.LOGIN_TO_CHAT);
      navigate(ROUTES_CONFIG.LOGIN.path);
    } else {
      dispatch(setUserId(data?.user));
      navigate(ROUTES_CONFIG.SINGLE_CHAT.path);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorSection />;
  }

  return (
    <div className={CLASSNAME.WRAPPER}>
      {/* image transition / detail / description */}
      <div className={CLASSNAME.IMAGE_DETAIL_DESCRIPTION}>
        {/* image section */}
        <div className={CLASSNAME.IMAGE}>
          <ImageTransition images={product?.images} />
        </div>
        {/* detail / description section */}
        <div className={CLASSNAME.DETAIL_DESCRIPTION}>
          {/* detail section */}
          <div className={CLASSNAME.DETAIL}>
            <span className={CLASSNAME.DETAIL_TEXT}>{COMMON_TEXT.DETAIL}</span>
            <div className={CLASSNAME.BRAND}>
              <span className={CLASSNAME.BRAND_TEXT}>{COMMON_TEXT.TITLE}</span>
              <span className={CLASSNAME.BRAND_VALUE}>{product?.name}</span>
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
          <span className={CLASSNAME.PRICE_VALUE}>₹ {product?.price}</span>
          <span className={CLASSNAME.PRICE_TEXT}>
            {product?.status} {COMMON_TEXT.PRODUCT}
          </span>
          <div className={CLASSNAME.PRICE_TAG}>
            <span className={CLASSNAME.PRICE_PLACE}>{product?.city}</span>
            <span className={CLASSNAME.PRICE_PLACE}>
              {getDaysFromNow(product?.created_at)}
            </span>
          </div>
        </div>
        {/*  chat section */}
        {uid !== product.user && (
          <div className={CLASSNAME.CHAT}>
            <div className={CLASSNAME.CHAT_TEXT_PHOTO}>
              <span className={CLASSNAME.CHAT_PHOTO}>
                <img
                  src={`${
                    import.meta.env.VITE_BASE_URL
                  }${product?.display_photo}`}
                  alt={COMMON_TEXT.IMG}
                />
              </span>
              <span className={CLASSNAME.CHAT_TEXT}>
                {COMMON_TEXT.OLX_INDIA}
              </span>
            </div>
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
            {product?.state} , {product?.city || product?.district}
          </span>
        </div>
        {/* map section */}
        <div className={CLASSNAME.MAP}>
          <LocationMap
            cityName={product?.city}
            mapHeadingText={COMMON_TEXT.POSTED_IN}
          />
        </div>
      </div>
    </div>
  );
}
