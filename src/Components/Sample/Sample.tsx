import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { usePostCategoryProductsMutation } from '../../Services/Api/module/imageApi';
import { CLASSNAME } from './constant';
import './sample.css';
import { useParams } from 'react-router-dom';
import ImagesLayout from '../CustomComponents/ImageLayout/CarImage';
import { Product } from '../../Interface/constant';
import { useEffect, useState } from 'react';
import ICONS from '../../assets';
import { SampleData, ResponseData } from './constant';

export default function Sample() {
  const limit = 3;
  const [totalpage, setTotalpage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const { category } = useParams();
  const [showButton, setShowButton] = useState({ prev: false, next: false });
  const [sampleData, setSampleData] = useState<SampleData>({
    category: category,
    subcategory: '',
    brand: [],
    price: [0, 1500000],
  });
  const [price, setPrice] = useState<[number, number]>([0, 1500000]);
  const [response, setResponse] = useState<ResponseData | undefined>();
  const [productData, { isLoading, isError }] =
    usePostCategoryProductsMutation();
  // Hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productData({
          sampleData,
          page: page,
          limit,
        }).unwrap();

        setResponse(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sampleData, page]);
  useEffect(() => {
    setPage(1)
  }, [sampleData]);

  useEffect(() => {
    setSampleData({
      category: category,
      subcategory: '',
      brand: [],
      price: [0, 1500000],
    });
    setPage(1);
  }, [category]);
  useEffect(() => {
    let Pages = 1;
    if (response && response.count) {
      Pages = Math.ceil(response?.count / limit);
      setTotalpage(Pages);
    } else {
      setTotalpage(1);
    }

    if (Pages <= 1) {
      setShowButton({ prev: false, next: false });
    } else if (Pages > 1 && page === 1) {
      setShowButton({ prev: false, next: true });
    } else if (Pages > 1 && page === Pages) {
      setShowButton({ prev: true, next: false });
    } else {
      setShowButton({ prev: true, next: true });
    }
  }, [response, page, category]);

  // console.log(response, 'uygruey');
  // console.log(sampleData, totalpage, page, 'uheiwi');

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
    setPage(page - 1);
  };
  const handleNextPage = () => {
    setPage(page + 1);
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
              {response?.subcategories &&
              response?.subcategories?.length > 0 ? (
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
                      className="sample-subcategoryOption__item"
                      disabled={
                        category.subcategory_name === sampleData.subcategory
                      }
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
                )
              ) : (
                <h3 className="sample-brandOption__noBrand">
                  No category available
                </h3>
              )}
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
                      type="button"
                      title={brand}
                      key={index}
                      className="sample-brandOption__item"
                      disabled={sampleData.brand.includes?.(brand as string)}
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
              max={1500000}
              step={10}
              value={price}
              onInput={(value: [number, number]) => handlePrice(value)}
            />
            <div className="sample-priceOption">
              <input
                title="Price Min"
                min={0}
                max={1500000}
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
                max={1500000}
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
        {/* Image Section */}
        <div className={CLASSNAME.MAIN_IMAGE_SECTION_WRAPPER}>
         
          {isLoading && <h1 className="sample-errorAndLoading">Loading...</h1>}
          {isError && (
            <h1 className="sample-errorAndLoading">
              Error in loading products
            </h1>
          )}
          {!isLoading && !isError && response && (
            <div className={CLASSNAME.MAIN_SECTION_IMAGE}>
              {(response?.products?.length as number) > 0 &&
                response?.products?.map((product: Product) => (
                  <ImagesLayout key={product.id} data={product} />
                ))}
              {response?.products?.length === 0 && (
                <h3 className="sample-noProduct">No product available</h3>
              )}
            </div>
          )}
          {totalpage >= 2 && (
            <div className="sample-PageChange">
              <button
                className={`sample-PREV ${
                  showButton.prev ? '' : 'sample-disabled'
                }`}
                onClick={handlePrevPage}
              >
                Prev
              </button>
              <div className="sample-pagewrapper">
                {Array(totalpage)
                  ?.fill('')
                  ?.map((_, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => setPage(index + 1)}
                        disabled={index + 1 === page}
                        className={`sample-pageNumber ${
                          index + 1 === page ? 'sample-activepage' : ''
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
              </div>

              <button
                className={`sample-NEXT ${
                  showButton.next ? '' : 'sample-disabled'
                }`}
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
