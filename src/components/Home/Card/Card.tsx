import React, { memo, useCallback } from 'react';
import { CldImage } from 'next-cloudinary';

// Types
import { tesoros } from '@prisma/client';

// Hooks
import { useRouter } from 'next/navigation';

// Icons
import { IoImages } from 'react-icons/io5';

interface Props {
  tesoro: tesoros;
}

const Card = memo(({ tesoro }: Props) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/tesoro/${tesoro.id}`);
  }, [router, tesoro.id]);

  return (
    <div
      className="group relative flex flex-col justify-between bg-white rounded-md overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden flex items-center justify-center bg-black">
        <CldImage
          width="400"
          height="533"
          src={tesoro.images[0]}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          alt={tesoro.name}
          className="object-cover w-full h-full"
          loading="lazy"
          quality="auto"
          format="auto"
          crop="fill"
          gravity="center"
        />
        {tesoro.images.length > 1 && (
          <div className="absolute top-2 right-2 text-white">
            <IoImages className="text-lg" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full bg-white/90 px-3 py-2 opacity-0 translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
          <h3 className="text-sm line-clamp-1">{tesoro.name}</h3>
        </div>
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
