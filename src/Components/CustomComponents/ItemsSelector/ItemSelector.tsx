import './itemSelector.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { RootState } from '../../../Store';
import { setItem } from '../../../Store/AreaItem';
import { CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT } from '../../../Helper/constant';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import ICONS from '../../../assets';

export default function ItemsSelector() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state?.areaItem?.item);
  const [localValue, setLocalValue] = useState(items);
  const [debouncedValue, setDebouncedValue] = useState(items);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(localValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [localValue]);

  useEffect(() => {
    setLocalValue(items);
  }, [items]);
  useEffect(() => {
    dispatch(setItem(debouncedValue ?? ''));
  }, [debouncedValue, dispatch]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      setLocalValue(value);
      if (value) navigate(ROUTES_CONFIG.HOMEPAGE.path);
    },
    [navigate]
  );

  const handleClear = useCallback(() => {
    setLocalValue('');
    dispatch(setItem(''));
  }, [dispatch]);

  return (
    <div className={CLASSNAME.WRAPPER}>
      <input
        type="text"
        className={CLASSNAME.INPUT}
        placeholder={TEXT.PLACEHOLDER}
        value={localValue ?? ''}
        onChange={handleChange}
        aria-label={TEXT.PLACEHOLDER}
      />

      <button
        type="button"
        className={CLASSNAME.SEARCH}
        onClick={handleClear}
        aria-label="Clear search"
      >
        <img
          className={CLASSNAME.SEARCH_ICON}
          src={ICONS.cross}
          alt={COMMON_TEXT.IMG}
        />
      </button>
    </div>
  );
}
