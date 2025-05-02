import './footerInfo.css';
import { Link } from 'react-router-dom';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import ICONS from '../../../assets';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          {/* <h3>Support</h3>
          <p>Vaishali 844101, Bihar, India</p>
          <p>Email: abhishekanand7091@gmail.com</p>
          <p>Phone:100</p> */}
        </div>

        {/* <Link to={ROUTES}>My Account</Link> */}

        <Link to={ROUTES_CONFIG.LOGIN.path}>Login/Register</Link>

        {/* <Link to={ROUTES.CART}>Cart</Link> */}

        {/* <Link to={ROUTES.WISHLIST}>Wishlist</Link> */}

        {/* <Link to={ROUTES.SHOP}>Shop</Link> */}

        <div className="footer-section">
          <h3>Quick Links</h3>
          {/* <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
          <Link to={ROUTES.TERMS_OF_USE}>Terms of Use</Link>
          <Link to={ROUTES.FAQs}>FAQs</Link> */}
        </div>

        <div className="download-app-container">
          <h2 className="download-heading">Download App</h2>
          <p className="download-subtext">Save $3 with App New User Only</p>

          <div className="download-content">
            <div className="store-buttons">
              <button
                type="button"
                className="store-button"
                onClick={() =>
                  window.open(
                    'https://play.google.com/store/apps/details?id=com.shopify.mobile&pcampaignid=web_share',
                    '_blank'
                  )
                }
              >
                <img src={ICONS.playstore} alt="Google Play Store" />
              </button>
              <button
                type="button"
                className="store-button"
                onClick={() =>
                  window.open(
                    'https://apps.apple.com/in/app/shopify-ecommerce-business/id371294472',
                    '_blank'
                  )
                }
              >
                <img src={ICONS.appstore} alt="Apple Store" />
              </button>
            </div>
          </div>

          <div className="socialmedia">
            <button
              type="button"
              onClick={() =>
                window.open('https://www.facebook.com/ChicmicAU', '_blank')
              }
            >
              <img src={ICONS.fb} alt="Facebook" />
            </button>
            <button
              type="button"
              onClick={() => window.open('https://x.com/Chic_Mic', '_blank')}
            >
              <img src={ICONS.twitter} alt="Twitter" />
            </button>
            <button
              type="button"
              onClick={() =>
                window.open('https://www.instagram.com/chicmic.in', '_blank')
              }
            >
              <img src={ICONS.insta} alt="Instagram" />
            </button>
            <button
              type="button"
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/company/chicmicstudios',
                  '_blank'
                )
              }
            >
              <img src={ICONS.olxintv} alt="LinkedIn" />
            </button>
          </div>
        </div>
      </div>

      <p id="bottom-text"> ⓒ Copyright Rimel 2022. All rights reserved</p>
    </footer>
  );
}
