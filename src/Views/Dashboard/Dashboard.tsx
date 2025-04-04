import { useGetProductsQuery } from '../../Services/Api/module/imageApi/index.ts';
import ImagesLayout from '../../Components/Atom/imagesLayout/CarImage';
import './dashboard.css';
import { useEffect, useState } from 'react';
import { Product } from '../../Shared/constant.ts';

export default function Dashboard() {
  const [page, setPage] = useState(1);

  const limit = 12;
  const { data, error, isLoading, refetch } = useGetProductsQuery(
    { page, limit },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true }
  );

  const [totalImages, setTotalImages] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      setTotalImages((prevImages) => {
        const newDataMap = new Map(data.map((item) => [item.id, item]));

        const updatedImages = prevImages.map((product) => {
          const matchingItem = newDataMap.get(product.id);
          if (matchingItem) {
            return { ...product, is_favourite: matchingItem.is_favourite };
          }
          return product;
        });

        const newItems = data.filter(
          (item) => !prevImages.some((product) => product.id === item.id)
        );

        return [...updatedImages, ...newItems];
      });
    }
  }, [data]);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="homeImageSectionWraper">
      <div className="homeImageSection">
        {totalImages.map((product: Product) => (
          <ImagesLayout
            key={product.id}
            data={product}
            refetchDashboard={refetch}
          />
        ))}
      </div>

      {data?.length === limit && (
        <div
          className="homeLoadMore"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Load More
        </div>
      )}
    </div>
  );
}
