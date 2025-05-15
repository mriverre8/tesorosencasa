'use client';

import React from 'react';
import { tesoros } from '@prisma/client';

const ProductCard = (tesoro: tesoros) => {
  return (
    <div className="flex bg-white border border-primary rounded-lg py-4 px-3 justify-between">
      <div className="flex flex-col">
        <p className="text-sm">{tesoro.name}</p>
      </div>

      <button className="text-sm text-green-600">Ver</button>
    </div>
  );
};

export default ProductCard;
