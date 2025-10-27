export const dynamic = 'force-dynamic';

import React from 'react';

// Components
import Topbar from '@/components/common/Topbar';
import Footer from '@/components/common/Footer';
import Layout from '@/components/common/Layout';
import HomePage from '@/components/Home/HomePage';

// Actions
import { createClient } from '@/utils/supabase/server';
import { getAllProducts } from '@/actions/getAllProducts';
import { getStream } from '@/actions/getStream';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [productsResponse, streamResponse] = await Promise.all([
    getAllProducts(),
    getStream(),
  ]);

  const initialData = {
    products: productsResponse.data ?? [],
    stream: streamResponse,
    total: productsResponse.total ?? 0,
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Topbar isAdminLogged={user != null} />
      <main>
        <Layout>
          <div className="flex flex-col mt-[69px] ">
            <HomePage initialData={initialData} />
          </div>
        </Layout>
      </main>
      <Footer />
    </div>
  );
}
