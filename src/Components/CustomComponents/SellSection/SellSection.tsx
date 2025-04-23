import './SellSection.css';
import { useState } from 'react';
import ICONS from '../../../assets';
import SubCategory from '../SellCategory/SellCategory';
import { CATEGORIES, CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT, TYPE } from '../../../Interface/constant';

export default function SellSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <div className={CLASSNAME.WRAPPER}>
      {/* choose your category text */}
      <h2 className={CLASSNAME.SUBTITLE}>{TEXT.CATEGORY}</h2>
      <div className={CLASSNAME.CATEGORIES}>
        {/* categories section / left hand side section */}
        {CATEGORIES.map((category) => (
          <div key={category.id} className={CLASSNAME.CATEGORY}>
            <button
              type={TYPE.BUTTON}
              className={`${CLASSNAME.CATEGORY_BUTTON} ${
                selectedCategory === category.id ? CLASSNAME.ACTIVE : ''
              }`}
              onClick={() =>
                setSelectedCategory(
                  category.id === selectedCategory ? '' : category.id
                )
              }
            >
              <img
                src={category.icon}
                alt={COMMON_TEXT.IMG}
                className={CLASSNAME.CATEGORY_ICON}
              />
              <span className={CLASSNAME.CATEGORY_NAME}>{category.name}</span>
              <img
                src={ICONS.upDownl}
                alt={COMMON_TEXT.IMG}
                className={CLASSNAME.ARROW}
              />
            </button>
            {/* subcategories section / right hand side section */}
            {selectedCategory === category.id && (
              <div className={CLASSNAME.SUBCATEGORIES}>
                <SubCategory categoryId={category.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
