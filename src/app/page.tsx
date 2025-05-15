import React from 'react';

import Layout from '@/components/Layout';

import HomePage from '@/views/Home/HomePage';
import Alert from '@/components/Alert';

import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

import { getFilters } from '@/actions/getFilters';

export default async function Home() {
  const filtersData = await getFilters();

  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Topbar />
      <main>
        <Layout>
          <div className="flex flex-col mt-[90px] ">
            <Alert
              text={'El tablón de anuncios estará disponible proximamente.'}
            />
            <HomePage filtersData={filtersData} />
          </div>
        </Layout>
      </main>
      <Footer />
    </div>
  );
}
