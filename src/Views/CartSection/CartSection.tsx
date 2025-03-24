import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../../Services/Api/module/imageApi';
import { RootState } from '../../Store';
import ImageLayout from '../../Components/Atom/imagesLayout/CarImage';
import './CartSection.css';
import { useState } from 'react';
interface Product {
  id: number;
  imageUrl: string;
  price: React.ReactNode;
  images: string;
  name: string;
}

export default function CartSection() {
  const uid = useSelector((state: RootState) => state?.common?.uId);
  const [start] = useState(0);
  const { data, error, isLoading } = useGetProductsQuery({ start, limit: 10 });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  console.log(uid, 'uid');
  console.log(JSON.stringify(data, null, 2), 'data');

  return (
    <div className="cart_Wrapper">
      <span className="cart_text"> WISHLIST</span>
      <div className="cart_imageSection">
        {data?.map((products: Product) => (
          <ImageLayout key={products?.id} data={products} />
        ))}
      </div>
    </div>
  );
}
