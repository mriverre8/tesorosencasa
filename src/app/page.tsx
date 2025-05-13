import React from 'react';
import Layout from '@/components/Layout';
import HomePage from '@/views/Home/HomePage';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';
import Alert from '@/components/Alert';

/* import { createClient } from '@/supabase/server'; */
import { getFilters } from '@/actions/getFilters';

export default async function Home() {
  /* const supabase = await createClient(); */

  /*  const {
    data: { user },
  } = await supabase.auth.getUser(); */

  const filtersData = await getFilters();
  console.log('Filters:', filtersData);

  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Topbar /* user={user} */ />
      <main>
        <Layout>
          <div className="flex flex-col mt-[90px] ">
            <Alert
              type={1}
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
