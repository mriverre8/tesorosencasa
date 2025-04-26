import { useEffect, useState } from 'react';

interface FormField {
  value: string;
  error: string;
  required: boolean;
}

interface FormState {
  [key: string]: FormField;
}

const validateProductName = (value: string): FormField => {
  if (value === '') {
    return { value, error: 'productname_empty', required: true };
  }

  /* const regex = /^[^0-9\s][a-zA-Z\s]*$/; */
  const regex = /^[^\s].*$/;
  if (!regex.test(value)) {
    return { value, error: 'productname_invalid', required: true };
  }

  return { value, error: '', required: true };
};

const validateProductBrand = (value: string): FormField => {
  /* const regex = /^[^0-9\s][a-zA-Z\s]*$|^$/; */
  const regex = /^[^\s].*$|^$/;
  if (!regex.test(value)) {
    return { value, error: 'productbrand_invalid', required: false };
  }

  return { value, error: '', required: false };
};

const validateProductMaterial = (value: string): FormField => {
  /* const regex = /^[^0-9\s][a-zA-Z\s]*$|^$/; */
  const regex = /^$|^[a-zA-Z][a-zA-Z\s]*$/;
  if (!regex.test(value)) {
    return { value, error: 'productmaterial_invalid', required: false };
  }

  return { value, error: '', required: false };
};

const validateProductType = (value: string): FormField => {
  /* const regex = /^[^0-9\s][a-zA-Z\s]*$|^$/; */
  const regex = /^$|^[a-zA-Z][a-zA-Z\s]*$/;
  if (!regex.test(value)) {
    return { value, error: 'producttype_invalid', required: false };
  }

  return { value, error: '', required: false };
};

const validateProductUnits = (value: string): FormField => {
  const unitsRegex = /^\d+$/;

  if (value.trim() === '') {
    return { value, error: 'productunits_empty', required: true };
  }

  return {
    value,
    error: unitsRegex.test(value) ? '' : 'productunits_format',
    required: true,
  };
};

const validateProductPrice = (value: string): FormField => {
  const priceRegex = /^[0-9]+(,[0-9]+)?$/;
  if (value.trim() === '') {
    return { value, error: 'productprice_empty', required: true };
  }

  return {
    value,
    error: priceRegex.test(value) ? '' : 'productprice_format',
    required: true,
  };
};

export const useForm = (initialForm: FormState) => {
  const [formValues, setFormValues] = useState<FormState>(initialForm);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const validatorObject: Record<string, (value: string) => FormField> = {
    name: validateProductName,
    brand: validateProductBrand,
    material: validateProductMaterial,
    type: validateProductType,
    units: validateProductUnits,
    price: validateProductPrice,
  };

  const update = (newObject: Partial<FormState>) => {
    setFormValues((prev) => {
      const updatedValues = { ...prev };
      for (const key in newObject) {
        if (newObject[key] !== undefined) {
          updatedValues[key] = newObject[key] as FormField;
        }
      }
      return updatedValues;
    });
  };

  const updateForm = (key: string, value: string) => {
    const validator =
      validatorObject[key] || ((val: string) => ({ value: val, error: '' }));
    const newField = validator(value);
    update({ [key]: newField });
  };

  const checkError = () => {
    const values = Object.values(formValues);
    const formHasError = values.some((element) => element.error !== '');
    const formIsFilled = values.every(
      (element) => !element.required || String(element.value).trim() !== ''
    );
    setFormIsValid(!formHasError && formIsFilled);
  };

  const validateAll = () => {
    const updatedForm: FormState = {};
    for (const key in formValues) {
      updatedForm[key] = (
        validatorObject[key] || ((val: string) => ({ value: val, error: '' }))
      )(formValues[key].value);
    }
    update(updatedForm);
  };

  const clearForm = () => {
    update(initialForm);
  };

  useEffect(() => {
    checkError();
  }, [formValues]);

  /* useEffect(() => {
    validateAll();
  }, []); */

  return {
    formValues,
    formIsValid,
    updateForm,
    validateAll,
    clearForm,
  };
};
