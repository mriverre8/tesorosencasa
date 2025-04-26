'use client';

import { Tesoro } from '@/types/tesoro';
import React from 'react';

const ProductCard = (tesoro: Tesoro) => {
  return (
    <div className="flex bg-white border border-yellow-400 rounded-lg py-4 px-3 justify-between">
      <div className="flex flex-col">
        <p className="text-sm">{tesoro.name}</p>
      </div>

      <button className="text-sm text-green-600">Ver</button>
    </div>
  );
};

export default ProductCard;
