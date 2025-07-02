'use server';
import cloudinary from '@/lib/cloudinary';

export async function uploadImage(image: File) {
  const buffer = await image.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const dataUrl = `data:${image.type};base64,${base64}`;

  const uniqueId = Date.now();

  try {
    const result = await cloudinary.uploader.upload(dataUrl, {
      upload_preset: 'tesorosencasa-uploads',
      public_id: `tesorosencasa/${uniqueId}`,
    });
    return { error: false, url: result.secure_url };
  } catch {
    return { error: true };
  }
}
