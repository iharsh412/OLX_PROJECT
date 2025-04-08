import { useParams } from 'react-router-dom';
import './imageDetail.css';
import ICONS from '../../assets';
import ImageTransition from '../../Components/Atom/ImageDetailImageTransition';
import { useGetProductsDetailQuery } from '../../Services/Api/module/imageApi';
import { CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT } from '../../Shared/constant';

export default function ImageDetail() {

  const { productId } = useParams();
  const id = productId !== undefined ? Number(productId) : undefined;

  const { data } = useGetProductsDetailQuery({ id });

  const product = Array.isArray(data) ? data[0] : data;

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
            <span className={CLASSNAME.DESCRIPTION_TITLE}>{TEXT.DESCRIPTION}</span>
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
                src={`${import.meta.env.VITE_BASE_URL
                  }/${product?.display_photo}`}
                alt={COMMON_TEXT.IMG}
              />
            </span>
            <span className={CLASSNAME.CHAT_TEXT}>{TEXT.OLX_INDIA}</span>
            <span className={CLASSNAME.CHAT_UPDOWN}>
              <img src={ICONS.upDownl} alt={COMMON_TEXT.IMG} />
            </span>
          </div>
          <button className={CLASSNAME.CHAT_BUTTON}>{TEXT.CHAT_WITH_SELLER}</button>
        </div>
        {/* post section */}
        <div className={CLASSNAME.POST}>
          <span className={CLASSNAME.POST_TEXT}>{TEXT.POSTE_IN}</span>
          <span className={CLASSNAME.POST_VALUE}>
            {product?.state} {product?.city || product?.district}
          </span>
        </div>
      </div>
    </div>
  );
}
