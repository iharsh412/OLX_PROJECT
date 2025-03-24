import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import './loginImage.css';
import ICONS from '../../../assets';

const images = [ICONS.google, ICONS.phone, ICONS.google, ICONS.phone];
const quotes = [
  'hello jrg grgr eg eb iejrg ojeroej eroer nroer oeroer enroenrto eorno',
  'harsh',
  'bhandari',
  'chcicmic',
];

function ImageSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function prevSlide() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }
  function nextSlide() {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }
  function goToSlide(index: number) {
    setCurrentIndex(index);
  }

  return (
    <div className="imageSection">
      {images.map((image, index) => (
        <div
          // eslint-disable-next-line no-plusplus
          key={`LoginImage${index + 1}`}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
        >
          <img src={image} alt="Image1" />
          <span>{quotes[index]}</span>
        </div>
      ))}

      <button
        type="button"
        className="login_slide_button login_slide_prev"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        type="button"
        className="login_slide_button login_slide_next"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>
      <div className="login_dots_container">
        {images.map((_, index) => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            type="button"
            key={`loginDots${index + 1}`}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => {
              goToSlide(index);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSection;
