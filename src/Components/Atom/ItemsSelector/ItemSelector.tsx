import './itemSelector.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ICONS from '../../../assets';
import { RootState } from '../../../Store';
import { setItem } from '../../../Store/AreaItem';

export default function ItemsSelector() {
  const items = useSelector((state: RootState) => state?.areaItem?.item);
  //    console.log(items,"type of object ")
  const dispatch = useDispatch();
  const [object, setObject] = useState(items || '');

  return (
    <div className="home_nav_input_objects">
      <input
        type="text"
        className="home_nav_input_objects_field"
        placeholder="Find Cars, Mobile Phones and more"
        value={object}
        onChange={(e) => {
          setObject(e?.target?.value);
        }}
      />
      <button
        className="home_nav_input_object_search"
        onClick={() => {
          dispatch(setItem(object));
        }}
      >
        <img
          className="home_nav_input_objects_icon"
          src={ICONS.searchIconWhite}
          alt="search"
        />
      </button>
    </div>
  );
}
