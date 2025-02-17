'use client';

import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { MdLock } from 'react-icons/md';
import { LuUserRound } from 'react-icons/lu';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

interface RegisterProps {
  swapAction: (state: 'login' | 'register') => void;
  closeAction: () => void;
}

const LightboxRegister = ({ swapAction, closeAction }: RegisterProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt:', { name, email, password });
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
      <div className="relative flex items-center justify-center mb-4">
        <h2 className="text-2xl font-semibold">Regístrate</h2>
        <IoClose
          onClick={() => closeAction()}
          className="absolute right-0 text-2xl cursor-pointer transform transition-transform  hover:scale-125 hover:text-yellow-400"
        />
      </div>
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="flex relative">
          <LuUserRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl " />
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full pl-11 pr-5 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="flex relative">
          <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl " />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-11 pr-5 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="flex relative">
          <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl " />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-11 pr-5 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-500 transition"
        >
          Registrarse
        </button>
      </form>
      <div className="flex w-full justify-center items-center mt-4">
        <p className="text-sm text-gray-500">Regístrate con</p>
      </div>
      <div className="flex gap-2 mb-4 mt-1.5 text-center justify-center items-center">
        <button className="bg-[#f5f1e3] p-2 rounded-full text-2xl transform transition-transform hover:scale-125">
          <FcGoogle />
        </button>
        <button className="bg-[#f5f1e3] p-2 rounded-full text-2xl transform transition-transform hover:scale-125">
          <FaApple />
        </button>
        <button className="bg-[#f5f1e3] p-2 rounded-full text-2xl transform transition-transform hover:scale-125">
          <FaGithub />
        </button>
      </div>
      <p className="mt-4 text-center text-sm text-gray-500">
        ¿Ya tienes cuenta?{' '}
        <button
          onClick={() => swapAction('login')}
          className="text-yellow-400 hover:underline"
        >
          Inicia sesión
        </button>
      </p>
    </div>
  );
};

export default LightboxRegister;
