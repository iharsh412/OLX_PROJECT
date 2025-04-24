import './myAds.css';
import { useGetAdsDataQuery } from '../../Services/Api/module/imageApi';
import { CLASSNAME, TEXT } from './constant';
import Images from '../../Components/CustomComponents/ImageLayout/MyAdsImage';
import { Product } from '../../Interface/constant';
import Error from '../../Components/Atom/Error';
import Schemer from '../../Components/Atom/Schemer'; // Import Schemer component
import { ROUTES_CONFIG } from '../../Shared/Constants';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '../../Components/Atom/Pagination';

export default function MyAds() {
  const limit = 12;
  const [totalpage, setTotalpage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [showButton, setShowButton] = useState({ prev: false, next: false });

  const { data, refetch, isError, isLoading } = useGetAdsDataQuery(
    { page: page < totalpage ? page : totalpage, limit: limit },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (!data?.total_count) return;

    const totalPages = Math.max(1, Math.ceil((data?.total_count ?? 0) / limit));
    setTotalpage(totalPages);

    setShowButton({
      prev: page > 1,
      next: page < totalPages,
    });
    if (page > totalPages) setPage(totalPages);
  }, [JSON.stringify(data), page]);

  return (
    <div className={CLASSNAME.WRAPPER}>
      {/* my ads text */}
      <h1 className={CLASSNAME.TITLE}>{TEXT.MY_ADS}</h1>
      {/* schemer  */}
      <div className={CLASSNAME.AD_WRAPPER}>
        {isLoading && (
          <div className="loader">
            {Array.from({ length: 10 }, (_, i) => (
              <Schemer key={i} />
            ))}
          </div>
        )}
        {isError && <Error />}
        {/* no ads */}
        {page === 1 && data?.products?.length === 0 && (
          <>
            <div className={CLASSNAME.NO_ADS}>
              {TEXT.NO_ADS} <Link to={ROUTES_CONFIG.SELL.path}>{TEXT.ADS}</Link>
            </div>
          </>
        )}
        {data?.products?.map((product: Product) => (
          <Images key={product.id} data={product} refetch={refetch} />
        ))}
        <Pagination
          totalpage={totalpage}
          page={page}
          showButton={showButton}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
