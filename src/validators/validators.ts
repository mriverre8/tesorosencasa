export const isFormProductNameOk = (productName: string) => {
  if (productName === '') {
    return false;
  }

  const regex = /^[^\s].*$/; // Validates that the string does not start with a whitespace
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

export const isUserEmailOk = (value: string) => {
  if (value === '') {
    return false;
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(value)) {
    return false;
  }

  return true;
};
