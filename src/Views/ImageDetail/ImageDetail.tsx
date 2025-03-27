import { useParams } from 'react-router-dom';
import './imageDetail.css';
import { useGetProductsDetailQuery } from '../../Services/Api/module/imageApi';

export default function ImageDetail() {
  const { productId } = useParams();
  const id = productId !== undefined ? Number(productId) : undefined;

  const { data } = useGetProductsDetailQuery({ id: id });

  console.log(data);
  const product = Array.isArray(data) ? data[0] : data;
  console.log(product, 'product');

  return (
    <div className="imageDetailWrapper">
      <div className="imageDetailImagesDetailsDescription">
        <div className="imageDetailImageSection">
          <img
            src={`https://0e50-112-196-113-3.ngrok-free.app/${product?.display_photo}`}
            alt="img"
          />
        </div>
        <div className="imageDetailDetailsDescription">
          <div className="imageDetailDetails">
            <span className="imageDetailTitle">Details</span>
            <div className="imageDetailBrand">
              <span className="imageDetailBrandTitle">Brand</span>
              <span className="imageDetailBrandValue">{product?.name}</span>
            </div>
          </div>
          <hr />
          <div className="imageDetailDescription">
            <span className="imageDetailDescriptionTitle">Description</span>
            <span className="imageDetailDescriptionValue">
              {product?.description}
            </span>
          </div>
        </div>
      </div>
      {/* images price section */}
      <div className="imageDetailPriceChatSection">
        <div className="imageDetailPriceSection">
          <span className="imageDetailPriceValue">Price</span>
          <span className="imageDetailPriceName">₹{product?.price}</span>
          <div className="imageDetailPriceTags">
            <span className="imageDetailPricePlace">In Stock</span>
            <span className="imageDetailPriceDate">day</span>
          </div>
        </div>
      </div>
    </div>
  );
}
