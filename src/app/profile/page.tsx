import React from 'react';
import Layout from '@/components/Layout';
import { createClient } from '@/utils/supabase/server';
import ProfilePage from '@/pages/Profile/ProfilePage';
import Alert from '@/components/Alert';

export default async function Profile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <Layout>
      <div className="flex flex-col mt-[90px] ">
        <Alert
          type={1}
          text={
            'Algunas de las funcionalidades de la cuenta están en desarrollo. ej: reservas'
          }
        />
        <ProfilePage user={user} />
      </div>
    </Layout>
  );
}
