import Header from '@/components/Header';
import Link from 'next/link';
import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';

const HomeHeader = () => {
  return (
    <Header>
      <div className="flex flex-col gap-3 w-3/4 mx-auto items-center pt-20 pb-12 sm:pt-28 sm:pb-20">
        <p className="text-sm sm:text-lg font-medium text-gray-700 text-center whitespace-nowrap">
          Próxima venta en directo
        </p>
        <div className="flex flex-row gap-4 items-center justify-center rounded-2xl w-full max-w-md p-5 bg-white shadow-sm">
          <p className="text-5xl sm:text-7xl  font-bold ">25</p>
          <div className="flex flex-col items-start">
            <p className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Enero
            </p>
            <p className="text-sm sm:text-lg text-gray-600">18:00h</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-3">
          <Link
            href="/"
            className="flex items-center justify-center border border-green-600 hover:border-green-400 gap-1 mt-3 rounded-full py-0.5 px-3.5 text-sm whitespace-nowrap "
          >
            <FaRegCalendarAlt />
            Ver calendario
          </Link>

          <a
            href="https://www.instagram.com/tesoros_en_casa/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center border text-white bg-green-600 hover:bg-green-500 gap-1 mt-3 rounded-full py-1 px-4 text-sm "
          >
            <FaInstagram className="text-white" />
            Instagram
          </a>
        </div>
      </div>
    </Header>
  );
};

export default HomeHeader;
