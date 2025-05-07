import './modal.css';
import { useEffect, useRef } from 'react';
import { CLASSNAME } from './constant';
import { TYPE, COMMON_TEXT } from '../../../Helper/constant';
import { ModalProps } from '../../../Helper/interface';

export default function Modal({
  setAnswer,
  setOpen,
  text,
  setDropdown,
}: Readonly<ModalProps>) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleYes = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
    setAnswer('yes');
  };
  const handleNo = () => {
    setOpen(false);
    setAnswer('no');
    setDropdown?.(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen?.(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={CLASSNAME.WRAPPER}>
      <div className={CLASSNAME.CONTENT} ref={dropdownRef}>
        <span className={CLASSNAME.TEXT}>{text}</span>
        <div className={CLASSNAME.BUTTON}>
          <button
            type={TYPE.BUTTON}
            title={COMMON_TEXT.YES}
            onClick={handleYes}
            className={CLASSNAME.YES}
          >
            {COMMON_TEXT.YES}
          </button>
          <button
            type={TYPE.BUTTON}
            title={COMMON_TEXT.NO}
            onClick={handleNo}
            className={CLASSNAME.NO}
          >
            {COMMON_TEXT.NO}
          </button>
        </div>
      </div>
    </div>
  );
}
