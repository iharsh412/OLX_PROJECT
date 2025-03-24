import './carSection.css';
import ICONS from '../../assets';

export default function CarSection() {
  return (
    <div className="carSectionWrapper">
      <div className="carAddSectionWrapper">
        <div className="carAddSection">
          <img className="carAddSectionImage" src={ICONS.watch} alt="add" />
        </div>
      </div>
      <div className="carSectionTotalCars">
        371819 Used Cars in India - Buy & Sell Second Hand Cars
      </div>
    </div>
  );
}
