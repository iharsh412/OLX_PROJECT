import './sellerDetail.css';
import ICONS from '../../../assets';

export default function SellerDetail() {
  return (
    <div className="seller-detail">
      <span className="seller-detail-heading">REVIEW YOUR DETAILS</span>
      <div className="seller-photo-name">
        <button className="seller_photo">
          <span className="seller_photo_text">OLX</span>
          <span className="seller_photo_icon">
            <img src={ICONS.camera} alt="camera" />
          </span>
        </button>
        <div className="seller_name">
          <span className="seller_name_text">Name</span>
          <input type="text" />
        </div>
      </div>
    </div>
  );
}
