'use client';

import { signout } from '@/actions/signout';
import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import LightboxLoader from './Lightbox/LightboxLoader';
import LightboxOptions from './Lightbox/LightboxOptions';
import { translate } from '@/locales/translate';

const TopbarAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isDeleteMsg, setIsDeleteMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsDeleteMsg(false);
    setIsLoading(true);
    await signout();
    setIsLoading(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        {/* Topbar para pantallas pequeñas */}
        <nav className="md:hidden bg-white bg-opacity-80 backdrop-blur-md   w-full border-b ">
          <Layout>
            <div className="flex justify-between items-center relative h-[69px]">
              <div className="flex items-center">
                <div className="flex gap-2 text-3xl font-bold whitespace-nowrap text-secondary">
                  <h1 className="text-primary">
                    {translate('TESOROS_EN_CASA_1')}
                  </h1>
                  <h1>{translate('TESOROS_EN_CASA_2')}</h1>
                </div>
              </div>

              <GiHamburgerMenu
                size={24}
                className="text-secondary cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
            </div>
          </Layout>
        </nav>

        {/* Menú desplegable en móviles */}
        {menuOpen && (
          <div className="md:hidden absolute top-12 left-0 w-full bg-white bg-opacity-80 backdrop-blur-md border-b p-5 z-40">
            <div className="flex flex-col text-center">
              <Link
                href={'/'}
                className="py-2 hover:bg-slate-100"
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </Link>
              {/* <Link
                href={'/createproduct'}
                className="py-2 hover:bg-slate-100"
                onClick={() => setMenuOpen(false)}
              >
                Crea un Tesoro
              </Link> */}
              <Link
                href={'/products'}
                className="py-2 hover:bg-slate-100"
                onClick={() => setMenuOpen(false)}
              >
                Ver todos los Tesoros
              </Link>
              <button
                className="py-2 text-red-500"
                onClick={() => setIsDeleteMsg(true)}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}

        {/* Sidebar en pantallas medianas y grandes */}
        {/* <div className="hidden md:flex h-screen bg-white border-r p-5 fixed">
        <div className="flex flex-col w-64">
          <div className="flex items-center gap-2 text-3xl font-bold text-green-600">
            <h1 className="text-yellow-400">Tesoros</h1>
            <h1>en Casa</h1>
          </div>
          <div className="flex flex-col text-center gap-2 mt-5">
            <Link
              href={'/admin/dashboard/createproduct'}
              className="py-2 hover:bg-slate-100"
            >
              Crea un Tesoro
            </Link>
            <Link
              href={'/admin/dashboard/products'}
              className="py-2 hover:bg-slate-100"
            >
              Ver todos los Tesoros
            </Link>
            <Link
              href={'/admin/dashboard/reservations'}
              className="py-2 hover:bg-slate-100"
            >
              Reservas
            </Link>
            <Link
              href={'/admin/dashboard/events'}
              className="py-2 hover:bg-slate-100"
            >
              Añade un evento
            </Link>
          </div>
        </div>
      </div> */}
      </div>
      <LightboxOptions
        isLightboxOpen={isDeleteMsg}
        onClose={() => setIsDeleteMsg(false)}
        onAccept={() => handleSignOut()}
        title={translate('SIGN_OUT')}
        text={translate('SIGN_OUT_CONFIRMATION')}
        buttonText={translate('GO_BACK')}
        buttonText2={translate('SIGN_OUT')}
      />

      <LightboxLoader isLightboxOpen={isLoading} />
    </>
  );
};

export default TopbarAdmin;
