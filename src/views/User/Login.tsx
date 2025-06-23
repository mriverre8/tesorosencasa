'use client';

import React, { useState } from 'react';

// Hooks
import { useForm } from '@/hooks/useForm';
import { useRouter } from 'next/navigation';

// Icons
import { MdEmail } from 'react-icons/md';
import { MdLock } from 'react-icons/md';

// Components
import LightboxLoader from '@/components/Lightbox/LightboxLoader';

// Actions
import { login } from '@/actions/login';

// Translation
import { translate } from '@/locales/translate';
import LightboxMessage from '@/components/Lightbox/LightboxMessage';

const initialForm = {
  email: { value: '', error: '', required: true },
  password: { value: '', error: '', required: true },
};

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMsg, setIsErrorMsg] = useState(false);
  const [finalErrorMsg, setFinalErrorMsg] = useState('');

  const { formValues, formIsValid, updateForm, clearForm, validateAll } =
    useForm(initialForm);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateAll();

    if (formIsValid) {
      setIsLoading(true);
      try {
        const formData = new FormData(event.target as HTMLFormElement);
        await login(formData);
        clearForm();
        router.push('/createproduct');
        setIsLoading(false);
      } catch (error) {
        setFinalErrorMsg(translate((error as Error).message));
        setIsErrorMsg(true);
      }
      setIsLoading(false);
    }
  };

  const closeErrorMsg = () => {
    setIsErrorMsg(false);
    setFinalErrorMsg('');
  };

  return (
    <>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl mt-[17vh]">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-center">
            {translate('LOGIN')}
          </h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex relative">
            <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-xl opacity-50 pointer-events-none" />

            <input
              id="email"
              name="email"
              type="email"
              placeholder={translate('EMAIL')}
              value={formValues.email.value}
              onChange={(e) => updateForm('email', e.target.value)}
              required
              className="w-full pl-11 pr-5 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base "
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
              required
              className="w-full pl-11 pr-5 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded-full hover:bg-secondary-hover transition text-sm sm:text-base"
          >
            {translate('ENTER')}
          </button>
        </form>
      </div>
      <LightboxLoader isLightboxOpen={isLoading} />
      <LightboxMessage
        isLightboxOpen={isErrorMsg}
        onClose={() => closeErrorMsg()}
        title={translate('LOGIN_FAILED')}
        text={finalErrorMsg}
        buttonText={translate('GO_BACK')}
      />
    </>
  );
};

export default Login;
