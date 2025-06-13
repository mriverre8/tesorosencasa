'use client';

import React /* , { useState } */ from 'react';
import Link from 'next/link';
import Layout from './Layout';
import { translate } from '@/locales/translate';
import { MdAdminPanelSettings } from 'react-icons/md';

interface Props {
  isAdminLogged: boolean;
}

const Topbar = ({ isAdminLogged }: Props) => {
  return (
    <nav className="bg-white bg-opacity-80 backdrop-blur-md fixed top-0 w-full border-b z-50">
      <Layout>
        <div className="flex justify-between items-center h-[69px]">
          <div className="flex items-center">
            <div className="flex gap-2 text-3xl font-bold whitespace-nowrap text-secondary">
              <h1 className="text-primary">{translate('TESOROS_EN_CASA_1')}</h1>
              <h1>{translate('TESOROS_EN_CASA_2')}</h1>
            </div>
          </div>
          <Link href={isAdminLogged ? '/createproduct' : '/login'}>
            <MdAdminPanelSettings
              size={24}
              className="text-secondary hover:text-secondary-hover cursor-pointer"
            />
          </Link>
        </div>
      </Layout>
    </nav>
  );
};

export default Topbar;
