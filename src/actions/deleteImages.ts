'use server';

import crypto from 'crypto';

const generateSHA1 = (data: string) => {
  return crypto.createHash('sha1').update(data).digest('hex');
};

const generateSignature = (timestamp: number, apiSecret: string) => {
  // Firma solo con timestamp: "timestamp=...{api_secret}"
  return generateSHA1(`timestamp=${timestamp}${apiSecret}`);
};

export async function deleteImages() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature(timestamp, apiSecret);

  const formData = new URLSearchParams();
  formData.append('timestamp', timestamp.toString());
  formData.append('api_key', apiKey);
  formData.append('signature', signature);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      }
    );

    const result = await res.json();

    if (!res.ok || result.result !== 'ok') {
      console.error('❌ Error al eliminar todas las imágenes:', result);
      return {
        success: false,
        message: result.error?.message || 'Error desconocido',
      };
    }

    console.log('✅ Todas las imágenes fueron eliminadas de Cloudinary.');
    return { success: true };
  } catch (err) {
    console.error('❌ Error al eliminar imágenes:', err);
    return { success: false, message: (err as Error).message };
  }
}
