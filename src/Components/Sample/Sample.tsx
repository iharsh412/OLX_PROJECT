import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { usePostCategoryProductsMutation } from '../../Services/Api/module/imageApi';
import { CLASSNAME } from './constant';
import './sample.css';
import { useParams } from 'react-router-dom';
import ImagesLayout from '../Atom/imagesLayout/CarImage';
import { Product } from '../../Shared/constant';
import { useEffect, useState } from 'react';
import ICONS from '../../assets';

interface SampleData {
  category?: string;
  subcategory: string;
  brand: string[];
  price: [number, number];
}
interface ResponseData {
  products?: Product[];
  subcategories?: { subcategory_name: string; product_count: number }[];
  Brand?: string[];
}

export default function Sample() {
  const limit = 1;
  const [page] = useState<number>(1);
  const { category } = useParams();
  const [sampleData, setSampleData] = useState<SampleData>({
    category: category,
    subcategory: '',
    brand: [],
    price: [0, 1000000],
  });

  const [price, setPrice] = useState<[number, number]>([0, 1000000]);
  const [response, setResponse] = useState<ResponseData | undefined>();

  const [productData, { isLoading, error }] = usePostCategoryProductsMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productData({ sampleData, page: page, limit }).unwrap();

        setResponse(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sampleData]);
  console.log(response, 'response');

  useEffect(() => {
    setSampleData({
      category: category,
      subcategory: '',
      brand: [],
      price: [0, 1000000],
    });
  }, [category]);

  console.log(sampleData, 'data');
  const handleBrandClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const brand = e.currentTarget.title;

    if (brand) {
      setSampleData((prev) => {
        return {
          ...sampleData,
          brand: prev.brand.includes(brand)
            ? prev.brand
            : [...sampleData.brand, brand],
        };
      });
    }
  };

  const handlePrice = (value: [number, number]) => {
    setPrice(value);
  };
  const handlePriceRangeChange = (value: [number, number]) => {
    setSampleData({
      ...sampleData,
      price: value,
    });
  };

  const handlePrevPage = () => {


  };

  return (
    <div className={CLASSNAME.WRAPPER}>
      {/* TEXT SECTION */}
      <div className={CLASSNAME.TEXT_SECTION}>
        <h3>Buy & Sell Used {category?.toUpperCase()} in India</h3>

        {/* SELECTED OPTIONS */}

        <div className="sample-selectedOptions">
          {sampleData.subcategory && (
            <div className="sample-selectedWrapper">
              <span className="sample-selectedText">
                {sampleData.subcategory}
              </span>
              <button
                className="sample-selectedCross"
                onClick={() => {
                  setSampleData({ ...sampleData, subcategory: '' });
                }}
              >
                <img src={ICONS.cross} alt="img" />
              </button>
            </div>
          )}

          {sampleData.brand.map((brand: string) => (
            <div className="sample-selectedWrapper" key={brand}>
              <span className="sample-selectedText">{brand}</span>
              <button
                className="sample-selectedCross"
                onClick={() => {
                  setSampleData({
                    ...sampleData,
                    brand: sampleData.brand.filter((b) => b !== brand),
                  });
                }}
              >
                <img src={ICONS.cross} alt="img" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className={CLASSNAME.MAIN_SECTION_WRAPPER}>
        {/* FILTER SECTION */}
        <div className={CLASSNAME.MAIN_SECTION_FILTER}>
          <h3 className={CLASSNAME.FILTER_TITLE}>{category?.toUpperCase()}</h3>
          {/* SUBCATEGORIES */}
          <div className={CLASSNAME.SUBCATEGORY}>
            <h4>Category</h4>

            <div className="sample-subcategoryOption">
              {response?.subcategories && response?.subcategories?.length > 0 ? (
                response?.subcategories?.map(
                  (
                    category: { subcategory_name: string; product_count: number },
                    index: number
                  ) => (
                    <button
                      title={category.subcategory_name}
                      key={index}
                      className="sample-subcategoryOption__item"
                      onClick={() => {
                        setSampleData({
                          ...sampleData,
                          subcategory: category.subcategory_name,
                        });
                      }}
                    >
                      {category.subcategory_name} ({category?.product_count})
                    </button>
                  )
                )) : <h3 className="sample-brandOption__noBrand">
                No category available
              </h3>}
            </div>
          </div>
          {/* BRANDS */}
          <div className={CLASSNAME.BRAND}>
            <h4>Brand</h4>
            <div className="sample-brandOption">
              {response?.Brand && response?.Brand?.length > 0 ? (
                response?.Brand?.map(
                  (brand: string | undefined, index: number) => (
                    <button
                      title={brand}
                      key={index}
                      className="sample-brandOption__item"
                      onClick={handleBrandClick}
                    >
                      {brand}
                    </button>
                  )
                )
              ) : (
                <h3 className="sample-brandOption__noBrand">
                  No brand available
                </h3>
              )}
            </div>
          </div>

          {/* BUDGET */}
          <div className={CLASSNAME.PRICE}>
            <h4>Price</h4>
            <RangeSlider
              min={0}
              max={1000000}
              step={10}
              value={price}
              onInput={(value: [number, number]) => handlePrice(value)}
            />
            <div className="sample-priceOption">
              <input
                title="Price Min"
                min={0}
                max={1000000}
                type="number"
                className="sample_priceMin"
                value={price?.[0] < price?.[1] ? price?.[0] : price?.[1]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setPrice([value, price?.[1]]);
                }}
              />
              <input
                title="Price Max"
                min={0}
                max={1000000}
                type="number"
                className="sample_priceMax"
                value={price?.[1] > price?.[0] ? price?.[1] : price?.[0]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setPrice([price?.[0], value]);
                }}
              />
            </div>
            <button
              className="sample-priceOption__apply"
              onClick={() => {
                handlePriceRangeChange(price);
              }}
            >
              Apply
            </button>
          </div>
        </div>

        {/* IMAGE SECTION */}
        {isLoading ? (<h1 className='sample-errorAndLoading'>Loading...</h1>) : error ? (<h1 className='sample-errorAndLoading'>Error in loading products</h1>) : (<div className={CLASSNAME.MAIN_SECTION_IMAGE}>
          {response?.products?.map((product: Product) => (
            <ImagesLayout key={product.id} data={product} />
          ))}
          <div className="sample-PageChange">
            <span className="sample-PREV" onClick={handlePrevPage}>Prev</span>
            <span className="sample-NEXT">Next</span>
          </div>
        </div>)}
      </div>
    </div>
  );
}
