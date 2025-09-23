import React from 'react';

// Components
import Layout from '@/components/Layout';
import Login from '@/views/User/Login';

export default function LoginPage() {
  return (
    <main>
      <div className="bg-background min-h-screen">
        <Layout>
          <div className="flex justify-center ">
            <Login />
          </div>
        </Layout>
      </div>
    </main>
  );
}
