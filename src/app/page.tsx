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
import { getAlert } from '@/actions/getAlert';
import { createClient } from '@/supabase/server';
import { getUserById } from '@/actions/getUserById';

export default async function Home() {
  const alert = await getAlert('HOME');
  const tesorosData = await getProducts();
  const filtersData = await getFilters();

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
        <Layout>
          <div className="flex flex-col mt-[90px] ">
            {alert.visible && <Alert type={alert.type} text={alert.text} />}
            <HomePage filtersData={filtersData} tesorosData={tesorosData} />
          </div>
        </Layout>
      </main>
      <Footer />
    </div>
  );
}
