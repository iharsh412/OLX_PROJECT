import './carImage.css';
// import { ReactNode } from 'react';
import ICONS from '../../../../assets';
import { usePostProductsMutation } from '../../../../Services/Api/module/imageApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Store';

interface ImageProps {
  data: {

        id: number;
        name: string;
        price: number;
        description: string;
        status: string;
        availability: string;
        category: number;
        subcategory: number;
        city: string;
        state: string;
        district: string;
        created_at: string;
        user: number;
        date: string; // Add this line
      };
  };


// eslint-disable-next-line react/function-component-definition
const Images: React.FC<ImageProps> = ({ data }) => {
  
  const [post, { error }] = usePostProductsMutation();
  const uid = useSelector((state: RootState) => state?.common?.uId);

  async function onClickCart() {
    try {
      await post({ uId: uid, pId: data.id });
    } catch (e) {
      console.log(e);
    }
  }

  if (error) return <div>Error posting product</div>;

  return (
    <div className="carImages_wrapper">
      <div className="carImages">
        <img src={ICONS.sellImage} alt="watch" className="carImages_image" />
        <button
          type="button"
          onClick={onClickCart}
          className="carImage_cart_Parent"
        >
          <img src={ICONS.heartIcon} alt="cart" className="carImage_cart" />
        </button>
      </div>
      <div className="carImages_content">
        <span className="carImage_cost">{data?.price}</span>
        <span className="carImage_distance">2014 -94,000 km</span>
        <span className="carImage_name">{data?.name}</span>
        <span className="carImage_placeAndDate">
          <span className="carImage_place">
            {data?.city} , {data?.state}{' '}
          </span>
          <span className="carImage_date">{data?.created_at}</span>
        </span>
      </div>
    </div>
  );
};
export default Images;
