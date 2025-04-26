'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Layout from './Layout';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserCircle } from 'react-icons/fa';
import { FaBagShopping } from 'react-icons/fa6';
import { User } from '@supabase/supabase-js';

interface Props {
  user: User | null;
}

const TopbarClient = ({ user }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-white bg-opacity-80 backdrop-blur-md fixed top-0 w-full border-b z-50">
      <Layout>
        <div className="flex justify-between items-center relative h-[69px]">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex gap-2 text-3xl font-bold whitespace-nowrap text-green-600"
            >
              <h1 className="text-yellow-400">Tesoros</h1>
              <h1>en Casa</h1>
            </Link>
          </div>

          <div className="hidden sm:flex gap-5 text-sm items-center">
            {!user ? (
              <>
                <Link href="/login" className="hover:text-yellow-400">
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-green-600 text-white rounded-full py-1 px-3 hover:bg-green-500"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                <div className="flex gap-2 justify-center items-center">
                  <Link href="/profile" className=" hover:text-yellow-400">
                    Perfil
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="sm:hidden">
            <GiHamburgerMenu
              size={24}
              className="text-green-600 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>

        <div
          className={`sm:hidden gap-5 pt-3 pb-5 text-center ${isMenuOpen ? 'block' : 'hidden'} flex flex-col`}
        >
          {!user ? (
            <>
              <Link href="/login" className="hover:text-yellow-400">
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="bg-green-600 text-white rounded-full py-1 px-3 hover:bg-green-500"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <div className="flex gap-2 justify-center items-center">
                <Link href="/profile" className=" hover:text-yellow-400">
                  Perfil
                </Link>
              </div>
            </>
          )}
        </div>
      </Layout>
    </nav>
  );
};

export default TopbarClient;
