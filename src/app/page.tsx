import React from 'react';

// Components
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

import Layout from '@/components/Layout';

import HomePage from '@/views/Home/HomePage';

// Actions
import { createClient } from '@/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Topbar isAdminLogged={user != null} />
      <main>
        <Layout>
          <div className="flex flex-col mt-[69px] ">
            <HomePage />
          </div>
        </Layout>
      </main>
      <Footer />
    </div>
  );
}
