'use client';

import Layout from '@/components/Layout';
import Register from '@/pages/User/Register';

export default function RegisterPage() {
  return (
    <main>
      <Layout>
        <div className=" mt-[17vh] flex justify-center ">
          <Register />
        </div>
      </Layout>
    </main>
  );
}
