import { useNavigate } from 'react-router-dom';
import './SellCategory.css';
import {OPTIONS,CLASSNAME, SellCategoryProps,SUBCATEGORIES} from "./constant"


export default function SellCategory({ categoryId }: SellCategoryProps) {
  const subcategories = SUBCATEGORIES[categoryId] || [];
  const navigate = useNavigate();

  return (
    <div className={CLASSNAME.WRAPPER}>
      {subcategories.map((subcategory) => (
        <button
         title={OPTIONS.TITLE}
          type={OPTIONS.TYPE as "button" } 
          key={subcategory}
          className={CLASSNAME.OPTIONS}
          onClick={() => {
            navigate('attributes', { state: { categoryId, subcategory } });
          }}
        >
          {subcategory}
        </button>
      ))}
    </div>
  );
}
