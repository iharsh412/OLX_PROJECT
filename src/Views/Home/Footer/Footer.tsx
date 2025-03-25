import './footer.css';
import ICONS from '../../../assets';

export default function Footer() {
  return (
    <div className="footerSectionParent">
      <div className="footerSection">
        <div className="footerSectionChildImages">
          <button className="footerSectionCarTradeTech">
            <img src={ICONS.carTradeTech} alt="trade" />
          </button>
          <button className="footerSectionOlx">
            <img
              className="footerSectionImages"
              src={ICONS.OlxWhite}
              alt="trade"
            />
          </button>
          <button className="footerSectionCarCarwale">
            <img
              className="footerSectionImages"
              src={ICONS.carWale}
              alt="trade"
            />
          </button>
          <button className="footerSectionBikewale">
            <img
              className="footerSectionImages"
              src={ICONS.bikeWale}
              alt="trade"
            />
          </button>
          <button className="footerSectionCarTrade">
            <img
              className="footerSectionImages"
              src={ICONS.carTrade}
              alt="trade"
            />
          </button>
          <button className="footerSectionMobilityOutlook">
            <img
              className="footerSectionImages"
              src={ICONS.mobilityOutlook}
              alt="trade"
            />
          </button>
        </div>
        <div className="footerSectionText">
          <button className="footerSectionHelp">Help-Sitemap</button>
          <span className="footerSectionAllRightsReserved">
            All rights reserved © 2006-2025 OLX
          </span>
        </div>
      </div>
    </div>
  );
}
