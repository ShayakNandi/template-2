'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ImageSlider.module.css';

interface ImageSliderProps {
  images: string[];
  autoPlayInterval?: number;
}

const ImageSlider = ({ images, autoPlayInterval = 3000 }: ImageSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;

  useEffect(() => {
    const autoPlayTimer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(autoPlayTimer);
  }, [autoPlayInterval]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          >
            <div className={styles.imageContainer}>
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                sizes="100%"
                priority={index === 0}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <button className={`${styles.sliderBtn} ${styles.prevBtn}`} onClick={prevSlide}>
        &lt;
      </button>
      
      <button className={`${styles.sliderBtn} ${styles.nextBtn}`} onClick={nextSlide}>
        &gt;
      </button>
      
      <div className={styles.indicators}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider; 