import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import './imageDetailImageTransition.css';
import { ImageSectionProps } from './constant';

function ImageSection({ images }: ImageSectionProps) {
  const imageArray: string[] = images
    ? Array.isArray(images)
      ? images
      : [images]
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageArray.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="imageDetailimageSection">
      {imageArray.map((image, index) => (
        <div
          key={`LoginImage${index + 1}`}
          className={`imageDetailSlide ${
            index === currentIndex ? 'imageDetailActive' : ''
          }`}
        >
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${image}`}
            alt={`Slide ${index + 1}`}
            className="ActiveImages"
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
        {imageArray.map((image, index) => (
          <button
            type="button"
            key={`loginDots${index + 1}`}
            className={`imageDetailDot ${
              currentIndex === index ? 'imageDetailActive' : ''
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <img src={`${import.meta.env.VITE_BASE_URL}/${image}`} alt="img" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImageSection;
