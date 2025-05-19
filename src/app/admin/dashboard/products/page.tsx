import React from 'react';
import { getProducts } from '@/actions/getProducts';
import DashboardProductsPage from '@/views/Admin/DashboardProductsPage/DashboardProductsPage';

export default async function Products() {
  const tesorosData = await getProducts();

  return (
    <div className="bg-background">
      <main>
        <DashboardProductsPage tesorosData={tesorosData} />
      </main>
    </div>
  );
}
