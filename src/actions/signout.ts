'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/supabase/server';

export async function signout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  console.log(error);
  if (error) {
    redirect('/error');
  }

  /* revalidatePath('/', 'layout');
  redirect('/'); */

  revalidatePath('/', 'layout');
  redirect('/login');
}
