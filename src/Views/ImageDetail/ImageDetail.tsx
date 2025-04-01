import { useParams } from 'react-router-dom';
import './imageDetail.css';
import ICONS from '../../assets';
import ImageTransition from "../../Components/Atom/ImageDetailImageTransition"
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
          <ImageTransition/>
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
          <span className="imageDetailPriceValue">₹ 3000</span>
          <span className="imageDetailPriceName">price</span>
          <div className="imageDetailPriceTags">
            <span className="imageDetailPricePlace">In Stock jkj5n kjntkrkjnkr kn</span>
            <span className="imageDetailPriceDate">day</span>
          </div>
        </div>
        {/* image chat section */}
        <div className='imageDetailChatSection'>
          <div className='imageDetailChatSellerPhotoText'>
            <span className='imageDetailChatSeller'><img src={ICONS.watch} alt="img" /></span>
            <span className='imageDetailChatText'>OLX India</span>
            <span className='imageDetailChatUpdown'><img src={ICONS.upDownl} alt="" /></span>
          </div>
          <button className='imageDetailChat'>Chat with Seller</button>
        </div>
        {/* post section */}
        <div className="imageDetailPost">
          <span className="imageDetailPostText">  Posted in</span>
          <span className="imageDetailPostValue">Samundar, maharastra,India</span>
        </div>

      </div>
    </div>
  );
}
