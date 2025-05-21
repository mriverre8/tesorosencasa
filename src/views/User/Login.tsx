'use client';

import React from 'react';
/* import Link from 'next/link'; */
/* import { useState } from 'react'; */
import { MdEmail } from 'react-icons/md';
import { MdLock } from 'react-icons/md';
/* import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa'; */
import { login } from '@/actions/login';
import { useForm } from '@/hooks/useForm';
import { useState } from 'react';
import LightboxLoader from '@/components/Lightbox/LightboxLoader';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialForm = {
    email: { value: '', error: '', required: true },
    password: { value: '', error: '', required: true },
  };

  //Inicialización del formulario
  const { formValues, formIsValid, updateForm, clearForm, validateAll } =
    useForm(initialForm);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateAll(); // Validar todos los campos del formulario

    //Valores del formulario
    const formData = new FormData(event.target as HTMLFormElement);
    if (formIsValid) {
      setIsLoading(true);
      await login(formData); // Llamar a la función de login
      clearForm();
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl mt-[17vh]">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-center">
            Iniciar sessión
          </h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex relative">
            <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-xl opacity-50 pointer-events-none" />

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
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
              placeholder="Contraseña"
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
            Entrar
          </button>
        </form>
        {/* <div className="flex w-full justify-center items-center mt-4">
        <p className="text-xs sm:text-sm text-gray-500 text-center">
          Inicia sessión con
        </p>
      </div>
      <div className="flex gap-2 mb-4 mt-1.5 text-center justify-center items-center text-lg sm:text-2xl">
        <button className="bg-background p-2 rounded-full transform transition-transform hover:scale-125">
          <FcGoogle />
        </button>
        <button className="bg-background p-2 rounded-full transform transition-transform hover:scale-125">
          <FaApple />
        </button>
        <button className="bg-background p-2 rounded-full transform transition-transform hover:scale-125">
          <FaGithub />
        </button>
      </div>
      <p className="mt-4 text-center text-xs sm:text-sm text-gray-500">
        No tienes cuenta?{' '}
        <Link href="/register" className="text-primary hover:underline">
          Regístrate
        </Link>
      </p> */}
      </div>
      <LightboxLoader isLightboxOpen={isLoading} />
    </>
  );
};

export default Login;
