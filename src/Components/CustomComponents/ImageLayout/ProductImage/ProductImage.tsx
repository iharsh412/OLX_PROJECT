// import { useState } from 'react';
import './productImage.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ICONS from '../../../../assets';
import { usePostProductsMutation } from '../../../../Services/Api/module/imageApi';
import { COMMON_TEXT } from '../../../../Helper/constant';
import { ImageProps } from '../../../../Helper/interface';
import { RootState } from '../../../../Store';
import { CLASSNAME } from './constant';
import { getDaysFromNow } from '../../../../Helper/function';
import { setWishlistCount } from '../../../../Store/WishlistCount';
import { ROUTES_CONFIG } from '../../../../Shared/Constants';

export default function ProductImage({
  data,
  refetch,
  refetchDashboard,
}: Readonly<ImageProps>) {
  // console.log(data, 'datager');
  const dispatch = useDispatch();
  const [post, { isLoading }] = usePostProductsMutation();
  // const [showAdded, setShowAdded] = useState(data.is_favourite ? 'Added' : '');
  const navigate = useNavigate();
  const { access: token } = useSelector((state: RootState) => state?.common);
  const wishlistCount = useSelector(
    (state: RootState) => state?.wishlistCount?.count
  );

  // on click cart
  const onClickWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token) {
      navigate(ROUTES_CONFIG.LOGIN.path);
      toast.error(COMMON_TEXT.LOGIN_TO_ADD_TO_WISHLIST);
      return;
    }
    try {
      const response = await post({ id: 1, product_id: data.id }).unwrap();
      // setShowAdded(
      // response.msg === COMMON_TEXT.ADDED_IN_FAV ? COMMON_TEXT.ADDED : ''
      // );
      refetch?.();
      if (response.msg === COMMON_TEXT.ADDED_IN_FAV) {
        dispatch(setWishlistCount(wishlistCount + 1));
        toast.success(COMMON_TEXT.ADDED_IN_WISHLIST);
      } else {
        dispatch(setWishlistCount(wishlistCount - 1));
        toast.success(COMMON_TEXT.REMOVE_FROM_WISHLIST);
      }
      refetchDashboard?.();
    } catch (error) {
      toast.error(COMMON_TEXT.ERROR_IN_ADDING);
    }
  };
  // on click layout section
  const onClickImages = async () => {
    navigate(`/product/${data.brand}/${data.id}`);
  };

  // HOOKS
  // useEffect(() => {
  //   setShowAdded(data.is_favourite ? COMMON_TEXT.ADDED : '');
  // }, [data.is_favourite]);

  return (
    <button
      className={CLASSNAME.WRAPPER}
      onClick={onClickImages}
      type="button"
      tabIndex={0}
    >
      <div className={CLASSNAME.IMAGE_WRAPPER}>
        {/* image section */}
        <img
          src={`${data?.photos?.[0] ?? ''}`}
          alt={COMMON_TEXT.IMG}
          className={CLASSNAME.IMAGE}
          loading="lazy"
        />
        {/* wishlist section */}
        <button
          title={COMMON_TEXT.BUTTON}
          type="button"
          onClick={onClickWishlist}
          className={CLASSNAME.CART_WRAPPER}
          disabled={isLoading}
        >
          <Heart
          // fill={showAdded === COMMON_TEXT.ADDED ? 'red' : 'none'}
          // color={showAdded === COMMON_TEXT.ADDED ? 'red' : 'black'}
          />
        </button>
      </div>
      {/* content */}
      <div className={CLASSNAME.CONTENT}>
        <span className={CLASSNAME.COST}>
          <img src={ICONS.rupees} alt={COMMON_TEXT.IMG} /> {data.price}
        </span>
        <span className={CLASSNAME.NAME}>{data.title}</span>
        <div className={CLASSNAME.PLACE_DATE_WRAPPER}>
          <span className={CLASSNAME.PLACE}>
            {data.city},{data.state}
          </span>
          <span className={CLASSNAME.DATE}>
            {typeof data?.createdAt === 'string'
              ? getDaysFromNow(data.createdAt)
              : ''}
          </span>
        </div>
      </div>
    </button>
  );
}
