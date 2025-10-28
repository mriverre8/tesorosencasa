import React from 'react';
import { redirect } from 'next/navigation';

// Components
import Topbar from '@/components/common/Topbar';

// Supabase
import { createClient } from '@/utils/supabase/server';

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
      <Topbar isUserLoggedIn={true} />
      <div className="mt-[69px] bg-background">{children}</div>
    </>
  );
}
