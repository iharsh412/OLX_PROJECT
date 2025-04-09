import { useEffect, useState } from 'react';
import './carImage.css';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ICONS from '../../../../assets';
import { usePostProductsMutation } from '../../../../Services/Api/module/imageApi';
import { ImageProps } from '../../../../Shared/constant';
import { RootState } from '../../../../Store';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';


const Images: React.FC<ImageProps> = ({ data, refetch, refetchDashboard }) => {
  const [post, { isLoading }] = usePostProductsMutation();
  const [showError, setShowError] = useState(false);
  const [showAdded, setShowAdded] = useState(data.is_favourite ? 'Added' : '');
  const navigate = useNavigate();


  const { access: token } = useSelector((state: RootState) => state?.common);

  useEffect(() => {
    setShowAdded(data.is_favourite ? 'Added' : '');
  }, [data.is_favourite]);

  const onClickCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token){
      toast.error('Please login to add to cart');
      return;
    }

    try {
      const response = await post({ id: 1, product_id: data.id }).unwrap();
      setShowAdded(response.msg === 'Added in Favourites' ? 'Added' : '');
      refetch?.();
      refetchDashboard?.();
    } catch (error) {
      console.error('Error adding to cart:', error);
      setShowError(true);
    }
  };

  const onClickImages = () => {
    navigate(`/product/${data.name}/${data.id}`);
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (<>
    <ToastContainer />
    <div className="carImages_wrapper" onClick={onClickImages}>
      
      <div className="carImages">
        <img
          src={`${import.meta.env.VITE_BASE_URL}/${data.display_photo}`}
          alt={data.name}
          className="carImages_image"
          loading="lazy"
        />
        <button
          title="Add to cart"
          type="button"
          onClick={onClickCart}
          className="carImage_cart_Parent"
          disabled={isLoading}
        >
          <Heart
            fill={showAdded === 'Added' ? 'red' : 'none'}
            color={showAdded === 'Added' ? 'red' : 'black'}
          />
        </button>
      </div>
      <div className="carImages_content">
        <span className="carImage_cost">
          <img src={ICONS.rupees} alt="Rs" /> {data.price}
        </span>
        <span className="carImage_distance">{data.status}</span>
        <span className="carImage_name">{data.name}</span>
        <span className="carImage_placeAndDate">
          <span className="carImage_place">
            {data.state} {data.city}
          </span>
          <span className="carImage_date">{data.created_at}</span>
        </span>
      </div>
    </div>
    </>
  );
};

export default Images;
