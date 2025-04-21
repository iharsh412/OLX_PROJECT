import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import './loginImage.css';
import {IMAGES,QUOTES} from './constant';



function ImageSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function prevSlide() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? IMAGES.length - 1 : prevIndex - 1
    );
  }
  function nextSlide() {
    setCurrentIndex((prevIndex) =>
      prevIndex === IMAGES.length - 1 ? 0 : prevIndex + 1
    );
  }
  function goToSlide(index: number) {
    setCurrentIndex(index);
  }

  return (
    <div className="imageSection">
      {IMAGES.map((image, index) => (
        <div
          key={`LoginImage${index + 1}`}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
        >
          <img src={image} alt="Image1" />
          <span>{QUOTES[index]}</span>
        </div>
      ))}

      <button
        title="loginSlideButton"
        type="button"
        className="login_slide_button login_slide_prev"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        title="loginSlideButton"
        type="button"
        className="login_slide_button login_slide_next"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>
      <div className="login_dots_container">
        {IMAGES.map((_, index) => (
          <button
            title="loginDots"
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
