import React from 'react';
import { redirect } from 'next/navigation';

// Components
import TopbarAdmin from '@/components/common/TopbarAdmin';

// Supabase
import { createClient } from '@/supabase/server';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user == null) {
    redirect('/login');
  }

  return (
    <>
      <TopbarAdmin />
      <div className="md:mt-0 mt-[69px] md:ml-[256px]">{children}</div>
    </>
  );
}
