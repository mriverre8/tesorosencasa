'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Layout from './Layout';
import { GiHamburgerMenu } from 'react-icons/gi';

import { User } from '@supabase/supabase-js';

interface Props {
  user: User | null;
}

const Topbar = ({ user }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-white bg-opacity-80 backdrop-blur-md fixed top-0 w-full border-b z-50">
      <Layout>
        <div className="flex justify-between items-center relative h-[69px]">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex gap-2 text-3xl font-bold whitespace-nowrap text-secondary"
            >
              <h1 className="text-primary">Tesoros</h1>
              <h1>en Casa</h1>
            </Link>
          </div>
          <GiHamburgerMenu
            size={24}
            className="text-secondary cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        <div
          className={`gap-5 pt-3 pb-5 text-center ${isMenuOpen ? 'block' : 'hidden'} flex flex-col`}
        >
          {!user ? (
            <>
              <Link href="/login" className="hover:text-primary">
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="bg-secondary hover:bg-secondary-hover text-white rounded-full py-1 px-3"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <Link href="/" className=" hover:text-primary">
                Catálogo
              </Link>
              <Link href="/profile" className=" hover:text-primary">
                Perfil
              </Link>
            </>
          )}
        </div>
      </Layout>
    </nav>
  );
};

export default Topbar;
