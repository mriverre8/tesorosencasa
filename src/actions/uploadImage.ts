'use server';
import { createClient } from '@/supabase/server';
import { randomUUID } from 'crypto';

export async function uploadImage(image: File) {
  const supabase = await createClient();

  const path = `tesoros/${randomUUID()}`;

  const { error } = await supabase.storage
    .from('tesoros-bucket')
    .upload(path, image);

  if (error) throw new Error('Error al subir imagen: ' + error.message);

  const { data: urlData } = supabase.storage
    .from('tesoros-bucket')
    .getPublicUrl(path);

  console.log('[UPLOAD IMAGE] Upload image completed:', {
    path: path,
    publicUrl: urlData.publicUrl,
    timestamp: new Date().toISOString(),
  });

  return urlData.publicUrl;
}
