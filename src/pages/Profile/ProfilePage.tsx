'use client';

import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { signout } from '@/actions/signout';
import LightboxOptions from '@/components/Lightbox/LightboxOptions';
import LightboxLoader from '@/components/Lightbox/LightboxLoader';
import { MdEmail, MdLock } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

interface ProfileProps {
  user: User | null;
}

const ProfilePage = ({ user }: ProfileProps) => {
  const [isDeleteMsg, setIsDeleteMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSignOut = async () => {
    setIsDeleteMsg(false);
    setIsLoading(true);
    await signout();
    setIsLoading(false);
  };

  const extraerUsuario = (correo: string) => {
    if (correo.includes('@')) {
      return correo.split('@')[0];
    }
    return '';
  };

  return (
    <>
      <div className="mt-2.5 ">
        <h1 className="text-2xl font-semibold mb-2 ">
          ¡Bienvenido/a {extraerUsuario(user?.email || '')}!
        </h1>
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-gray-500 text-sm ">Correo electrónico</label>
            <div className="flex flex-col relative">
              <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-xl opacity-50 pointer-events-none" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={user?.email}
                /* onChange={(e) => setEmail(e.target.value)} */
                required
                className="w-full pl-11 pr-5 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base "
                disabled={!isEditing}
              />
            </div>
          </div>
          {isEditing && (
            <>
              <div>
                <label className="text-gray-500 text-sm ">
                  Contraseña actual
                </label>
                <div className="flex relative">
                  <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-xl opacity-50 pointer-events-none" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Contraseña actual"
                    /* value={password} */
                    /* onChange={(e) => setPassword(e.target.value)} */
                    required
                    className="w-full pl-11 pr-5 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-500 text-sm ">
                  Nueva contraseña
                </label>
                <div className="flex relative">
                  <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-xl opacity-50 pointer-events-none" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Nueva contraseña"
                    /* value={password} */
                    /* onChange={(e) => setPassword(e.target.value)} */
                    required
                    className="w-full pl-11 pr-5 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 mt-5">
        <div className="flex items-center gap-1 justify-center">
          {!isEditing && <FaEdit />}
          <button className="mt-0.5" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancelar edición' : 'Editar cuenta'}
          </button>
        </div>
        {isEditing ? (
          <button className="bg-secondary text-white px-4 rounded-full hover:bg-secondary-hover  py-0.5">
            Confirmar
          </button>
        ) : (
          <button
            className="text-red-600 mt-0.5 "
            onClick={() => setIsDeleteMsg(true)}
          >
            Cerrar Sesión
          </button>
        )}
      </div>
      <LightboxOptions
        isLightboxOpen={isDeleteMsg}
        onClose={() => setIsDeleteMsg(false)}
        onAccept={() => handleSignOut()}
        title="Cerrar Sesión"
        text={'¿Estás seguro de que quieres cerrar sesión?'}
        buttonText="Volver"
        buttonText2="Cerrar Sesión"
      />

      <LightboxLoader isLightboxOpen={isLoading} />
    </>
  );
};

export default ProfilePage;
