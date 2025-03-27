import { useNavigate } from 'react-router-dom';
import './SellCategory.css';
interface SellCategoryProps {
  categoryId: string;
}

const SUBCATEGORIES: Record<string, string[]> = {
  cars: ['Cars'],
  mobile: ['Mobile', 'Tablet'],
  electronics: ['Computer', 'TVs', 'Camera'],
  bikes: ['Bikes', 'Scooters'],
};

export default function SellCategory({ categoryId }: SellCategoryProps) {
  const subcategories = SUBCATEGORIES[categoryId] || [];
  const navigate = useNavigate();

  return (
    <div className="sell-category">
      {subcategories.map((subcategory) => (
        <button
          type="button"
          key={subcategory}
          className="sell-category__option"
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
