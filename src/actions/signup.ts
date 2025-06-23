'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/supabase/server';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    console.error('[SIGNUP ERROR]', {
      message: authError?.message,
      email,
      timestamp: new Date().toISOString(),
    });
    throw new Error('SIGNUP_GENERIC_ERROR');
  }

  const username = email.split('@')[0];

  const { error: insertError } = await supabase.from('users').insert([
    {
      id: authData.user.id,
      username,
      email,
    },
  ]);

  if (insertError) {
    console.error('[SIGNUP ERROR] Error inserting user in database:', {
      message: insertError.message,
      email,
      userId: authData.user.id,
      timestamp: new Date().toISOString(),
    });
    throw new Error('SIGNUP_GENERIC_ERROR');
  }

  console.log('[SIGNUP] Signup successful', {
    userId: authData.user.id,
    email,
    timestamp: new Date().toISOString(),
  });

  redirect('/register/nextsteps');
}
