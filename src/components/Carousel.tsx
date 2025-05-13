'use client';

import React from 'react';
import { Tesoro } from '@/types/tesoro';
import Image from 'next/image';
import { useState } from 'react';

interface CarouselProps {
  tesoro: Tesoro;
}

const Carousel = ({ tesoro }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHorizontalScroll, setIsHorizontalScroll] = useState(false);

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex < tesoro.images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    setIsTransitioning(false);
    setDragStartX(e.touches[0].clientX);
    setDragStartY(e.touches[0].clientY);
    setIsHorizontalScroll(false); // Inicialmente asumimos que no es scroll horizontal
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;

    const deltaX = e.touches[0].clientX - dragStartX;
    const deltaY = e.touches[0].clientY - dragStartY;

    if (!isHorizontalScroll) {
      // Determinar si el movimiento es más horizontal que vertical
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        setIsHorizontalScroll(true);
        document.body.style.overflow = 'hidden'; // Bloquear scroll vertical
      } else {
        return; // Si es más vertical, salir sin modificar offsetX
      }
    }

    if (
      (currentIndex === 0 && deltaX > 0) ||
      (currentIndex === tesoro.images.length - 1 && deltaX < 0)
    ) {
      setOffsetX(0); // Evitar moverse fuera de los límites
    } else {
      setOffsetX(deltaX);
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
    setIsTransitioning(true);

    if (isHorizontalScroll) {
      if (offsetX < -50 && currentIndex < tesoro.images.length - 1) {
        nextSlide();
      } else if (offsetX > 50 && currentIndex > 0) {
        prevSlide();
      }
    }

    setOffsetX(0);
    document.body.style.overflow = ''; // Restaurar scroll vertical
  };

  return (
    <div
      className="w-full max-w-lg mx-auto overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`flex ${isTransitioning ? 'transition-transform ease-in-out duration-300' : ''}`}
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${offsetX}px))`,
        }}
      >
        {tesoro.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={tesoro.name}
            width={3024}
            height={4032}
            className="rounded-sm object-cover"
            priority={false}
            loading="lazy"
          />
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
};

export default Carousel;
