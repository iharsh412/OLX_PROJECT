import { useNavigate } from 'react-router-dom';
import { ROUTES_CONFIG } from '../../Shared/Constants';
import './navCategory.css';
import { CLASSNAME, TEXT } from './constant';

export default function NavCategory() {
  const navigate = useNavigate();

  function handleMotorcycleClick() {
    navigate('/type/bikes');
  }
  function handleMobilePhoneClick() {
    navigate('/type/mobile');
  }
  function handleElecyronicsClick() {
    navigate('/type/electronics');
  }
  return (
    <div className={CLASSNAME.WRAPPER}>
      <div className={CLASSNAME.CHILD}>
        <div className={CLASSNAME.ALL_CATEGORY}>
          <button
            type="button"
            className={CLASSNAME.ALL_CATEGORY_TEXT}
            onClick={() => navigate(ROUTES_CONFIG.HOMEPAGE.path)}
          >
            {TEXT.ALL_CATEGORIES}
          </button>
        </div>
        <div className={CLASSNAME.LIST}>
          {/* <button
            type={TYPE.BUTTON}
            className={CLASSNAME.CARS}
            onClick={handleCarClick}
          >
            {TEXT.MULTI_WHEEL_VEHICLE}
          </button> */}
          <button
            type="button"
            className={CLASSNAME.MOTORCYCLE}
            onClick={handleMotorcycleClick}
          >
            {TEXT.BIKES}
          </button>
          <button
            type="button"
            className={CLASSNAME.MOBILEPHONE}
            onClick={handleMobilePhoneClick}
          >
            {TEXT.MOBILE_PHONE}
          </button>

          <button
            type="button"
            className={CLASSNAME.COMMERCIAL}
            onClick={handleElecyronicsClick}
          >
            {TEXT.ELECTRONICS}
          </button>
        </div>
      </div>
    </div>
  );
}
