'use server';

import { createClient } from '@/supabase/server';
import cloudinary from '@/lib/cloudinary';

export async function deleteProductById(productId: string) {
  const supabase = await createClient();
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

    for (const imageUrl of images) {
      const match = imageUrl.match(/upload\/.+?\/([^.]+)/);
      const publicId = match?.[1];

      if (!publicId) {
        console.warn('No se pudo extraer el public_id de la URL:', imageUrl);
        continue;
      }

      try {
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result !== 'ok') {
          console.error(`Error al eliminar imagen ${publicId}:`, result);
        }
      } catch (err) {
        console.error(`Error en cloudinary.uploader.destroy:`, err);
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

    return { error: false };
  } catch (err) {
    console.error('[ERROR AL ELIMINAR PRODUCTO]', {
      message: (err as Error).message,
      time: new Date().toISOString(),
    });

    return { error: true, message: (err as Error).message };
  }
}
