import React from 'react';
import Layout from '@/components/Layout';
import { createClient } from '@/utils/supabase/server';
import ProfilePage from '@/pages/Profile/ProfilePage';

export default async function Profile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <Layout>
      <div className="flex flex-col mt-[99px] ">
        <ProfilePage user={user} />
      </div>
    </Layout>
  );
}
