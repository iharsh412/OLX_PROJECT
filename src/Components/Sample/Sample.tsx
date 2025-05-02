import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostCategoryProductsMutation } from '../../Services/Api/module/imageApi';
import './sample.css';
import ImagesLayout from '../CustomComponents/ImageLayout/CarImage';
import { COMMON_TEXT, Product } from '../../Helper/constant';
import ICONS from '../../assets';
import { SampleData, ResponseData, CLASSNAME, TEXT } from './constant';
import Pagination from '../Atom/Pagination/Pagination';
import Error from '../Atom/Error';
import Filter from '../Atom/Filter';
import Schemer from '../Atom/Schemer';

export default function Sample() {
  const limit = 8;
  const [totalpage, setTotalpage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const { category } = useParams();
  const [showButton, setShowButton] = useState({ prev: false, next: false });
  const [sampleData, setSampleData] = useState<SampleData>({
    category,
    subcategory: '',
    brand: [],
    price: [100, 1500000],
  });
  const [price, setPrice] = useState<[number, number]>([100, 1500000]);
  const [response, setResponse] = useState<ResponseData | undefined>();
  const [productData, { isLoading, isError }] =
    usePostCategoryProductsMutation();

  // Hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productData({
          sampleData,
          page,
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
      category,
      subcategory: '',
      brand: [],
      price: [100, 1500000],
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

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
                type="button"
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
                type="button"
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
        <div className={CLASSNAME.MAIN_IMAGE_SECTION_WRAPPER}>
          {isError && <Error />}
          <div className={CLASSNAME.MAIN_SECTION_IMAGE}>
            {isLoading &&
              Array.from({ length: 8 }, (_, i) => <Schemer key={i} />)}
            {!isLoading &&
              response &&
              (response?.products?.length as number) > 0 &&
              response?.products?.map((product: Product) => (
                <ImagesLayout key={product.id} data={product} />
              ))}
            {!isLoading && response && response?.products?.length === 0 && (
              <h3 className={CLASSNAME.NO_PRODUCTS}>
                {TEXT.NO_PRODUCT_AVAILABLE}
              </h3>
            )}
          </div>

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
