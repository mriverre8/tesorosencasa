import React from 'react';

// Components
import Layout from '@/components/common/Layout';
import ProductPage from '@/components/Product/ProductPage';
import Topbar from '@/components/common/Topbar';
import Footer from '@/components/common/Footer';

// Supabase
import { createClient } from '@/supabase/server';

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

  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Topbar isAdminLogged={user != null} />
      <main>
        <div className="mt-[90px]">
          <Layout>
            <ProductPage id={id} />
          </Layout>
        </div>
      </main>
      <Footer />
    </div>
  );
}
