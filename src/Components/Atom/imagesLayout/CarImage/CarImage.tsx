import { useEffect, useState } from 'react';
import './carImage.css';
import ICONS from '../../../../assets';
import { usePostProductsMutation } from '../../../../Services/Api/module/imageApi';
import { useNavigate } from 'react-router-dom';

interface ImageProps {
  data: {
    created_at?: React.ReactNode;
    id: number;
    name: string;
    price: React.ReactNode;
    display_photo?: string | null;
    category?: React.ReactNode;
    city?: React.ReactNode;
    district?: React.ReactNode;
    state?: React.ReactNode;
    status?: React.ReactNode;
    subcategory?: React.ReactNode;
    user?: React.ReactNode;
    is_favourite?: boolean;
  };
  refetch?: () => void;
  refetchDashboard?: () => void;
}

const Images: React.FC<ImageProps> = ({ data, refetch, refetchDashboard }) => {
  const [post, { isLoading }] = usePostProductsMutation();
  const [showError, setShowError] = useState(false);
  const [showAdded, setShowAdded] = useState(data.is_favourite ? 'Added' : '');
  const navigate =useNavigate();
  

  useEffect(() => {
    setShowAdded(data.is_favourite ? 'Added' : '');
  }, [data.is_favourite]);

  const onClickCart = async (e:React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return; 

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

  return (
    <div className="carImages_wrapper" onClick={onClickImages}>
      {showError && <div className="error-message">Error posting product</div>}
      <div className="carImages">
        <img
          src={`https://0e50-112-196-113-3.ngrok-free.app/${data.display_photo}`}
          alt={data.name}
          className="carImages_image"
          loading="lazy"
        />
        <button
          type="button"
          onClick={onClickCart}
          className="carImage_cart_Parent"
          disabled={isLoading}
        >
          <img
            src={ICONS.heartIcon}
            alt="cart"
            className={`carImage_cart ${
              showAdded === 'Added' ? 'carImage_cart_active' : ''
            }`}
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
  );
};

export default Images;
