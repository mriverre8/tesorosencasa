'use server';

import { createClient } from '@/supabase/server';

export async function deleteProducts() {
  const supabase = await createClient();
  const bucketName = 'tesoros-bucket'; // Cambia esto si tu bucket tiene otro nombre

  try {
    // 1. Eliminar todos los productos de la tabla 'tesoros'
    const { error: deleteError } = await supabase
      .from('tesoros')
      .delete()
      .neq('id', '');

    if (deleteError) {
      throw new Error('Error al eliminar todos los productos');
    }

    // 2. Obtener todos los archivos del bucket, incluyendo los de subcarpetas
    const listAllFiles = async (path = '') => {
      const { data: files, error } = await supabase.storage
        .from(bucketName)
        .list(path, {
          limit: 1000,
          offset: 0,
        });

      if (error) throw new Error('Error al listar archivos del storage');

      let allFiles: string[] = [];

      for (const item of files || []) {
        const fullPath = path ? `${path}/${item.name}` : item.name;
        if (item.metadata) {
          allFiles.push(fullPath);
        } else {
          // Si es una carpeta, hacer list recursivo
          const subFiles = await listAllFiles(fullPath);
          allFiles = allFiles.concat(subFiles);
        }
      }

      return allFiles;
    };

    const allFilePaths = await listAllFiles();

    // 3. Eliminar todos los archivos listados
    if (allFilePaths.length > 0) {
      const { error: deleteFilesError } = await supabase.storage
        .from(bucketName)
        .remove(allFilePaths);

      if (deleteFilesError) {
        throw new Error('Error al eliminar archivos del storage');
      }
    }

    console.log(
      '[DELETE ALL PRODUCTS & STORAGE] Todos los productos y archivos eliminados correctamente',
      {
        timestamp: new Date().toISOString(),
        deletedFiles: allFilePaths.length,
      }
    );

    return { success: true };
  } catch (err) {
    console.error('[DELETE ALL PRODUCTS & STORAGE ERROR]', {
      message: (err as Error).message,
      timestamp: new Date().toISOString(),
    });

    return { success: false, message: (err as Error).message };
  }
}
