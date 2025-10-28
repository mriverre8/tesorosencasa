export const dynamic = 'force-dynamic';

import React from 'react';

// Components
import DashboardProductsPage from '@/components/Admin/DashboardProductsPage/DashboardProductsPage';

// Actions
import { getAllProducts } from '@/actions/getAllProducts';

export default async function Products() {
  const productsResponse = await getAllProducts();

  return (
    <main>
      <DashboardProductsPage
        tesorosData={productsResponse.data ? productsResponse.data : []}
      />
    </main>
  );
}
