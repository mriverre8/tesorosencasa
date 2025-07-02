import React from 'react';
import { useState } from 'react';
import { tesoros } from '@prisma/client';
import { CldImage } from 'next-cloudinary';

interface Props {
  tesoro: tesoros;
}

export default function CarouselHorizontal({ tesoro }: Props) {
  const [current, setCurrent] = useState(0);

  const prevImage = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const nextImage = () => {
    if (current < tesoro.images.length - 1) setCurrent(current + 1);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 select-none">
      <div className="flex items-center justify-center gap-4 max-w-[800px] w-full">
        {/* Imagen previa */}
        <div
          className={`hidden lg:block w-[20%] aspect-[3/4] rounded overflow-hidden ${current - 1 > 0 ? 'bg-black' : ''} flex items-center justify-center`}
        >
          {current - 1 > 0 && (
            <CldImage
              width="200"
              height="300"
              src={tesoro.images[current - 2]}
              sizes="100vw"
              alt={tesoro.name}
            />
          )}
        </div>
        <div
          className={`w-[20%] aspect-[3/4] rounded overflow-hidden ${current > 0 ? 'bg-black' : ''} flex items-center justify-center hover:scale-105 transition-transform`}
        >
          {current > 0 && (
            <CldImage
              width="200"
              height="300"
              src={tesoro.images[current - 1]}
              sizes="100vw"
              alt={tesoro.name}
              onClick={prevImage}
            />
          )}
        </div>

        {/* Imagen actual */}
        <div className="flex items-center justify-center aspect-[3/4] rounded overflow-hidden bg-black">
          <CldImage
            width="600"
            height="600"
            src={tesoro.images[current]}
            sizes="100vw"
            alt={tesoro.name}
            className="hidden lg:block"
          />
          <CldImage
            width="600"
            height="600"
            src={tesoro.images[current]}
            sizes="100vw"
            alt={tesoro.name}
            className="block lg:hidden"
          />
        </div>

        {/* Imagen siguiente */}
        <div
          className={`w-[20%] aspect-[3/4] rounded overflow-hidden ${current < tesoro.images.length - 1 ? 'bg-black' : ''} flex items-center justify-center hover:scale-105 transition-transform`}
        >
          {current < tesoro.images.length - 1 && (
            <CldImage
              width="200"
              height="300"
              src={tesoro.images[current + 1]}
              sizes="100vw"
              alt={tesoro.name}
              onClick={nextImage}
            />
          )}
        </div>
        <div
          className={`hidden lg:block w-[20%] aspect-[3/4] rounded overflow-hidden ${current + 1 < tesoro.images.length - 1 ? 'bg-black' : ''} flex items-center justify-center`}
        >
          {current + 1 < tesoro.images.length - 1 && (
            <CldImage
              width="200"
              height="300"
              src={tesoro.images[current + 2]}
              sizes="100vw"
              alt={tesoro.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}
