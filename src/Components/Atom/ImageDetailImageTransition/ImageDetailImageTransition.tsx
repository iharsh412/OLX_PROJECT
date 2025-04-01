import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import './imageDetailImageTransition.css';
import ICONS from '../../../assets';

const images = [ICONS.watch, ICONS.watch, ICONS.watch, ICONS.watch];

function ImageSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="imageDetailimageSection">
      {images.map((image, index) => (
        <div
          key={`LoginImage${index + 1}`}
          className={`imageDetailSlide ${
            index === currentIndex ? 'imageDetailActive' : ''
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="ActiveImages"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }} // Makes the image scale properly
          />
        </div>
      ))}

      <button
        type="button"
        className="imageDetailLogin_slide_button imageDetailLogin_slide_prev"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        type="button"
        className="imageDetailLogin_slide_button imageDetailLogin_slide_next"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <ChevronRight size={30} />
      </button>

      <div className="imageDeatilLogin_dots_container">
        {images.map((image, index) => (
          <button
            type="button"
            key={`loginDots${index + 1}`}
            className={`imageDetailDot ${
              currentIndex === index ? 'imageDetailActive' : ''
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <img src={image} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImageSection;
