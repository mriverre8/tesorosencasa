import React, { Suspense } from 'react';

// Components
import Topbar from '@/components/common/Topbar';
import Footer from '@/components/common/Footer';
import Layout from '@/components/common/Layout';
import HomePageSkeleton from '@/components/Home/HomePageSkeleton';
import HomePageServer from '@/components/Home/HomePageServer';

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
            <Suspense fallback={<HomePageSkeleton />}>
              <HomePageServer />
            </Suspense>
          </div>
        </Layout>
      </main>
      <Footer />
    </div>
  );
}
