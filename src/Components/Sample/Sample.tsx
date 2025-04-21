import { usePostCategoryProductsMutation } from '../../Services/Api/module/imageApi';
import { CLASSNAME, TEXT } from './constant';
import './sample.css';
import { useParams } from 'react-router-dom';
import ImagesLayout from '../CustomComponents/ImageLayout/CarImage';
import { COMMON_TEXT, Product } from '../../Interface/constant';
import { useEffect, useState } from 'react';
import ICONS from '../../assets';
import { SampleData, ResponseData } from './constant';
import Pagination from '../Atom/Pagination/Pagination';
import Error from '../Atom/Error';
import Filter from '../Atom/Filter';
import Schemer from '../Atom/Schemer';

export default function Sample() {
  const limit = 12;
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
  }, [page, JSON.stringify(sampleData)]);
  useEffect(() => {
    setPage(1);
  }, [JSON.stringify(sampleData)]);

  useEffect(() => {
    setSampleData({
      category: category,
      subcategory: '',
      brand: [],
      price: [0, 1500000],
    });
  }, [JSON.stringify(category)]);

  useEffect(() => {
    if (!response) return;

    const totalPages = Math.max(1, Math.ceil((response?.count ?? 0) / limit));
    setTotalpage(totalPages);

    setShowButton({
      prev: page > 1,
      next: page < totalPages,
    });
  }, [JSON.stringify(response), page]);

  return (
    <div className={CLASSNAME.WRAPPER}>
      {/* TEXT SECTION */}
      <div className={CLASSNAME.TEXT_SECTION}>
        <h3>
          Buy & Sell Used{' '}
          {category === 'multiwheelvehicles'
            ? 'MULTI WHEEL VEHICLES'
            : category?.toUpperCase()}{' '}
          in India
        </h3>

        {/* SELECTED OPTIONS */}
        <div className={CLASSNAME.SELECTED_OPTION}>
          {sampleData.subcategory && (
            <div className={CLASSNAME.SELECTED_OPTION_WRAPPER}>
              <span className={CLASSNAME.SELECTED_OPTION_TEXT}>
                {sampleData.subcategory}
              </span>
              <button
                className={CLASSNAME.SELECTED_OPTION_CROSS}
                onClick={() => {
                  setSampleData({ ...sampleData, subcategory: '' });
                }}
              >
                <img src={ICONS.cross} alt={COMMON_TEXT.IMG} />
              </button>
            </div>
          )}

          {sampleData.brand.map((brand: string) => (
            <div className={CLASSNAME.SELECTED_OPTION_WRAPPER} key={brand}>
              <span className={CLASSNAME.SELECTED_OPTION_TEXT}>{brand}</span>
              <button
                className={CLASSNAME.SELECTED_OPTION_CROSS}
                onClick={() => {
                  setSampleData({
                    ...sampleData,
                    brand: sampleData.brand.filter((b) => b !== brand),
                  });
                }}
              >
                <img src={ICONS.cross} alt={COMMON_TEXT.IMG} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className={CLASSNAME.MAIN_SECTION_WRAPPER}>
        {/* FILTER SECTION */}
        <Filter
          category={category}
          response={response}
          sampleData={sampleData}
          price={price}
          setPrice={setPrice}
          setSampleData={setSampleData}
        />
        {/* Image Section */}
        <div
          className={`${CLASSNAME.MAIN_IMAGE_SECTION_WRAPPER} ${isLoading ? CLASSNAME.MAIN_SECTION_IMAGE : ''}`}
        >
          {isLoading &&
            Array.from({ length: 10 }, (_, i) => <Schemer key={i} />)}
          {isError && <Error />}
          {!isLoading && !isError && response && (
            <div className={CLASSNAME.MAIN_SECTION_IMAGE}>
              {(response?.products?.length as number) > 0 &&
                response?.products?.map((product: Product) => (
                  <ImagesLayout key={product.id} data={product} />
                ))}
              {response?.products?.length === 0 && (
                <h3 className={CLASSNAME.NO_PRODUCTS}>
                  {TEXT.NO_PRODUCT_AVAILABLE}
                </h3>
              )}
            </div>
          )}
          {/* Pagination */}
          <Pagination
            page={page}
            totalpage={totalpage}
            showButton={showButton}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}
