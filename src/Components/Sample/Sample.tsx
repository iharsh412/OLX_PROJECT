import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useGetProductsByCategoryQuery } from '../../Services/Api/module/imageApi';
import { CLASSNAME, TEXT } from './constant';
import './sample.css';
import { useParams } from 'react-router-dom';
import ImagesLayout from '../Atom/imagesLayout/CarImage';
import { Product } from '../../Shared/constant';
import { useEffect, useState } from 'react';

interface SampleData {
  subcategory: string;
  brand: string;
  price: [number, number];
}

export default function Sample() {
  const { category } = useParams();

  const [sampleData, setSampleData] = useState<SampleData>({
    subcategory: '',
    brand: '',
    price: [0, 1000000],
  });

  const { data, refetch, isLoading, error } = useGetProductsByCategoryQuery(
    { category },
    { refetchOnMountOrArgChange: true }
  );
  // console.log(data, 'data');
  const [totalImages, setTotalImages] = useState<Product[] | undefined>(
    data?.products
  );

  useEffect(() => {
    setTotalImages(data?.products);
  }, [data]);

  console.log(sampleData, 'data');
  const handlePriceRangeChange = (value: [number, number]) => {
    // console.log(value, 'value');
    setSampleData({
      ...sampleData,
      price: value,
    });
  };

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className={CLASSNAME.WRAPPER}>
      {/* TEXT SECTION */}
      <div className={CLASSNAME.TEXT_SECTION}>
        <h3>{TEXT.TEXT_SECTION.H3}</h3>
      </div>
      {/* MAIN SECTION */}
      <div className={CLASSNAME.MAIN_SECTION_WRAPPER}>
        {/* FILTER SECTION */}
        <div className={CLASSNAME.MAIN_SECTION_FILTER}>
          <h3 className={CLASSNAME.FILTER_TITLE}>CARS</h3>
          {/* SUBCATEGORIES */}
          <div className={CLASSNAME.SUBCATEGORY}>
            <h4>Subcategory</h4>

            <div className="sample-subcategoryOption">
              {data.subcategories.map(
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
              )}
            </div>
          </div>
          {/* BRANDS */}
          <div className={CLASSNAME.BRAND}>
            <h4>Brand</h4>
            <div className="sample-brandOption">
              {data.Brand.map(
                (brand: string | null | undefined, index: number) =>
                  brand ? (
                    <button
                      title={brand}
                      key={index}
                      className="sample-brandOption__item"
                      onClick={() => {
                        setSampleData({ ...sampleData, brand });
                      }}
                    >
                      {brand}
                    </button>
                  ) : null
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
              value={sampleData.price}
              onInput={(value: [number, number]) =>
                handlePriceRangeChange(value)
              }
            />
            <div className="sample-priceOption">
              <input
                title="Price Min"
                min={0}
                max={1000000}
                type="number"
                className="sample_priceMin"
                value={
                  sampleData?.price?.[0] < sampleData?.price?.[1]
                    ? sampleData?.price?.[0]
                    : sampleData?.price?.[1]
                }
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setSampleData({
                    ...sampleData,
                    price: [value, sampleData?.price?.[1]],
                  });
                }}
              />
              <input
                title="Price Max"
                min={0}
                max={1000000}
                type="number"
                className="sample_priceMax"
                value={
                  sampleData?.price?.[1] > sampleData?.price?.[0]
                    ? sampleData?.price?.[1]
                    : sampleData?.price?.[0]
                }
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setSampleData({
                    ...sampleData,
                    price: [sampleData?.price?.[0], value],
                  });
                }}
              />
            </div>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className={CLASSNAME.MAIN_SECTION_IMAGE}>
          {totalImages?.map((product: Product) => (
            <ImagesLayout key={product.id} data={product} refetch={refetch} />
          ))}
        </div>
      </div>
    </div>
  );
}
