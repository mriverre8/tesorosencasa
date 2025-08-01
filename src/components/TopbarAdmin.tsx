'use client';

import { signout } from '@/actions/signout';
import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import useLoader from '@/hooks/useLoader';
import useLightboxOptions from '@/hooks/useLightboxOptions';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';

const TopbarAdmin = () => {
  const translate = useTranslations();

  const [menuOpen, setMenuOpen] = useState(false);
  const lightboxLoader = useLoader();
  const lightboxOptions = useLightboxOptions();

  const handleSignOut = async () => {
    lightboxOptions.onClose();
    lightboxLoader.onOpen();
    const res = await signout();
    if (!res.error) {
      lightboxLoader.onClose();
      redirect('/');
    }
  };

  const openSignOutModal = () => {
    lightboxOptions.setContent(
      translate('SIGN_OUT'),
      translate('SIGN_OUT_CONFIRMATION'),
      translate('GO_BACK'),
      translate('SIGN_OUT'),
      true,
      handleSignOut
    );
    lightboxOptions.onOpen();
  };

  return (
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
            <Link
              href={'/products'}
              className="py-2 hover:bg-slate-100"
              onClick={() => setMenuOpen(false)}
            >
              Ver todos los Tesoros
            </Link>
            <Link
              href={'/stream'}
              className="py-2 hover:bg-slate-100"
              onClick={() => setMenuOpen(false)}
            >
              Proximo directo
            </Link>
            <button className="py-2 text-red-500" onClick={openSignOutModal}>
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopbarAdmin;
