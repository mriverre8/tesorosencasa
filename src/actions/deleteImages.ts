'use server';

import cloudinary from '@/lib/cloudinary';

export async function deleteImages() {
  try {
    // Borra todas las imágenes (puedes especificar tipo 'image')
    const result = await cloudinary.api.delete_resources_by_prefix(
      'tesorosencasa/',
      {
        resource_type: 'image',
      }
    );

    // `result` contiene info sobre las imágenes eliminadas
    console.log('Imágenes eliminadas:', result.deleted);

    return { error: false, deleted: result.deleted };
  } catch (err) {
    console.error('Error al eliminar imágenes:', err);
    return { error: true, message: (err as Error).message };
  }
}
