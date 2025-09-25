'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Components
import Layout from '@/components/common/Layout';

// Hooks
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useLoader from '@/hooks/useLoader';
import useLightboxMessage from '@/hooks/useLightboxMessage';

// Icons
import { MdEmail, MdLock } from 'react-icons/md';
import { IoHelpCircleOutline } from 'react-icons/io5';

// Actions
import { login } from '@/actions/login';

// Utils
import { isUserEmailOk } from '@/validators/validators';

export default function LoginPage() {
  const translate = useTranslations();
  const loader = useLoader();
  const lightboxMessage = useLightboxMessage();
  const router = useRouter();

  const [validationActive, setValidationActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formIsOk = isUserEmailOk(email);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formIsOk && !validationActive) {
      setValidationActive(true);
      return;
    }

    loader.onOpen();
    try {
      const formData = new FormData(event.target as HTMLFormElement);
      await login(formData);

      router.push('/products');
      loader.onClose();
    } catch (error) {
      lightboxMessage.setContent(
        translate('LOGIN_FAILED'),
        translate((error as Error).message),
        translate('ACCEPT')
      );
      loader.onClose();
      lightboxMessage.onOpen();
    }
  };

  const handleHelp = () => {
    lightboxMessage.setContent(
      translate('HELP'),
      translate('LOGIN_HELP_TEXT'),
      translate('ACCEPT')
    );
    lightboxMessage.onOpen();
  };
  return (
    <main>
      <div className="bg-background min-h-screen">
        <Layout>
          <div className="flex justify-center ">
            <div className="w-full max-w-md p-6 bg-gradient-to-b from-[#f8f6ef] via-[#f8f7f2] to-white rounded-xl shadow-2xl mt-[17vh] relative">
              <IoHelpCircleOutline
                className="absolute top-4 right-4 text-gray-400 text-2xl cursor-pointer hover:text-primary"
                onClick={handleHelp}
              />

              <div className="flex flex-col items-center justify-center mb-10 mt-5">
                <Image src="/icon1.png" alt="Logo" width={50} height={50} />
                <h2 className="text-2xl sm:text-2xl font-semibold text-center mt-5">
                  {translate('LOGIN')}
                </h2>
                <p className="text-sm text-gray-500 text-center">
                  {translate('LOGIN_DESCRIPTION')}
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <div className="flex relative">
                    <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-xl opacity-50 pointer-events-none" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={translate('EMAIL')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-11 pr-5 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base "
                    />
                  </div>
                  {!isUserEmailOk(email) && validationActive && (
                    <p className="text-xs pt-1 text-red-600 px-0.5">
                      {translate('INPUT_USER_EMAIL_INVALID')}
                    </p>
                  )}
                </div>

                <div className="flex relative">
                  <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-xl opacity-50 pointer-events-none" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder={translate('PASSWORD')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
          </div>
        </Layout>
      </div>
    </main>
  );
}
