import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store';
import { setLanguage } from '../../../Store/Language';
import './languageSelector.css';
import ICONS from '../../../assets';
import { CLASSNAME, TEXT } from './constant';
import { COMMON_TEXT } from '../../../Interface/constant';

export default function LanguageSelector() {
  const language = useSelector((state: RootState) => state?.language?.language);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  //  HANDLE CLICK

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setLanguageDropdown(false);
  };
  function toggleLanguageDropdown() {
    setLanguageDropdown(!languageDropdown);
  }
  // HOOKS
  useEffect(() => {
    dispatch(setLanguage(selectedLanguage));
  }, [selectedLanguage, dispatch]);

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
    <div className={CLASSNAME.WRAPPER} ref={dropdownRef}>
      <span className={CLASSNAME.LANGUAGE}>{selectedLanguage}</span>
      <div
        className={CLASSNAME.DROPDOWN}
        role="button"
        onClick={toggleLanguageDropdown}
      >
        <img
          src={ICONS.upDown}
          alt={COMMON_TEXT.IMG}
          className={`${CLASSNAME.UPDOWN_IMG} ${
            languageDropdown ? CLASSNAME.ROTATE : CLASSNAME.NOTROTATE
          }`}
        />
      </div>
      {languageDropdown && (
        <div className={CLASSNAME.LIST}>
          <div
            className={CLASSNAME.ITEMS}
            onClick={() => handleLanguageChange(TEXT.ENGLISH)}
          >
            {TEXT.ENGLISH}
          </div>
          <div
            className={CLASSNAME.ITEMS}
            onClick={() => handleLanguageChange(TEXT.HINDI)}
          >
            {TEXT.HINDI}
          </div>
        </div>
      )}
    </div>
  );
}
