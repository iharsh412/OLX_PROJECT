import { useEffect, useState } from 'react';
import './carImage.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ICONS from '../../../../assets';
import { usePostProductsMutation } from '../../../../Services/Api/module/imageApi';
import { COMMON_TEXT, ImageProps } from '../../../../Helper/constant';
import { RootState } from '../../../../Store';
import { CLASSNAME, TEXT } from './constant';
import { getDaysFromNow } from '../../../../Helper/function';
import { setWishlistCount } from '../../../../Store/WishlistCount';
import { ROUTES_CONFIG } from '../../../../Shared/Constants';

export default function Images({
  data,
  refetch,
  refetchDashboard,
}: ImageProps) {
  const dispatch = useDispatch();
  const [post, { isLoading }] = usePostProductsMutation();
  const [showAdded, setShowAdded] = useState(data.is_favourite ? 'Added' : '');
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
      toast.error(TEXT.ADD_TO_Wishlist);
      return;
    }
    try {
      const response = await post({ id: 1, product_id: data.id }).unwrap();
      setShowAdded(response.msg === TEXT.ADDED_IN_FAV ? TEXT.ADDED : '');
      refetch?.();
      if (response.msg === TEXT.ADDED_IN_FAV) {
        dispatch(setWishlistCount(wishlistCount + 1));
        toast.success(TEXT.ADDED_IN_WISHLIST);
      } else {
        dispatch(setWishlistCount(wishlistCount - 1));
        toast.success(TEXT.REMOVE_FROM_WISHLIST);
      }
      refetchDashboard?.();
    } catch (error) {
      toast.error(TEXT.ERROR_IN_ADDING);
    }
  };
  // on click layout section
  const onClickImages = async () => {
    navigate(`/product/${data.name}/${data.id}`);
  };

  // HOOKS
  useEffect(() => {
    setShowAdded(data.is_favourite ? TEXT.ADDED : '');
  }, [data.is_favourite]);

  return (
    <div
      className={CLASSNAME.WRAPPER}
      onClick={onClickImages}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClickImages();
        }
      }}
    >
      <div className={CLASSNAME.IMAGE_WRAPPER}>
        {/* image section */}
        <img
          src={`${import.meta.env.VITE_BASE_URL}${data.display_photo}`}
          alt={data.name}
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
            fill={showAdded === TEXT.ADDED ? 'red' : 'none'}
            color={showAdded === TEXT.ADDED ? 'red' : 'black'}
          />
        </button>
      </div>
      {/* content */}
      <div className={CLASSNAME.CONTENT}>
        <span className={CLASSNAME.COST}>
          <img src={ICONS.rupees} alt={COMMON_TEXT.IMG} /> {data.price}
        </span>
        <span className={CLASSNAME.NAME}>{data.name}</span>
        <div className={CLASSNAME.PLACE_DATE_WRAPPER}>
          <span className={CLASSNAME.PLACE}>
            {data.city},{data.state}
          </span>
          <span className={CLASSNAME.DATE}>
            {typeof data?.created_at === 'string'
              ? getDaysFromNow(data.created_at)
              : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
