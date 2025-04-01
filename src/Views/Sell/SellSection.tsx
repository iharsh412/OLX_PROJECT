import './SellSection.css';
import { useState } from 'react';
import ICONS from '../../assets';
import SubCategory from '../../Components/SellCategory/SellCategory';

const CATEGORIES = [
  { id: 'mobile', name: 'Mobile', icon: ICONS.propertis },
  { id: 'electronics', name: 'Electronics', icon: ICONS.electronics },
  { id: 'bikes', name: 'Bikes', icon: ICONS.furniture },
  { id: 'cars', name: 'Cars', icon: ICONS.car },
];

export default function SellSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <div className="sell-section__category-container">
      <h2 className="sell-section__subtitle">Choose A Category</h2>

      <div className="sell-section__categories">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="sell-section__category-wrapper">
            <button
              type="button"
              className={`sell-section__category-button ${
                selectedCategory === category.id ? 'active' : ''
              }`}
              onClick={() =>
                setSelectedCategory(
                  category.id === selectedCategory ? '' : category.id
                )
              }
            >
              <img
                src={category.icon}
                alt=""
                className="sell-section__category-icon"
              />
              <span className="sell-section__category-name">
                {category.name}
              </span>
              <img
                src={ICONS.upDownl}
                alt=""
                className="sell-section__arrow-icon"
              />
            </button>

            {selectedCategory === category.id && (
              <div className="sell-section__subcategories">
                <SubCategory categoryId={category.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
