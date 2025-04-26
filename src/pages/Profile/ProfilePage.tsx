'use client';

import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { signout } from '@/actions/signout';
import LightboxOptions from '@/components/Lightbox/LightboxOptions';

interface ProfileProps {
  user: User | null;
}

const ProfilePage = ({ user }: ProfileProps) => {
  const [isDeleteMsg, setIsDeleteMsg] = useState(false);

  const handleSignOut = async () => {
    setIsDeleteMsg(false);
    await signout();
  };

  return (
    <>
      <div className="mt-2.5">
        <div className="flex  flex-col">
          <h1 className="text-2xl font-semibold ">Bienvenido/a</h1>
          <div className=" text-sm">
            <p>
              <span className="font-medium">Correo:</span> {user?.email}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm whitespace-nowrap">
            <button className="hover:text-yellow-400">Editar cuenta</button>

            <button
              className="text-red-600"
              onClick={() => setIsDeleteMsg(true)}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
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
    </>
  );
};

export default ProfilePage;
