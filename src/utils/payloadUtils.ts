interface ProductFormValues {
  productName: string;
  productCondition: string[];
  productOrigin: string;
  productBrand: string;
  productMaterial: string[];
  productCategory: string;
  productLarge: string;
  productWidth: string;
  productHeight: string;
  productDiameter: string;
  productUnits: string;
  productPrice: string;
}

export const generateNewProductPayload = (
  formValues: ProductFormValues,
  uploadedImages: string[]
) => {
  const formData = new FormData();

  formData.append('productName', formValues.productName);
  formData.append(
    'productCondition',
    JSON.stringify(formValues.productCondition)
  );
  formData.append('productOrigin', formValues.productOrigin);
  formData.append('productBrand', formValues.productBrand);
  formData.append(
    'productMaterial',
    JSON.stringify(formValues.productMaterial)
  );
  formData.append('productCategory', formValues.productCategory);
  formData.append('productLarge', formValues.productLarge);
  formData.append('productWidth', formValues.productWidth);
  formData.append('productHeight', formValues.productHeight);
  formData.append('productDiameter', formValues.productDiameter);
  formData.append('productUnits', formValues.productUnits);
  formData.append('productPrice', formValues.productPrice);
  formData.append('productImages', JSON.stringify(uploadedImages));

  return formData;
};
