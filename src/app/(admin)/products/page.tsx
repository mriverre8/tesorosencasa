import React from 'react';

// Components
import DashboardProductsPage from '@/components/Admin/DashboardProductsPage/DashboardProductsPage';

// Actions
import { getAllProducts } from '@/actions/getAllProducts';

export default async function Products() {
  const tesorosData = await getAllProducts();

  return (
    <div className="bg-background">
      <main>
        <DashboardProductsPage tesorosData={tesorosData.data} />
      </main>
    </div>
  );
}
