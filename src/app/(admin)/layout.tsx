import React from 'react';
import { getUserById } from '@/actions/getUserById';
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

  const userData = user ? await getUserById(user.id) : null;

  if (userData?.role !== 'ADMIN') {
    redirect('/login');
  }

  return (
    <>
      <TopbarAdmin />
      <div className="mt-[69px]">{children}</div>
    </>
  );
}
