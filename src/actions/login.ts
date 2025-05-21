'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error('[LOGIN ERROR]', {
      code: error.code,
      message: error.message,
      stack: error.stack,
    });
    /* return { error: error.code }; */
  }

  console.log('[LOGIN SUCCESS]', {
    email: data.email,
    timestamp: new Date().toISOString(),
  });

  /* revalidatePath('/', 'layout');
  redirect('/'); */

  revalidatePath('/', 'layout');
  redirect('/admin/dashboard/createproduct');
}
