import React from 'react';
import Layout from '@/components/Layout';
import Login from '@/views/User/Login';

export default function LoginPage() {
  return (
    <main>
      <div className="bg-background min-h-screen">
        <Layout>
          <div className="flex ">
            <Login />
          </div>
        </Layout>
      </div>
    </main>
  );
}
