import './sellCategory.css';

const category = ['hello', 'khweih'];

export default function SellCategory() {
  return (
    <div className="sellCategory">
      {category.map((items) => (
        <button type="button" key={items} className="sellCategoryOptions">
          {items}
        </button>
      ))}
    </div>
  );
}
