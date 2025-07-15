export const isFormProductNameOk = (productName: string) => {
  if (productName === '') {
    return false;
  }

  const regex = /^[^\s].*$/; // Valida cadenas de texto que no comienzan con un espacio en blanco
  if (!regex.test(productName)) {
    return false;
  }

  return true;
};

export const isFormProductBrandOk = (productBrand: string) => {
  const regex = /^[^\s].*$|^$/;
  if (!regex.test(productBrand)) {
    return false;
  }

  return true;
};

export const isFormProductCategoryOk = (productCategory: string) => {
  const regex = /^(?! )[^\d]*$/;
  if (!regex.test(productCategory)) {
    return false;
  }

  return true;
};

export const isFormProductUnitsOk = (productUnits: string) => {
  if (productUnits.trim() === '') {
    return false;
  }

  const regex = /^[^0].*$/;
  if (!regex.test(productUnits)) {
    return false;
  }

  return true;
};

export const isFormProductPriceOk = (productPrice: string) => {
  if (productPrice.trim() === '') {
    return false;
  }

  const regex = /^[1-9][0-9]*(,[0-9]+)?$/;
  if (!regex.test(productPrice)) {
    return false;
  }

  return true;
};

export const isFormProductImagesOk = (productImages: File[]) => {
  return productImages.length > 0 && productImages.length <= 6;
};
