import './modal.css';
import { CLASSNAME, ModalProps, TEXT } from './constant';
import { useEffect, useRef } from 'react';

const Modal: React.FC<ModalProps> = ({
  setAnswer,
  setOpen,
  text,
  setDropdown,

}) => {
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

  return (
    <div className={CLASSNAME.WRAPPER}>
      <div className={CLASSNAME.CONTENT} ref={dropdownRef}>
        <span className={CLASSNAME.TEXT}>{text}</span>
        <div className={CLASSNAME.BUTTON}>
          <button
            title={TEXT.YES}
            onClick={handleYes}
            className={CLASSNAME.YES}
          >
            {TEXT.YES}
          </button>
          <button title={TEXT.NO} onClick={handleNo} className={CLASSNAME.NO}>
            {TEXT.NO}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
