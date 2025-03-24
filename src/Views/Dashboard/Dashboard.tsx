import { useGetProductsQuery } from '../../Services/Api/module/imageApi/index.ts';
import ImagesLayout from "../../Components/Atom/imagesLayout/CarImage"
import './dashboard.css';

interface Product {
  id: number;
  imageUrl: string;
  price: React.ReactNode;
  images: string;
  name: string;
}

export default function Dashboard() {
  const { data, error, isLoading } = useGetProductsQuery({});
 

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="homeImageSectionWraper">
      <div className="homeImageSection">
        {data?.map((products: Product) => (
          <ImagesLayout key={products?.id} data={products} />
        ))}
      </div>
    </div>
  );
}
