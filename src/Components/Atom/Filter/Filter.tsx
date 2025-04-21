import './filter.css';
import { FilterProps, CLASSNAME, TEXT } from './constant';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { SampleData } from '../../Sample/constant';
import { TYPE } from '../../../Interface/constant';

const Filter: React.FC<FilterProps> = ({
  category,
  response,
  sampleData,
  setSampleData,
  price,
  setPrice,
}) => {
  const handlePrice = (value: [number, number]) => {
    setPrice?.(value);
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setSampleData?.({
      ...sampleData,
      price: value,
    });
  };
  const handleBrandClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const brand = e.currentTarget.title;

    if (brand) {
      setSampleData?.((prev: SampleData) => {
        const isSelected = prev.brand.includes(brand);
        return {
          ...prev,
          brand: isSelected
            ? prev.brand.filter((b) => b !== brand)
            : [...prev.brand, brand],
        };
      });
    }
  };

  return (
    <div className={CLASSNAME.MAIN_SECTION_FILTER}>
      <h3 className={CLASSNAME.FILTER_TITLE}>
        {category === 'multiwheelvehicles'
          ? 'MULTI WHEEL VEHICLES'
          : category?.toUpperCase()}
      </h3>
      {/* SUBCATEGORIES */}
      <div className={CLASSNAME.SUBCATEGORY}>
        <h4>{TEXT.CATEGORY}</h4>

        <div className={CLASSNAME.SUBCATEGORY_LIST}>
          {response?.subcategories && response?.subcategories?.length > 0 ? (
            response?.subcategories?.map(
              (
                category: {
                  subcategory_name: string;
                  product_count: number;
                },
                index: number
              ) => (
                <button
                  title={category.subcategory_name}
                  key={index}
                  className={
                    category.subcategory_name === sampleData?.subcategory
                      ? CLASSNAME.ACTIVE
                      : CLASSNAME.SUBCATEGORY_ITEM
                  }
                  type={TYPE.BUTTON}
                  onClick={() => {
                    if (category.subcategory_name !== sampleData?.subcategory) {
                      setSampleData?.({
                        ...sampleData,
                        subcategory: category.subcategory_name,
                      });
                    } else {
                      setSampleData?.({
                        ...sampleData,
                        subcategory: '',
                      });
                    }
                  }}
                >
                  {category.subcategory_name} ({category?.product_count})
                </button>
              )
            )
          ) : (
            <h3 className={CLASSNAME.NO_PRODUCTS}>{TEXT.NO_CATEGORY}</h3>
          )}
        </div>
      </div>
      {/* BRANDS */}
      <div className={CLASSNAME.BRAND}>
        <h4>{TEXT.BRAND}</h4>
        <div className={CLASSNAME.BRAND_LIST}>
          {response?.Brand && response?.Brand?.length > 0 ? (
            response?.Brand?.map((brand: string | undefined, index: number) => (
              <button
                type={TYPE.BUTTON}
                title={brand}
                key={index}
                className={
                  sampleData?.brand.includes(brand as string)
                    ? CLASSNAME.ACTIVE
                    : CLASSNAME.BRAND_ITEMS
                }
                onClick={handleBrandClick}
              >
                {brand}
              </button>
            ))
          ) : (
            <h3 className={CLASSNAME.NO_PRODUCTS}>{TEXT.NO_BRAND}</h3>
          )}
        </div>
      </div>

      {/* BUDGET */}
      <div className={CLASSNAME.PRICE}>
        <h4>{TEXT.PRICE}</h4>
        <RangeSlider
          min={0}
          max={1500000}
          step={10}
          value={price}
          onInput={(value: [number, number]) => handlePrice(value)}
        />
        <div className={CLASSNAME.PRICE_LIST}>
          <input
            title={TEXT.PRICE_MIN}
            min={0}
            max={1500000}
            type={TYPE.NUMBER}
            className={CLASSNAME.PRICE_MIN}
            value={
              (price?.[0] ?? 0) < (price?.[1] ?? 0)
                ? (price?.[0] ?? 0)
                : (price?.[1] ?? 0)
            }
            onChange={(e) => {
              const value = Number(e.target.value);
              setPrice?.([value, price?.[1]]);
            }}
          />
          <input
            title={TEXT.PRICE_MAX}
            min={0}
            max={1500000}
            type={TYPE.NUMBER}
            className={CLASSNAME.PRICE_MAX}
            value={
              (price?.[1] ?? 0) > (price?.[0] ?? 0)
                ? (price?.[1] ?? 0)
                : (price?.[0] ?? 0)
            }
            onChange={(e) => {
              const value = Number(e.target.value);
              setPrice?.([price?.[0], value]);
            }}
          />
        </div>
        <button
          className={CLASSNAME.APPLY}
          type={TYPE.BUTTON}
          onClick={() => {
            handlePriceRangeChange(price ?? [0, 0]);
          }}
        >
          {TEXT.APPLY}
        </button>
      </div>
    </div>
  );
};
export default Filter;
