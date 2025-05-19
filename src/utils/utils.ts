// Method to convert an image file to WebP format
export const convertToWebP = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;

        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = height * (MAX_WIDTH / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas context not available'));
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const webpFile = new File(
                [blob],
                file.name.replace(/\.[^.]+$/, '.webp'),
                {
                  type: 'image/webp',
                }
              );
              resolve(webpFile);
            } else {
              reject(new Error('Failed to convert to WebP'));
            }
          },
          'image/webp',
          0.8
        );
      };
      img.onerror = (/* e */) => reject(new Error('Image load error'));
      if (typeof event.target?.result === 'string') {
        img.src = event.target.result;
      }
    };

    reader.onerror = () => reject(new Error('FileReader error'));
    reader.readAsDataURL(file);
  });
};
