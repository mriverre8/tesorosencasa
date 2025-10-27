'use server';

import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

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
    throw new Error('LOGIN_GENERIC_ERROR');
  }

  console.log('[LOGIN SUCCESS]', {
    email: data.email,
    timestamp: new Date().toISOString(),
  });
}
