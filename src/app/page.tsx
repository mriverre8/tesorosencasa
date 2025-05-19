import React from 'react';

// Components
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

import Layout from '@/components/Layout';
import Alert from '@/components/Alert';

import HomePage from '@/views/Home/HomePage';

// Actions
import { getFilters } from '@/actions/getFilters';
import { getProducts } from '@/actions/getProducts';

export default async function Home() {
  const tesorosData = await getProducts();
  const filtersData = await getFilters();

  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Topbar />
      <main>
        <Layout>
          <div className="flex flex-col mt-[90px] ">
            <Alert
              type={1}
              text={'El tablón de anuncios estará disponible proximamente.'}
            />
            <HomePage filtersData={filtersData} tesorosData={tesorosData} />
          </div>
        </Layout>
      </main>
      <Footer />
    </div>
  );
}
