import React from 'react';
import TopbarAdmin from '@/components/TopbarAdmin';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';

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
