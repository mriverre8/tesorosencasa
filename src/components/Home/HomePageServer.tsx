import React from 'react';
import { serverApi } from '@/lib/api';
import HomePageClient from './HomePageClient';

const HomePageServer = async () => {
  try {
    const [initialProducts, filtersData, streamData] = await Promise.all([
      serverApi.getProducts(1, 10),
      serverApi.getFilters(),
      serverApi.getStream(),
    ]);

    return (
      <HomePageClient
        initialData={{
          tesoros: initialProducts.data,
          total: initialProducts.total,
          totalPages: initialProducts.totalPages,
          filtersData,
          streamData,
        }}
      />
    );
  } catch (error) {
    console.error('Error fetching initial data:', error);

    return (
      <HomePageClient
        initialData={{
          tesoros: [],
          total: 0,
          totalPages: 0,
          filtersData: {},
          streamData: null,
        }}
      />
    );
  }
};

export default HomePageServer;
