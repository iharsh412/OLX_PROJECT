import { useNavigate } from 'react-router-dom';
import './SellCategory.css';
import { CLASSNAME, SUBCATEGORIES } from './constant';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import { COMMON_TEXT } from '../../../Helper/constant';
import { SellCategoryProps } from '../../../Helper/interface';

export default function SellCategory({
  categoryId,
}: Readonly<SellCategoryProps>) {
  const subcategories = SUBCATEGORIES[categoryId] || [];
  const navigate = useNavigate();

  return (
    <div className={CLASSNAME.WRAPPER}>
      {subcategories.map((subcategory) => (
        <button
          title={COMMON_TEXT.SELECT_THIS_CATEGORY}
          type="button"
          key={subcategory}
          className={CLASSNAME.OPTIONS}
          onClick={() => {
            navigate(ROUTES_CONFIG.ATTRIBUTES.path, {
              state: { categoryId, subcategory },
            });
          }}
        >
          {subcategory}
        </button>
      ))}
    </div>
  );
}
