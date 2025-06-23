import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { tesoros } from '@prisma/client';

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
            <Image
              src={tesoro.images[current - 2]}
              alt={tesoro.name}
              width={200}
              height={300}
              className="object-contain"
            />
          )}
        </div>
        <div
          className={`w-[20%] aspect-[3/4] rounded overflow-hidden ${current > 0 ? 'bg-black' : ''} flex items-center justify-center hover:scale-105 transition-transform`}
        >
          {current > 0 && (
            <Image
              src={tesoro.images[current - 1]}
              alt={tesoro.name}
              width={200}
              height={300}
              className="object-contain hover:cursor-pointer"
              onClick={prevImage}
            />
          )}
        </div>

        {/* Imagen actual */}
        <div className="flex items-center justify-center aspect-[3/4] rounded overflow-hidden bg-black">
          <Image
            src={tesoro.images[current]}
            alt={tesoro.name}
            width={600}
            height={600}
            className="object-contain hidden lg:block"
          />
          <Image
            src={tesoro.images[current]}
            alt={tesoro.name}
            width={400}
            height={600}
            className="object-contain block lg:hidden"
          />
        </div>

        {/* Imagen siguiente */}
        <div
          className={`w-[20%] aspect-[3/4] rounded overflow-hidden ${current < tesoro.images.length - 1 ? 'bg-black' : ''} flex items-center justify-center hover:scale-105 transition-transform`}
        >
          {current < tesoro.images.length - 1 && (
            <Image
              src={tesoro.images[current + 1]}
              alt={tesoro.name}
              width={200}
              height={300}
              className="object-contain hover:cursor-pointer"
              onClick={nextImage}
            />
          )}
        </div>
        <div
          className={`hidden lg:block w-[20%] aspect-[3/4] rounded overflow-hidden ${current + 1 < tesoro.images.length - 1 ? 'bg-black' : ''} flex items-center justify-center`}
        >
          {current + 1 < tesoro.images.length - 1 && (
            <Image
              src={tesoro.images[current + 2]}
              alt={tesoro.name}
              width={200}
              height={300}
              className="object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}
