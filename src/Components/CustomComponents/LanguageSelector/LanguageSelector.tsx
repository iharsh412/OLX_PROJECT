import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store';
import { setLanguage } from '../../../Store/Language';
import './languageSelector.css';
import ICONS from '../../../assets';
import { CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT, TYPE } from '../../../Interface/constant';

export default function LanguageSelector() {
  const language = useSelector((state: RootState) => state?.language?.language);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  //  HANDLE CLICK
  //  to handle what we selected
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setLanguageDropdown(false);
  };
  // toggle the dropdown if selscted
  function toggleLanguageDropdown() {
    setLanguageDropdown(!languageDropdown);
  }
  // HOOKS
  // dispatch the value to the store
  useEffect(() => {
    dispatch(setLanguage(selectedLanguage));
  }, [selectedLanguage, dispatch]);
  //  close if click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLanguageDropdown(false);
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
      onClick={toggleLanguageDropdown}
      ref={dropdownRef}
    >
      {/* selected language */}
      <span className={CLASSNAME.LANGUAGE}>{selectedLanguage}</span>
      {/* updown icon */}
      <button
        type={TYPE.BUTTON}
        className={CLASSNAME.DROPDOWN}
      >
        <img
          src={ICONS.upDown}
          alt={COMMON_TEXT.IMG}
          className={`${CLASSNAME.UPDOWN_IMG} ${
            languageDropdown ? CLASSNAME.ROTATE : CLASSNAME.NOTROTATE
          }`}
        />
      </button>
      {/* language dropdown */}
      {languageDropdown && (
        <div className={CLASSNAME.LIST}>
          <button
            className={CLASSNAME.ITEMS}
            onClick={() => handleLanguageChange(TEXT.ENGLISH)}
          >
            {TEXT.ENGLISH}
          </button>
          <hr />
          <button
            className={CLASSNAME.ITEMS}
            onClick={() => handleLanguageChange(TEXT.HINDI)}
          >
            {TEXT.HINDI}
          </button>
        </div>
      )}
    </div>
  );
}
