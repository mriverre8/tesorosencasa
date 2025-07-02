'use server';

export async function uploadImage(image: File) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'tesorosencasa-uploads');

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!res.ok) {
    /* const errorText = await res.text(); */
    return {
      error: true,
      /* errorText: errorText, */
    };
  }
  const data = await res.json();
  return {
    error: false,
    url: data.secure_url,
  };
}
