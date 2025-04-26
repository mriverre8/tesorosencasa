import React from 'react';
import { User } from '@supabase/supabase-js';
import { signout } from '@/actions/signout';

interface ProfileProps {
  user: User | null;
}

const ProfilePage = ({ user }: ProfileProps) => {
  return (
    <>
      <div className="flex bg-gradient-to-b from-white/60 to-[#f5f1e3] rounded-xl justify-center">
        <div className="flex flex-col w-full mt-24 px-6 mb-12">
          <div className="flex items-center justify-between flex-col sm:flex-row">
            <h1 className="text-2xl font-semibold text-center">
              Bienvenido/a {user?.email}
            </h1>
            <div className="flex gap-2 text-sm whitespace-nowrap">
              <button className="hover:text-yellow-400">Editar cuenta</button>
              <form action={signout}>
                <button type="submit" className="text-red-600">
                  Cerrar Sesión
                </button>
              </form>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="font-medium">Correo:</span> {user?.email}
            </p>
          </div>
        </div>
      </div>

      <h2 className="px-6 text-lg font-semibold ">Tesoros reservados</h2>
      <div className="relative overflow-x-auto mb-5 ">
        <table className="w-full text-xs  text-left rtl:text-right text-gray-500 sm:text-sm">
          <thead className="text-xs text-gray-700 uppercase  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre del producto
              </th>
              <th scope="col" className="px-6 py-3">
                Unidades
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b  border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">Pendiente</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600  hover:underline"
                >
                  Ver
                </a>
              </td>
            </tr>
            <tr className="border-b  border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">Pendiente</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600  hover:underline"
                >
                  Ver
                </a>
              </td>
            </tr>
            <tr className="border-b  border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">Pendiente</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600  hover:underline"
                >
                  Ver
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className=" w-full justify-center text-center pb-4  ">
        <p className="text-sm font-medium text-blue-600  hover:underline">
          Ver todos
        </p>
      </div>
    </>
  );
};

export default ProfilePage;
