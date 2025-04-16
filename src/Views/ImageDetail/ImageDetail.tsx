import { useNavigate, useParams } from 'react-router-dom';
import './imageDetail.css';
import ImageTransition from '../../Components/CustomComponents/ImageDetailImageTransition';
import { useGetProductsDetailQuery } from '../../Services/Api/module/imageApi';
import { CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT } from '../../Interface/constant';
import LocationMap from '../../Components/CustomComponents/LocationMap';
import { ROUTES_CONFIG } from '../../Shared/Constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { toast } from 'react-toastify';

export default function ImageDetail() {
  const { productId } = useParams();
  const { access } = useSelector((state: RootState) => state?.common);
  const id = productId !== undefined ? Number(productId) : undefined;
  const navigate = useNavigate();
  const { data } = useGetProductsDetailQuery({ id });
  console.log(data, 'data');
  const product = Array.isArray(data) ? data[0] : data;
  //  handle click
  // handle click on chat
  function handleClickChat() {
    if (!access) {
      toast.error(COMMON_TEXT.LOGIN_TO_CHAT);
    }
    navigate(ROUTES_CONFIG.CHAT.path);
  }

  return (
    <div className={CLASSNAME.WRAPPER}>
      <div className={CLASSNAME.IMAGE_DETAIL_DESCRIPTION}>
        <div className={CLASSNAME.IMAGE}>
          <ImageTransition images={product?.images} />
        </div>
        <div className={CLASSNAME.DETAIL_DESCRIPTION}>
          <div className={CLASSNAME.DETAIL}>
            <span className={CLASSNAME.DETAIL_TEXT}>{TEXT.DETAIL}</span>
            <div className={CLASSNAME.BRAND}>
              <span className={CLASSNAME.BRAND_TEXT}>{TEXT.BRAND}</span>
              <span className={CLASSNAME.BRAND_VALUE}>{product?.name}</span>
            </div>
          </div>
          <hr />
          <div className={CLASSNAME.DESCRIPTION}>
            <span className={CLASSNAME.DESCRIPTION_TITLE}>
              {TEXT.DESCRIPTION}
            </span>
            <span className={CLASSNAME.DESCRITION_VALUE}>
              {product?.description}
            </span>
          </div>
        </div>
      </div>
      {/* images price section */}
      <div className={CLASSNAME.PRICE_CHAT_WRAPPER}>
        <div className={CLASSNAME.PRICE}>
          <span className={CLASSNAME.PRICE_VALUE}>₹ {product?.price}</span>
          <span className={CLASSNAME.PRICE_TEXT}>
            {product?.status} {TEXT.PRODUCT}
          </span>
          <div className={CLASSNAME.PRICE_TAG}>
            <span className={CLASSNAME.PRICE_PLACE}>{product?.city}</span>
            <span className={CLASSNAME.PRICE_PLACE}>{product?.created_at}</span>
          </div>
        </div>
        {/* image chat section */}
        <div className={CLASSNAME.CHAT}>
          <div className={CLASSNAME.CHAT_TEXT_PHOTO}>
            <span className={CLASSNAME.CHAT_PHOTO}>
              <img
                src={`${
                  import.meta.env.VITE_BASE_URL
                }/${product?.display_photo}`}
                alt={COMMON_TEXT.IMG}
              />
            </span>
            <span className={CLASSNAME.CHAT_TEXT}>{TEXT.OLX_INDIA}</span>
          </div>
          <button
            title={TEXT.CHAT}
            className={CLASSNAME.CHAT_BUTTON}
            onClick={handleClickChat}
          >
            {TEXT.CHAT_WITH_SELLER}
          </button>
        </div>
        {/* post section */}
        <div className={CLASSNAME.POST}>
          <span className={CLASSNAME.POST_TEXT}>{TEXT.POSTE_IN}</span>
          <span className={CLASSNAME.POST_VALUE}>
            {product?.state} {product?.city || product?.district}
          </span>
        </div>
        {/* map section */}
        <div className={CLASSNAME.MAP}>
          <LocationMap
            cityName={product?.city}
            mapHeadingText={TEXT.POSTE_IN}
          />
        </div>
      </div>
    </div>
  );
}
