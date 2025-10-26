import React from 'react';

// Components
import DashboardProductsPage from '@/components/Admin/DashboardProductsPage/DashboardProductsPage';

// Actions
import { getAllProducts } from '@/lib/api';

export default async function Products() {
  const productsResponse = await getAllProducts();

  return (
    <div className="bg-background">
      <main>
        <DashboardProductsPage tesorosData={productsResponse.data} />
      </main>
    </div>
  );
}
