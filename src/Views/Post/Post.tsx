import { Navigate, useLocation } from 'react-router-dom';
import CarDetail from '../../Components/CustomComponents/Post/CarForm';
import BikeDetail from '../../Components/CustomComponents/Post/BikeForm';
import MobileDetail from '../../Components/CustomComponents/Post/MobileForm';
import './post.css';
import { CLASSNAME, TEXT } from './constant';
import { ROUTES_CONFIG } from '../../Shared/Constants';
import { capitalizeFirstLetter } from '../../Helper/function';

export default function Post() {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to={ROUTES_CONFIG.SELL.path} />;
  }

  return (
    // sell form section
    <div className={CLASSNAME.WRAPPER}>
      {/* header */}
      <div className={CLASSNAME.SELECTED_CATEGORY}>
        {/* selected category text*/}
        <span className={CLASSNAME.SELECTED_CATEGORY_TITLE}>
          {TEXT.SELECTED_CATEGORY}
        </span>
        <span className={CLASSNAME.SELECTED_CATEGORY_NAME}>
          {capitalizeFirstLetter(location.state.categoryId)} /{' '}
          {location.state.subcategory}
        </span>
      </div>
      {/* multiwheel vehicles */}
      {location.state.categoryId === 'multiWheelVehicles' && (
        <div className={CLASSNAME.POST_DETAIL}>
          <CarDetail />
        </div>
      )}
      {/* bikes */}
      {location.state.categoryId === 'bikes' && (
        <div className={CLASSNAME.POST_DETAIL}>
          <BikeDetail />
        </div>
      )}
      {/* mobiles and electronics */}
      {(location.state.categoryId === 'mobile' ||
        location.state.categoryId === 'electronics') && (
        <div className={CLASSNAME.POST_DETAIL}>
          <MobileDetail />
        </div>
      )}
    </div>
  );
}
