import Header from '@/components/Header';
import { Tesoro } from '@/types/tesoro';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from '@/components/Carousel';

interface ProductProps {
  tesoro: Tesoro;
}

const ProductHeader = ({ tesoro }: ProductProps) => {
  return (
    <Header>
      <div className="flex flex-col w-full py-12 px-5 sm:pt-20 sm:pb-12">
        <div className="w-full max-w-4xl mx-auto mb-5 border-b">
          <Link href="/" className="hover:text-yellow-400">
            Volver
          </Link>
        </div>

        <div className="hidden sm:block">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto ">
            {tesoro.images.map((imagen, index) => (
              <Image
                width={400}
                height={400}
                key={index}
                src={imagen}
                alt={`Imagen ${index + 1} de ${tesoro.name}`}
                className="w-full h-40 object-cover rounded-lg aspect-square"
              />
            ))}
          </div>
        </div>
        <div className="block sm:hidden">
          <Carousel tesoro={tesoro} />
        </div>
      </div>
    </Header>
  );
};

export default ProductHeader;
