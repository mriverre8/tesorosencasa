import React from 'react';
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

const Card = ({ tesoro }: Props) => {
  const router = useRouter();

  return (
    <div
      className="group relative flex flex-col justify-between bg-white rounded-md overflow-hidden cursor-pointer"
      onClick={() => router.push(`/tesoro/${tesoro.id}`)}
    >
      <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden flex items-center justify-center bg-black">
        <CldImage
          width="600"
          height="600"
          src={tesoro.images[0]}
          sizes="100vw"
          alt={tesoro.name}
          className="object-cover w-full h-full"
          gravity="auto"
          crop="fill"
          loading="lazy"
          quality="auto"
          format="auto"
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
};

export default Card;
