import { useGetProductsQuery } from '../../Services/Api/module/imageApi/index.ts';
import ImagesLayout from '../../Components/Atom/imagesLayout/CarImage';
import './dashboard.css';
import { useState, useRef, useEffect } from 'react';

export default function Dashboard() {
  const [start, setStart] = useState(1);
  const limit = 1;

  const { data, error, isLoading } = useGetProductsQuery({ start, limit });

  const imagesData = useRef<any[]>([]); // Use ref to store loaded products
  const [, forceRender] = useState({}); // Dummy state to trigger re-render

  // Append new data to ref and trigger re-render
  useEffect(() => {
    if (data && data.length) {
      imagesData.current = [...imagesData.current, ...data]; // Concatenate old and new data
      forceRender({}); // Trigger a re-render
    }
  }, [data]);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="homeImageSectionWraper">
      <div className="homeImageSection">
        {imagesData.current.map((product: any) => (
          <ImagesLayout key={product?.id} data={product} />
        ))}
      </div>
      <div
        className="homeImageLoadMore"
        onClick={() => setStart((prev) => prev + limit)}
      >
        Load More
      </div>
    </div>
  );
}
