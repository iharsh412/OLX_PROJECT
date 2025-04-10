import './SellSection.css';
import { useState } from 'react';
import ICONS from '../../assets';
import SubCategory from '../../Components/CustomComponents/SellCategory/SellCategory';
import { CATEGORIES, CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT } from '../../Interface/constant';


export default function SellSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <div className={CLASSNAME.SS.WRAPPER}>
      <h2 className={CLASSNAME.SS.SUBTITLE}>{TEXT.SS.CATEGORY}</h2>

      <div className={CLASSNAME.SS.CATEGORIES}>
        {CATEGORIES.map((category) => (
          <div key={category.id} className={CLASSNAME.SS.CATEGORY}>
            <button
              type="button"
              className={`${CLASSNAME.SS.CATEGORY_BUTTON} ${selectedCategory === category.id ? CLASSNAME.SS.ACTIVE : ''
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
                className={CLASSNAME.SS.CATEGORY_ICON}
              />
              <span className={CLASSNAME.SS.CATEGORY_NAME}>
                {category.name}
              </span>
              <img
                src={ICONS.upDownl}
                alt={COMMON_TEXT.IMG}
                className={CLASSNAME.SS.ARROW}
              />
            </button>

            {selectedCategory === category.id && (
              <div className={CLASSNAME.SS.SUBCATEGORIES}>
                <SubCategory categoryId={category.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
