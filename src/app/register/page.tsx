import React from 'react';
import Layout from '@/components/Layout';
import Register from '@/views/User/Register';

export default function RegisterPage() {
  return (
    <main>
      <div className="bg-background min-h-screen">
        <Layout>
          <div className="flex ">
            <Register />
          </div>
        </Layout>
      </div>
    </main>
  );
}
