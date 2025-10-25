import React from 'react';
import Topbar from '@/components/common/Topbar';
import Footer from '@/components/common/Footer';
import Layout from '@/components/common/Layout';
import ProductPageSkeleton from '@/components/Product/ProductPageSkeleton';

export default function Loading() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Topbar isAdminLogged={false} />
      <main>
        <div className="mt-[90px]">
          <Layout>
            <ProductPageSkeleton />
          </Layout>
        </div>
      </main>
      <Footer />
    </div>
  );
}
