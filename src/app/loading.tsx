import React from 'react';
import Topbar from '@/components/common/Topbar';
import Footer from '@/components/common/Footer';
import Layout from '@/components/common/Layout';
import HomePageSkeleton from '@/components/Home/HomePageSkeleton';

export default function Loading() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Topbar isAdminLogged={false} />
      <main>
        <Layout>
          <div className="flex flex-col mt-[69px]">
            <HomePageSkeleton />
          </div>
        </Layout>
      </main>
      <Footer />
    </div>
  );
}
