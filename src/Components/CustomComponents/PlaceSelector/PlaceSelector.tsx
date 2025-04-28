import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '../../../Store';
import { setArea } from '../../../Store/AreaItem';
import './placeSelector.css';
import ICONS from '../../../assets';
import { CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT } from '../../../Helper/constant';

export default function PlaceSelector() {
  const area = useSelector((state: RootState) => state?.areaItem?.area);
  const [areaDropdown, setAreaDropdown] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // HANDLE CLICK
  // togle dropdown if click inside
  function toggleAreaDropdown() {
    setAreaDropdown(!areaDropdown);
  }

  // HOOKS
  //  close clicking outside the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setAreaDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={CLASSNAME.WRAPPER}
      onClick={toggleAreaDropdown}
      ref={dropdownRef}
    >
      {/* search img */}
      <img
        src={ICONS.searchIcon}
        alt={COMMON_TEXT.IMG}
        className={CLASSNAME.SEARCH}
      />
      {/* input field */}
      <input
        type="text"
        className={CLASSNAME.INPUT}
        placeholder={TEXT.SEARCH_CITY_AREA}
        value={area}
        readOnly
        onChange={(e) => dispatch(setArea(e.target.value))}
      />
      {/* if required now its disabled */}
      {/* dropdown icon */}

      {/* <span className={CLASSNAME.DROPDOWN}>
        <img
          src={ICONS.upDown}
          alt={COMMON_TEXT.IMG}
          className={`${CLASSNAME.UPDOWN} ${
            areaDropdown ? CLASSNAME.ROTATE : CLASSNAME.NOTROTATE
          }`}
        />
      </span> */}

      {/* area dropdown */}
      {/* 
      {areaDropdown && (
        <div className={CLASSNAME.LIST}>
          {PLACE?.map((city) => (
            <button
              key={city}
              onClick={() => {
                dispatch(setArea(city));
                setAreaDropdown(false);
              }}
              className={CLASSNAME.ITEMS}
            >
              {city}
            </button>
          ))}
        </div>
      )} */}
    </div>
  );
}
