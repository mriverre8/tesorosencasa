import React from 'react';

// Components
import DashboardProductsPage from '@/components/Admin/DashboardProductsPage/DashboardProductsPage';

// Actions

export default async function Products() {
  return (
    <div className="bg-background">
      <main>
        <DashboardProductsPage />
      </main>
    </div>
  );
}
