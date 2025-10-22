import React from 'react';

// Components
import DashboardProductsPage from '@/components/Admin/DashboardProductsPage/DashboardProductsPage';
import { getAllProducts } from '@/lib/api';

// Actions

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
