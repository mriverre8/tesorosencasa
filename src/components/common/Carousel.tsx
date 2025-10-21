'use client';

import React, { useState, useCallback } from 'react';
import { CldImage } from 'next-cloudinary';

// Types
import { tesoros } from '@prisma/client';

// Icons
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

interface Props {
  tesoro: tesoros;
}

const Carousel = React.memo(({ tesoro }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev < tesoro.images.length - 1 ? prev + 1 : prev
    );
  }, [tesoro.images.length]);

  return (
    <div className="w-full max-w-lg mx-auto relative overflow-hidden">
      {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 hover:bg-background text-black p-1 rounded-full shadow z-10 "
        >
          <IoIosArrowBack className="" />
        </button>
      )}
      {currentIndex < tesoro.images.length - 1 && (
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 hover:bg-background text-black p-1 rounded-full shadow z-10 "
        >
          <IoIosArrowForward />
        </button>
      )}
      <div
        className="flex transition-transform ease-in-out duration-300"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {tesoro.images.map((image, index) => (
          <div
            key={index}
            className="aspect-[3/4] w-full shrink-0 rounded-sm overflow-hidden flex items-center justify-center bg-black"
          >
            <CldImage
              width="600"
              height="600"
              src={image}
              sizes="100vw"
              alt={tesoro.name}
            />
          </div>
        ))}
      </div>

      <div className="flex space-x-1.5 mt-1.5 justify-center">
        {tesoro.images.map((_, idx) => (
          <div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full ${currentIndex === idx ? 'bg-primary' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
});

Carousel.displayName = 'Carousel';

export default Carousel;
