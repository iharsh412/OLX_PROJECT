import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import './productDetailImageTransition.css';
import { CLASSNAME } from './constant';
import { COMMON_TEXT } from '../../../Helper/constant';
import { ProductDetailProps } from '../../../Helper/interface';

function ProductDetailImageTransition({
  photos,
}: Readonly<ProductDetailProps>) {
  console.log(photos, 'photos');
  let imageArray: string[] = [];
  if (photos) {
    imageArray = Array.isArray(photos) ? photos : [photos];
  }
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
    <div className={CLASSNAME.IMAGE_SECTION}>
      {imageArray.map((image, index) => (
        <div
          key={image}
          className={`${CLASSNAME.IMAGE_SLIDE} ${
            index === currentIndex ? CLASSNAME.ACTIVE : ''
          }`}
        >
          <img
            src={`${image}`}
            alt={COMMON_TEXT.IMG}
            className={CLASSNAME.ACTIVE_IMAGES}
          />
        </div>
      ))}

      <button
        type="button"
        className={`${CLASSNAME.BUTTON} ${CLASSNAME.PREV}`}
        onClick={prevSlide}
      >
        <ChevronLeft size={30} />
      </button>
      <button
        type="button"
        className={`${CLASSNAME.BUTTON} ${CLASSNAME.NEXT}`}
        onClick={nextSlide}
      >
        <ChevronRight size={30} />
      </button>

      <div className={CLASSNAME.DOTS_CONTAINER}>
        {imageArray.map((image, index) => (
          <button
            type="button"
            key={`loginDots${index + 1}`}
            className={`${CLASSNAME.DOTS} ${
              currentIndex === index ? CLASSNAME.ACTIVE_DOTS : ''
            }`}
            onClick={() => goToSlide(index)}
          >
            <img src={`${image}`} alt={COMMON_TEXT.IMG} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductDetailImageTransition;
