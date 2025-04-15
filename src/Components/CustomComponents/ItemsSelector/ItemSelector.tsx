import './itemSelector.css';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import ICONS from '../../../assets';
import { RootState } from '../../../Store';
import { setItem } from '../../../Store/AreaItem';
import { CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT, TYPE } from '../../../Interface/constant';
import { useNavigate } from 'react-router-dom';
import { ROUTES_CONFIG } from '../../../Shared/Constants';

export default function ItemsSelector() {
  const items = useSelector((state: RootState) => state?.areaItem?.item);
 
  const dispatch = useDispatch();
  const [object, setObject] = useState(items);
  const navigate =useNavigate()
  const [debouncedValue, setDebouncedValue] = useState(object);
  // click
  // onchange dispatch the input 
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if(e.target.value.trim())
    navigate(ROUTES_CONFIG.HOMEPAGE.path)
    setObject(e.target.value);
  }
  // Hooks
  // for debouncing 
  useEffect(()=>{
    
    setObject(items)
  },[items])
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(object);
    }, 1000); 

    return () => {
      clearTimeout(timer); 
    };
  }, [object]);

  useEffect(() => {
    if (debouncedValue === '' || debouncedValue === null) {
      dispatch(setItem(""));
    } else {
      dispatch(setItem(debouncedValue));
    }
  }, [debouncedValue, dispatch]);

  return (
    <div className={CLASSNAME.WRAPPER}>
      {/* input field */}
      <input
        type={TYPE.TEXT}
        className={CLASSNAME.INPUT}
        placeholder={TEXT.PLACEHOLDER}
        value={object}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      {/* search button */}
      <button
        className={CLASSNAME.SEARCH}
        disabled ={items===""}
        onClick={() => {
          dispatch(setItem(object));
        }}
      >
        <img
          className={CLASSNAME.SEARCH_ICON}
          src={ICONS.searchIconWhite}
          alt={COMMON_TEXT.IMG}
        />
      </button>
    </div>
  );
}
