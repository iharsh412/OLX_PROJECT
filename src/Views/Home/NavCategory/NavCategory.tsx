import './navCategory.css';
import { useNavigate } from 'react-router-dom';
import ICONS from '../../../assets';

export default function NavCategory() {
  const navigate = useNavigate();

  function handleCarClick() {
    navigate('cars');
  }
  function handleMotorcycleClick() {
    navigate('motorcycles');
  }
  function handleMobilePhoneClick() {
    navigate('mobilephone');
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
            Motorcycle
          </button>
          <button
            type="button"
            className="home_navCategory_MobilePhone"
            onClick={handleMobilePhoneClick}
          >
            Mobile Phone
          </button>
          <button type="button" className="home_navCategory_ForSale">
            For Sale: Houses & Apartments
          </button>
          <button type="button" className="home_navCategory_Scooters">
            Scooters
          </button>
          <button type="button" className="home_navCategory_Commercial">
            Commercial & Other Vehicles
          </button>
          <button type="button" className="home_navCategory_ForRent">
            For Rent: Houses & Apartments
          </button>
        </div>
      </div>
    </div>
  );
}
