import { useNavigate } from 'react-router-dom';
import { ROUTES_CONFIG } from '../../Shared/Constants';
import './navCategory.css';
import { CLASSNAME } from './constant';
import { COMMON_TEXT } from '../../Helper/constant';

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
            {COMMON_TEXT.ALL_CATEGORIES}
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
            {COMMON_TEXT.BIKES}
          </button>
          <button
            type="button"
            className={CLASSNAME.MOBILEPHONE}
            onClick={handleMobilePhoneClick}
          >
            {COMMON_TEXT.MOBILE_PHONE}
          </button>

          <button
            type="button"
            className={CLASSNAME.COMMERCIAL}
            onClick={handleElecyronicsClick}
          >
            {COMMON_TEXT.ELECTRONICS}
          </button>
        </div>
      </div>
    </div>
  );
}
