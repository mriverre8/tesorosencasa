import React from 'react';
import Layout from '@/components/Layout';
import { getProductById } from '@/actions/getProductById';
import ProductPage from '@/views/Product/ProductPage';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';
import { createClient } from '@/supabase/server';
import { getUserById } from '@/actions/getUserById';

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tesoroData = await getProductById(id);

  // Getting user data to see if user is loged in and has admin role
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userData = user ? await getUserById(user.id) : null;

  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Topbar isAdminLogged={userData?.role === 'ADMIN'} />
      <main>
        <div className="mt-[90px]">
          <Layout>
            <ProductPage productData={tesoroData} />
          </Layout>
        </div>
      </main>
      <Footer />
    </div>
  );
}
