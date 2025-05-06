import './modal.css';
import { useEffect, useRef } from 'react';
import { CLASSNAME, ModalProps, TEXT } from './constant';
import { TYPE } from '../../../Helper/constant';

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
            title={TEXT.YES}
            onClick={handleYes}
            className={CLASSNAME.YES}
          >
            {TEXT.YES}
          </button>
          <button
            type={TYPE.BUTTON}
            title={TEXT.NO}
            onClick={handleNo}
            className={CLASSNAME.NO}
          >
            {TEXT.NO}
          </button>
        </div>
      </div>
    </div>
  );
}
