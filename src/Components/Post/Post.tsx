import { Navigate, useLocation } from 'react-router-dom';
import CarDetail from '../Atom/Post/CarForm/CarForm';
import BikeDetail from '../Atom/Post/BikeForm';
import ScootersDetail from '../Atom/Post/ScootersForm';
import MobileDetail from '../Atom/Post/MobileForm';
import TabletDetail from '../Atom/Post/TabletForm';
import TVDetail from '../Atom/Post/TVForm';
import CameraDetail from '../Atom/Post/CameraForm';
import ComputerDetail from '../Atom/Post/ComputerForm';

import './post.css';
import { CLASSNAME } from './constant';

export default function Post() {
  const location = useLocation();
  console.log(location.state, 'state1');

  if (!location.state) {
    return <Navigate to="/sell" />;
  }
  return (
    <div className={CLASSNAME.WRAPPER}>
      <div className={CLASSNAME.SELECTED_CATEGORY}>
        <span className={CLASSNAME.SELECTED_CATEGORY_TITLE}>
          SELECTED CATEGORY
        </span>
        <span className={CLASSNAME.SELECTED_CATEGORY_NAME}>
          {location.state.categoryId} / {location.state.subcategory}
        </span>
      </div>
      {location.state.categoryId === 'cars' && (
        <div className={CLASSNAME.POST_DETAIL}>
          <CarDetail />
        </div>
      )}

      {location.state.categoryId === 'bikes' &&
        location.state.subcategory === 'Bikes' && (
          <div className={CLASSNAME.POST_DETAIL}>
            <BikeDetail />
          </div>
        )}
      {location.state.categoryId === 'bikes' &&
        location.state.subcategory === 'Scooters' && (
          <div className={CLASSNAME.POST_DETAIL}>
            <ScootersDetail />
          </div>
        )}
      {location.state.categoryId === 'mobile' &&
        location.state.subcategory === 'Mobile' && (
          <div className={CLASSNAME.POST_DETAIL}>
            <MobileDetail />
          </div>
        )}
      {location.state.categoryId === 'electronics' &&
        location.state.subcategory === 'TVs' && (
          <div className={CLASSNAME.POST_DETAIL}>
            <TVDetail />
          </div>
        )}
      {location.state.categoryId === 'mobile' &&
        location.state.subcategory === 'Tablet' && (
          <div className={CLASSNAME.POST_DETAIL}>
            <TabletDetail />
          </div>
        )}
      {location.state.categoryId === 'electronics' &&
        location.state.subcategory === 'Camera' && (
          <div className={CLASSNAME.POST_DETAIL}>
            <CameraDetail />
          </div>
        )}
      {location.state.categoryId === 'electronics' &&
        location.state.subcategory === 'Computer' && (
          <div className={CLASSNAME.POST_DETAIL}>
            <ComputerDetail />
          </div>
        )}
    </div>
  );
}
