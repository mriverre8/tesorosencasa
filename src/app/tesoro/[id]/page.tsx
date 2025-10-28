import React from 'react';

// Components
import Layout from '@/components/common/Layout';
import ProductPage from '@/components/Product/ProductPage';
import Topbar from '@/components/common/Topbar';
import Footer from '@/components/common/Footer';

// Supabase
import { createClient } from '@/utils/supabase/server';

// Actions
import { getProductById } from '@/actions/getProductById';

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const productResponse = await getProductById(id);

  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Topbar isUserLoggedIn={user != null} />
      <main>
        <div className="mt-[90px]">
          <Layout>
            <ProductPage product={productResponse} />
          </Layout>
        </div>
      </main>
      <Footer />
    </div>
  );
}
