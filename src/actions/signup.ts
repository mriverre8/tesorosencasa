'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/supabase/server';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    redirect('/error');
  }

  const username = email.split('@')[0];

  // Insertar el nuevo usuario en la tabla Users
  const { error: insertError } = await supabase.from('users').insert([
    {
      id: authData.user.id, // usar el ID del usuario de Supabase Auth
      username,
      email,
    },
  ]);

  if (insertError) {
    console.error('Error inserting user data:', insertError);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}
