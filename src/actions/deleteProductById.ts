'use server';

import { createClient } from '@/supabase/server';

export async function deleteProductById(productId: string) {
  const supabase = await createClient();
  const imageDataList: { path: string; file: Blob }[] = [];
  const imagePaths: string[] = [];

  try {
    // 1. Obtener el producto
    const { data: product, error: fetchError } = await supabase
      .from('tesoros')
      .select('images')
      .eq('id', productId)
      .single();

    if (fetchError || !product) {
      throw new Error('Error al obtener el producto');
    }

    const fullImageUrls: string[] = product.images || [];

    // 2. Descargar imágenes y preparar paths
    for (const url of fullImageUrls) {
      const relativePath = url.split('/tesoros-bucket/').pop();

      if (!relativePath) {
        throw new Error('Error al eliminar la imagen');
      }

      const response = await fetch(url);
      if (!response.ok) {
        console.warn('No se pudo descargar la imagen:', url);
        continue;
      }
      const blob = await response.blob();
      imageDataList.push({ path: relativePath, file: blob });
      imagePaths.push(relativePath);
    }

    console.log('imagePaths:', imagePaths);

    // 3. Eliminar imágenes del bucket
    if (imagePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from('tesoros-bucket')
        .remove(imagePaths);

      if (storageError) {
        throw new Error('Error al eliminar imágenes del bucket');
      }
    }

    // 4. Eliminar el producto
    const { error: deleteError } = await supabase
      .from('tesoros')
      .delete()
      .eq('id', productId);

    if (deleteError) {
      throw new Error('Error al eliminar el producto');
    }
    console.log('Producto eliminado:');
    return { success: true };
  } catch (err) {
    console.error('Error al eliminar producto:', err);

    // 5. Restaurar imágenes si algo falla
    for (const { path, file } of imageDataList) {
      const { error: reuploadError } = await supabase.storage
        .from('tesoros-bucket')
        .upload(path, file, { upsert: true });

      if (reuploadError) {
        console.error(`Error al restaurar imagen ${path}:`, reuploadError);
      } else {
        console.log(`Imagen restaurada: ${path}`);
      }
    }

    return { success: false, message: (err as Error).message };
  }
}
