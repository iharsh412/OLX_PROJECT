import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '../../../Store';
import { setArea } from '../../../Store/AreaItem';
import './placeSelector.css';
import ICONS from '../../../assets';
import { CLASSNAME, PLACE, TEXT } from './constant';
import { COMMON_TEXT } from '../../../Shared/constant';

export default function PlaceSelector() {
  const area = useSelector((state: RootState) => state?.areaItem?.area);
  const [areaDropdown, setAreaDropdown] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // HANDLE CLICK
  function toggleAreaDropdown() {
    setAreaDropdown(!areaDropdown);
  }

  // HOOKS

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setAreaDropdown(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={CLASSNAME.WRAPPER} ref={dropdownRef}>
      <img
        src={ICONS.searchIcon}
        alt={COMMON_TEXT.IMG}
        className={CLASSNAME.SEARCH}
      />
      <input
        type="text"
        className={CLASSNAME.INPUT}
        placeholder={TEXT.SEARCH_CITY_AREA}
        value={area}
        onChange={(e) => dispatch(setArea(e.target.value))}
      />
      <span
        className={CLASSNAME.DROPDOWN}
        onClick={toggleAreaDropdown}
      >
        <img
          src={ICONS.upDown}
          alt={COMMON_TEXT.IMG}
          className={`${CLASSNAME.UPDOWN} ${areaDropdown
              ? CLASSNAME.ROTATE
              : CLASSNAME.NOTROTATE
            }`}
        />
      </span>

      {areaDropdown && (
        <div className={CLASSNAME.LIST}>
          {PLACE?.map(
            (city) => (
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
            )
          )}
        </div>
      )}
    </div>
  );
}
