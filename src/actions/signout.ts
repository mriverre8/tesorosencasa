'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/supabase/server';

export async function signout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('[SIGNOUT ERROR]', {
      code: error.code,
      message: error.message,
      stack: error.stack,
    });
    /* redirect('/error'); */
    redirect('/dashboard/createproduct');
  }

  console.log('[SIGN OUT]', {
    message: 'User signed out',
    timestamp: new Date().toISOString(),
  });

  revalidatePath('/', 'layout');
  redirect('/login');
}
