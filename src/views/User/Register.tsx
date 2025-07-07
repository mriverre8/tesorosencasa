'use client';

import React from 'react';

// Hooks
import { useForm } from '@/hooks/useForm';

// Icons
import { MdEmail } from 'react-icons/md';
import { MdLock } from 'react-icons/md';
import { LuUserRound } from 'react-icons/lu';

// Actions
import { signup } from '@/actions/signup';

// Hooks
import useLoader from '@/hooks/useLoader';

// Translation
import { translate } from '@/locales/translate';

const Register = () => {
  const loader = useLoader();

  const initialForm = {
    email: { value: '', error: '', required: true },
    password: { value: '', error: '', required: true },
  };

  const { formValues, formIsValid, updateForm, clearForm, validateAll } =
    useForm(initialForm);

  const obtainUsername = () => {
    const email = formValues.email.value;
    const username = email.split('@')[0];
    return username;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateAll();

    if (formIsValid) {
      loader.onOpen();
      try {
        const formData = new FormData(event.target as HTMLFormElement);
        await signup(formData);
        clearForm();
        loader.onClose();
      } catch {
        // TODO: handle errors
        /* setFinalErrorMsg(translate((error as Error).message));
              setIsErrorMsg(true); */
      }
      loader.onClose();
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl mt-[17vh]">
      <div className="relative flex items-center justify-center mb-4">
        <h2 className="text-xl sm:text-2xl  font-semibold">
          {translate('REGISTER')}
        </h2>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex relative">
          <LuUserRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-xl opacity-50 pointer-events-none" />
          <input
            id="username"
            name="username"
            type="text"
            placeholder={translate('USERNAME')}
            value={obtainUsername()}
            className="w-full pl-11 pr-5 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            disabled
          />
        </div>
        <div className="flex relative">
          <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-xl opacity-50 pointer-events-none" />
          <input
            id="email"
            name="email"
            type="email"
            placeholder={translate('EMAIL')}
            value={formValues.email.value}
            onChange={(e) => updateForm('email', e.target.value)}
            className="w-full pl-11 pr-5 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
          />
        </div>
        <div className="flex relative">
          <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-xl opacity-50 pointer-events-none" />
          <input
            id="password"
            name="password"
            type="password"
            placeholder={translate('PASSWORD')}
            value={formValues.password.value}
            onChange={(e) => updateForm('password', e.target.value)}
            className="w-full pl-11 pr-5 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded-full hover:bg-secondary-hover transition text-sm sm:text-base"
        >
          {translate('CREATE_ACCOUNT')}
        </button>
      </form>
    </div>
  );
};

export default Register;
