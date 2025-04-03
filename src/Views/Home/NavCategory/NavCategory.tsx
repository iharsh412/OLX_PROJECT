import './navCategory.css';
import { useNavigate } from 'react-router-dom';
import ICONS from '../../../assets';

export default function NavCategory() {
  const navigate = useNavigate();

  function handleCarClick() {
    navigate('cars');
  }
  function handleMotorcycleClick() {
    navigate('bikes');
  }
  function handleMobilePhoneClick() {
    navigate('mobile');
  }
  function handleElecyronicsClick() {
    navigate('electronics');
  }
  return (
    <div className="home_navCategory">
      <div className="homeCategorychild">
        <span className="home_navCategory_allCategory_Parent">
          <span className="home_navCategory_child_allCategory">
            ALL CATEGORIES
          </span>
          <img
            src={ICONS.upDown}
            alt="upDown"
            className="home_navCategory_child_allCategory_upDown"
          />
        </span>
        <div className="home_navCategory_childs">
          <button
            type="button"
            className="home_navCategory_Cars"
            onClick={handleCarClick}
          >
            Cars
          </button>
          <button
            type="button"
            className="home_navCategory_Motorcycle"
            onClick={handleMotorcycleClick}
          >
            Bikes
          </button>
          <button
            type="button"
            className="home_navCategory_MobilePhone"
            onClick={handleMobilePhoneClick}
          >
            Mobile Phone
          </button>

          <button
            type="button"
            className="home_navCategory_Commercial"
            onClick={handleElecyronicsClick}
          >
            Electronics
          </button>
        </div>
      </div>
    </div>
  );
}
