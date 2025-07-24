import { create } from 'zustand';

interface CreateProductFormStore {
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
  productImages: File[];

  setProductName: (name: string) => void;
  setProductCondition: (condition: string[]) => void;
  setProductOrigin: (origin: string) => void;
  setProductBrand: (brand: string) => void;
  setProductMaterial: (material: string[]) => void;
  setProductCategory: (category: string) => void;
  setProductLarge: (large: string) => void;
  setProductWidth: (width: string) => void;
  setProductHeight: (height: string) => void;
  setProductDiameter: (diameter: string) => void;
  setProductUnits: (units: string) => void;
  setProductPrice: (price: string) => void;
  setProductImages: (images: File[]) => void;

  reset: () => void;

  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;

  setEditingValues: (
    productName: string,
    productCondition: string[],
    productOrigin: string,
    productBrand: string,
    productMaterial: string[],
    productCategory: string,
    productLarge: string,
    productWidth: string,
    productHeight: string,
    productDiameter: string,
    productUnits: string,
    productPrice: string
  ) => void;

  productId: string;
  setProductId: (id: string) => void;
}

const useCreateProductForm = create<CreateProductFormStore>((set) => ({
  productName: '',
  productCondition: [],
  productOrigin: '',
  productBrand: '',
  productMaterial: [],
  productCategory: '',
  productLarge: '',
  productWidth: '',
  productHeight: '',
  productDiameter: '',
  productUnits: '',
  productPrice: '',
  productImages: [],

  setProductName: (name) => set({ productName: name }),
  setProductCondition: (condition) => set({ productCondition: condition }),
  setProductOrigin: (origin) => set({ productOrigin: origin }),
  setProductBrand: (brand) => set({ productBrand: brand }),
  setProductMaterial: (material) => set({ productMaterial: material }),
  setProductCategory: (category) => set({ productCategory: category }),
  setProductLarge: (large) => set({ productLarge: large }),
  setProductWidth: (width) => set({ productWidth: width }),
  setProductHeight: (height) => set({ productHeight: height }),
  setProductDiameter: (diameter) => set({ productDiameter: diameter }),
  setProductUnits: (units) => set({ productUnits: units }),
  setProductPrice: (price) => set({ productPrice: price }),
  setProductImages: (images) => set({ productImages: images }),

  reset: () =>
    set({
      productName: '',
      productCondition: [],
      productOrigin: '',
      productBrand: '',
      productMaterial: [],
      productCategory: '',
      productLarge: '',
      productWidth: '',
      productHeight: '',
      productDiameter: '',
      productUnits: '',
      productPrice: '',
      productImages: [],
    }),

  isEditing: false,
  setIsEditing: (isEditing) => set({ isEditing }),

  setEditingValues: (
    productName,
    productCondition,
    productOrigin,
    productBrand,
    productMaterial,
    productCategory,
    productLarge,
    productWidth,
    productHeight,
    productDiameter,
    productUnits,
    productPrice
  ) =>
    set({
      productName,
      productCondition,
      productOrigin,
      productBrand,
      productMaterial,
      productCategory,
      productLarge,
      productWidth,
      productHeight,
      productDiameter,
      productUnits,
      productPrice,
    }),

  productId: '',
  setProductId: (id) => set({ productId: id }),
}));

export default useCreateProductForm;
