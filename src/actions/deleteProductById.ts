'use server';

import { createClient } from '@/supabase/server';

export async function deleteProductById(
  productId: string
): Promise<{ success: boolean; message?: string }> {
  const supabase = await createClient();

  // Paso 1: Obtener el producto antes de eliminarlo
  const { data: product, error: fetchError } = await supabase
    .from('tesoros')
    .select('images')
    .eq('id', productId)
    .single();

  if (fetchError) {
    console.error('Error al obtener el producto:', fetchError);
    return { success: false, message: 'Error al obtener el producto' };
  }

  const fullImageUrls: string[] = product?.images || [];

  // Paso 2: Extraer rutas relativas y descargar imágenes
  const imageDataList: { path: string; file: Blob }[] = [];

  for (const url of fullImageUrls) {
    const pathStart = url.indexOf('/tesoros-bucket/');
    const relativePath =
      pathStart !== -1
        ? url.substring(pathStart + '/tesoros-bucket/'.length)
        : '';

    if (!relativePath) continue;

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      imageDataList.push({ path: relativePath, file: blob });
    } catch (err) {
      console.error('Error al descargar la imagen antes de borrarla:', err);
    }
  }

  const imagePaths = imageDataList.map((img) => img.path);

  // Paso 3: Eliminar imágenes del bucket
  if (imagePaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from('tesoros-bucket')
      .remove(imagePaths);

    if (storageError) {
      console.error('Error al eliminar imágenes del storage:', storageError);
      return {
        success: false,
        message: 'Error al eliminar imágenes del bucket',
      };
    }
  }

  // Paso 4: Eliminar el producto de la base de datos
  const { error: deleteError } = await supabase
    .from('tesoros')
    .delete()
    .eq('id', productId);

  if (deleteError) {
    console.error('Error al eliminar el producto:', deleteError);

    // Paso 5: Restaurar imágenes si falla el delete
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

    return { success: false, message: 'Error al eliminar el producto' };
  }

  console.log('Producto eliminado correctamente');
  return { success: true };
}
