'use server';

import { createClient } from '@/utils/supabase/server';

export async function deleteProductById(productId: string) {
  const supabase = await createClient();

  // Paso 1: Obtener el producto antes de eliminarlo
  const { data: product, error: fetchError } = await supabase
    .from('Tesoro')
    .select('images')
    .eq('id', productId)
    .single();

  if (fetchError) {
    console.error('Error al obtener el producto:', fetchError);
    return null;
  }

  // Paso 2: Extraer las rutas relativas de las URLs
  const fullImageUrls: string[] = product?.images || [];
  const imagePaths = fullImageUrls
    .map((url) => {
      // Extrae todo lo que está después de "/tesoros-bucket/"
      const pathStart = url.indexOf('/tesoros-bucket/');
      return pathStart !== -1
        ? url.substring(pathStart + '/tesoros-bucket/'.length)
        : '';
    })
    .filter(Boolean); // Elimina strings vacíos

  // Paso 3: Eliminar imágenes del bucket
  if (imagePaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from('tesoros-bucket')
      .remove(imagePaths);

    if (storageError) {
      console.error('Error al eliminar imágenes del storage:', storageError);
    }
  }

  // Paso 4: Eliminar el producto de la base de datos
  const { data, error: deleteError } = await supabase
    .from('Tesoro')
    .delete()
    .eq('id', productId);

  if (deleteError) {
    console.error('Error al eliminar el producto:', deleteError);
    return null;
  }

  console.log('Producto eliminado:', data);
  return data;
}
