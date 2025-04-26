'use client';

import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const AdminSidePanel = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Topbar para pantallas pequeñas */}
      <nav className="md:hidden bg-white bg-opacity-80 backdrop-blur-md   w-full border-b ">
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

            <GiHamburgerMenu
              size={24}
              className="text-green-600 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
        </Layout>
      </nav>

      {/* Menú desplegable en móviles */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white bg-opacity-80 backdrop-blur-md border-b p-5 z-40">
          <div className="flex flex-col text-center gap-2">
            <Link
              href={'/admin/dashboard/createproduct'}
              className="py-2 hover:bg-slate-100"
              onClick={() => setMenuOpen(false)}
            >
              Crea un Tesoro
            </Link>
            <Link
              href={'/admin/dashboard/products'}
              className="py-2 hover:bg-slate-100"
              onClick={() => setMenuOpen(false)}
            >
              Ver todos los Tesoros
            </Link>
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
  );
};

export default AdminSidePanel;
