import { useGetProductsQuery } from '../../Services/Api/module/imageApi/index.ts';
import ImagesLayout from '../../Components/Atom/imagesLayout/CarImage';
import './dashboard.css';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: React.ReactNode;
  display_photo?: string;
  category?: React.ReactNode;
  city?: React.ReactNode;
  district?: React.ReactNode;
  state?: React.ReactNode;
  status?: React.ReactNode;
  subcategory?: React.ReactNode;
  user?: React.ReactNode;
}

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const limit = 4;
  const { data, error, isLoading } = useGetProductsQuery({ page, limit });
  console.log(data,"dashboard")
  const [totalImages, setTotalImages] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      setTotalImages((prev) => {
        // Ensure no duplicate products are added
        const newProducts = data.filter(
          (newItem) => !prev.some((existingItem) => existingItem.id === newItem.id)
        );
        return [...prev, ...newProducts];
      });
    }
  }, [data]);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="homeImageSectionWraper">
      <div className="homeImageSection">
        {totalImages.map((product: Product) => (
          <ImagesLayout key={product.id} data={product} />
        ))}
      </div>

      {data?.length === limit && (
        <div className="homeLoadMore" onClick={() => setPage((prev) => prev + 1)}>
          Load More
        </div>
      )}
    </div>
  );
}
