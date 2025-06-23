import { useEffect, useState } from 'react';

interface FormField {
  value: string;
  error: string;
  required: boolean;
}

interface FormState {
  [key: string]: FormField;
}

const validateUserEmail = (value: string): FormField => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value === '') {
    return { value, error: 'useremail_empty', required: true };
  }
  return {
    value,
    error: emailRegex.test(value) ? '' : 'useremail_format',
    required: true,
  };
};

const validateProductName = (value: string): FormField => {
  if (value === '') {
    return { value, error: 'INPUT_PRODUCT_NAME_EMPTY', required: true };
  }

  const regex = /^[^\s].*$/; // Valida cadenas de texto que no comienzan con un espacio en blanco
  if (!regex.test(value)) {
    return { value, error: 'INPUT_PRODUCT_NAME_INVALID', required: true };
  }

  return { value, error: '', required: true };
};

const validateProductBrand = (value: string): FormField => {
  const regex = /^[^\s].*$|^$/;
  if (!regex.test(value)) {
    return { value, error: 'INPUT_PRODUCT_BRAND_INVALID', required: false };
  }

  return { value, error: '', required: false };
};

const validateProductCategory = (value: string): FormField => {
  const regex = /^(?! )[^\d]*$/;
  if (!regex.test(value)) {
    return { value, error: 'INPUT_PRODUCT_CATEGORY_INVALID', required: false };
  }

  return { value, error: '', required: false };
};

const validateProductUnits = (value: string): FormField => {
  const unitsRegex = /^[^0].*$/;

  if (value.trim() === '') {
    return { value, error: 'INPUT_PRODUCT_UNITS_EMPTY', required: true };
  }

  return {
    value,
    error: unitsRegex.test(value) ? '' : 'INPUT_PRODUCT_UNITS_INVALID',
    required: true,
  };
};

const validateProductPrice = (value: string): FormField => {
  const priceRegex = /^[0-9]+(,[0-9]+)?$/;
  if (value.trim() === '') {
    return { value, error: 'INPUT_PRODUCT_PRICE_EMPTY', required: true };
  }

  return {
    value,
    error: priceRegex.test(value) ? '' : 'INPUT_PRODUCT_PRICE_INVALID',
    required: true,
  };
};

export const useForm = (initialForm: FormState) => {
  const [formValues, setFormValues] = useState<FormState>(initialForm);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const validatorObject: Record<string, (value: string) => FormField> = {
    // User validators
    email: validateUserEmail,
    // Product validators
    name: validateProductName,
    brand: validateProductBrand,

    category: validateProductCategory,
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
