import React from 'react';
import { redirect } from 'next/navigation';

// Components
import TopbarAdmin from '@/components/TopbarAdmin';

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
      <div className="mt-[69px]">{children}</div>
    </>
  );
}
