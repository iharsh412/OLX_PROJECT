import './footer.css';
import ICONS from '../../assets';
import { CLASSNAME, LINK, TEXT } from './constant';
import { COMMON_TEXT } from '../../Helper/constant';

export default function Footer() {
  const handleClick = (link: string) => {
    window.location.href = link;
  };

  return (
    <div className={CLASSNAME.WRAPPER}>
      <div className={CLASSNAME.CHILD}>
        <div className={CLASSNAME.IMAGES_LIST}>
          <button className={CLASSNAME.CAR_TRADE_TECH} type="button">
            <img src={ICONS.carTradeTech} alt={COMMON_TEXT.IMG} />
          </button>
          <button
            className={CLASSNAME.OLX}
            type="button"
            onClick={() => handleClick(LINK.OLX)}
          >
            <img
              className={CLASSNAME.IMAGES}
              src={ICONS.OlxWhite}
              alt={COMMON_TEXT.IMG}
            />
          </button>
          <button
            className={CLASSNAME.CARWALE}
            type="button"
            onClick={() => handleClick(LINK.CARWALE)}
          >
            <img
              className={CLASSNAME.IMAGES}
              src={ICONS.carWale}
              alt={COMMON_TEXT.IMG}
            />
          </button>
          <button
            className={CLASSNAME.BIKEWALE}
            type="button"
            onClick={() => handleClick(LINK.BIKEWALE)}
          >
            <img
              className={CLASSNAME.IMAGES}
              src={ICONS.bikeWale}
              alt={COMMON_TEXT.IMG}
            />
          </button>
          <button
            className={CLASSNAME.CAR_TRADE}
            type="button"
            onClick={() => handleClick(LINK.CARTRADE)}
          >
            <img
              className={CLASSNAME.IMAGES}
              src={ICONS.carTrade}
              alt={COMMON_TEXT.IMG}
            />
          </button>
          <button
            className={CLASSNAME.MOBILITY_OUTLOOK}
            type="button"
            onClick={() => handleClick(LINK.MOBILITY_OUTLOOK)}
          >
            <img
              className={CLASSNAME.IMAGES}
              src={ICONS.mobilityOutlook}
              alt={COMMON_TEXT.IMG}
            />
          </button>
        </div>
        <div className={CLASSNAME.SECTION_TEXT}>
          <button className={CLASSNAME.SECTION_HELP} type="button">
            {TEXT.HELP_SITEMAP}
          </button>
          <span className={CLASSNAME.ALL_RIGHT_RESERVED}>
            {TEXT.ALL_RIGHT_RESERVED}
          </span>
        </div>
      </div>
    </div>
  );
}
