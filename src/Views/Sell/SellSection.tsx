import './sellSection.css';
import ICONS from '../../assets';
import SubCategory from '../../Components/SellCategory/SellCategory';
import { useState } from 'react';

const data = ['Cars', 'Properties',"keure","ekrhek","kehrke"];

export default function SellSection() {
  const [open, setOpen] = useState<string>('');
  return (
    <div className="sellSection">
      <div className="sellSectionHeader">
        <button className="sellSectionHeaderButton">
          <img src={ICONS.addIcon} alt="back" />
        </button>
      </div>
      <span className="sellSetionPostAd">Post your Ad</span>
      <div className="sellSectionCategoryWrapper">
        <span className="sellSectionChooseCategoryText">Choose A Category</span>
        <div className="sellSectionCategoryListWrapper">
          {data?.map((item) => (
            <div className="sellSectionCategoryCarWrapper">
              <button
                type="button"
                className="sellSectionCategoryCar"
                name={item}
                onClick={() => {
                  setOpen(item);
                }}
              >
                <img src={ICONS.car} alt="car" />
                <span className="sellSectionCategoryCarText">{item}</span>
                <img src={ICONS.upDown} alt="upDown" />
              </button>
              {open === item ? (
                <div className="sellSectionCategoryCarSubWrapper">
                  <SubCategory />
                </div>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
