import { Navigate, useLocation } from 'react-router-dom';
import CarDetail from '../../Components/CustomComponents/Post/CarForm'
import BikeDetail from '../../Components/CustomComponents/Post/BikeForm';
import MobileDetail from '../../Components/CustomComponents/Post/MobileForm';
import './post.css';
import { CLASSNAME, TEXT } from './constant';
import { ROUTES_CONFIG } from '../../Shared/Constants';

export default function Post() {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to={ROUTES_CONFIG.SELL.path} />;
  }
  return (
    <div className={CLASSNAME.WRAPPER}>
      <div className={CLASSNAME.SELECTED_CATEGORY}>
        <span className={CLASSNAME.SELECTED_CATEGORY_TITLE}>
          {TEXT.SELECTED_CATEGORY}
        </span>
        <span className={CLASSNAME.SELECTED_CATEGORY_NAME}>
          {location.state.categoryId} / {location.state.subcategory}
        </span>
      </div>
      {location.state.categoryId === 'multiWheelVehicles' && (
        <div className={CLASSNAME.POST_DETAIL}>
          <CarDetail />
        </div>
      )}

      {location.state.categoryId === 'bikes' && (
        <div className={CLASSNAME.POST_DETAIL}>
          <BikeDetail />
        </div>
      )}

      {location.state.categoryId === 'mobile' && (
        <div className={CLASSNAME.POST_DETAIL}>
          <MobileDetail />
        </div>
      )}
      {location.state.categoryId === 'electronics' && (
        <div className={CLASSNAME.POST_DETAIL}>
          <MobileDetail />
        </div>
      )}

    </div>
  );
}
