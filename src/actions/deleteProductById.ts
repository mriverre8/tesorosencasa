'use server';

import { createClient } from '@/supabase/server';
import crypto from 'crypto';

const generateSHA1 = (data: string) => {
  return crypto.createHash('sha1').update(data).digest('hex');
};

const generateSignature = (
  publicId: string,
  timestamp: number,
  apiSecret: string
) => {
  return generateSHA1(
    `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
  );
};

export async function deleteProductById(productId: string) {
  const supabase = await createClient();
  const timestamp = Math.floor(Date.now() / 1000); // En segundos (recomendado por Cloudinary)

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  try {
    // Obtener imágenes del producto
    const { data: product, error: fetchError } = await supabase
      .from('tesoros')
      .select('images')
      .eq('id', productId)
      .single();

    if (fetchError || !product) {
      throw new Error('No se encontró el producto.');
    }

    const images: string[] = product.images || [];
    const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;

    for (const imageUrl of images) {
      const match = imageUrl.match(regex);
      const publicId = match?.[1];

      if (!publicId) {
        console.warn('No se pudo extraer el public_id de la URL:', imageUrl);
        continue;
      }

      const signature = generateSignature(publicId, timestamp, apiSecret);

      const formData = new URLSearchParams();
      formData.append('public_id', publicId);
      formData.append('timestamp', timestamp.toString());
      formData.append('api_key', apiKey);
      formData.append('signature', signature);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString(),
        }
      );

      const result = await response.json();

      if (result.result !== 'ok') {
        console.error(`Error al eliminar imagen ${publicId}:`, result);
      }
    }

    // Eliminar producto de la base de datos
    const { error: deleteError } = await supabase
      .from('tesoros')
      .delete()
      .eq('id', productId);

    if (deleteError) {
      throw new Error('Error al eliminar el producto.');
    }

    return { success: true };
  } catch (err) {
    console.error('[ERROR AL ELIMINAR PRODUCTO]', {
      message: (err as Error).message,
      time: new Date().toISOString(),
    });

    return { success: false, message: (err as Error).message };
  }
}
