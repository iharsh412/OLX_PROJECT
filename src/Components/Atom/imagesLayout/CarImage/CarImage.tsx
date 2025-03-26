import { useEffect, useState } from 'react';
import './carImage.css';
import ICONS from '../../../../assets';
import { usePostProductsMutation } from '../../../../Services/Api/module/imageApi';

interface ImageProps {
  data: {
    created_at?: React.ReactNode;
    id: number;
    name: string;
    price: React.ReactNode;
    display_photo?: string;
    category?: React.ReactNode;
    city?: React.ReactNode;
    district?: React.ReactNode;
    state?: React.ReactNode;
    status?: React.ReactNode;
    subcategory?: React.ReactNode;
    user?: React.ReactNode;
  };
}

const Images: React.FC<ImageProps> = ({ data }) => {
  const [post ] = usePostProductsMutation();
  const [showError, setShowError] = useState(false);

  async function onClickCart() {
    try {
      const POST = await post({ id: 1, product_id: data.id }).unwrap();
      console.log(POST, 'a');
    } catch (e) {
      console.error('Error adding to cart:', e);
      setShowError(true);
    }
  }



  useEffect(() => {
    if ( showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [showError]);


  return (
    <div className="carImages_wrapper">
      {showError && <div className="error-message">Error posting product</div>}
      <div className="carImages">
        <img
          src={`https://0e50-112-196-113-3.ngrok-free.app/${data.display_photo}`}
          alt={data.name}
          className="carImages_image"
        />
        <button
          type="button"
          onClick={onClickCart}
          className="carImage_cart_Parent"
        >
          <img src={ICONS.heartIcon} alt="cart" className="carImage_cart" />
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
