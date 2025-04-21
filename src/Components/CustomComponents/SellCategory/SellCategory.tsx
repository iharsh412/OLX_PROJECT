import { useNavigate } from 'react-router-dom';
import './SellCategory.css';
import { CLASSNAME, SellCategoryProps, SUBCATEGORIES, TEXT } from "./constant"
import { TYPE } from '../../../Interface/constant';
import { ROUTES_CONFIG } from '../../../Shared/Constants';


export default function SellCategory({ categoryId }: SellCategoryProps) {

  const subcategories = SUBCATEGORIES[categoryId] || [];
  const navigate = useNavigate();

  return (
    <div className={CLASSNAME.WRAPPER}>
      {subcategories.map((subcategory) => (
        <button
          title={TEXT.TITLE}
          type={TYPE.BUTTON}
          key={subcategory}
          className={CLASSNAME.OPTIONS}
          onClick={() => {
            navigate(ROUTES_CONFIG.ATTRIBUTES.path, { state: { categoryId, subcategory } });
          }}
        >
          {subcategory}
        </button>
      ))}
    </div>
  );
}
