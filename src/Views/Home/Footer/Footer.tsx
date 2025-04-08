import './footer.css';
import ICONS from '../../../assets';
import {LINK}  from "./constant"

export default function Footer() {
  const handleClick = (link:string) => {
    window.location.href = link;
  }

  
  return (
    <div className="footerSectionParent">
      <div className="footerSection">
        <div className="footerSectionChildImages">
          <button className="footerSectionCarTradeTech">
            <img src={ICONS.carTradeTech} alt="trade" />
          </button>
          <button className="footerSectionOlx" onClick={()=>handleClick(LINK.OLX)}>
            <img
              className="footerSectionImages"
              src={ICONS.OlxWhite}
              alt="trade"
            />
          </button>
          <button className="footerSectionCarCarwale" onClick={()=>handleClick(LINK.CARWALE)}>
            <img
              className="footerSectionImages"
              src={ICONS.carWale}
              alt="trade"
            />
          </button>
          <button className="footerSectionBikewale" onClick={()=>handleClick(LINK.BIKEWALE)}>
            <img
              className="footerSectionImages"
              src={ICONS.bikeWale}
              alt="trade"
            />
          </button>
          <button className="footerSectionCarTrade" onClick={()=>handleClick(LINK.CARTRADE)}>
            <img
              className="footerSectionImages"
              src={ICONS.carTrade}
              alt="trade"
            />
          </button>
          <button className="footerSectionMobilityOutlook" onClick={()=>handleClick(LINK.MOBILITY_OUTLOOK)}>
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
