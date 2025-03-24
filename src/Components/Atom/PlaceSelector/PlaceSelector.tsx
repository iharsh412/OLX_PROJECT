import "./placeSelector.css";
import ICONS from "../../../assets";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Store";
import { setArea } from "../../../Store/AreaItem";
import { useState } from "react";

export default function Place() {
  const area = useSelector((state: RootState) => state?.areaItem?.area);
  const [areaDropdown, setAreaDropdown] = useState(false);
  const dispatch = useDispatch();

  function toggleAreaDropdown() {
    setAreaDropdown(!areaDropdown);
  }

  return (
    <div className="home_nav_input_area">
      <img
        src={ICONS.searchIcon}
        alt="search"
        className="home_nav_input_area_search"
      />
      <input
        type="text"
        className="home_nav_input_area_field"
        placeholder="Search city, area or locality"
        value={area}
        onChange={(e) => dispatch(setArea(e.target.value))}
      />
      <span
        className="home_nav_input__area_dropdown"
        onClick={toggleAreaDropdown}
      >
        <img
          src={ICONS.upDown}
          alt="upDown"
          className={`home_nav_input_area_upDown ${
            areaDropdown ? "home_nav_area_updown_rotate" : "home_nav_area_updown_notrotate"
          }`}
        />
      </span>

      {areaDropdown && (
        <div className="home_nav_area_dropdown_list">
          {["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"].map(
            (city) => (
              <button
                key={city}
                onClick={() => dispatch(setArea(city))}
                className="home_nav_area_dropdown_items"
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
