'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';

// Actions
import { signout } from '@/actions/signout';

// Components
import Layout from '@/components/Layout';

// Icons
import { GiHamburgerMenu } from 'react-icons/gi';

// Hooks
import useLoader from '@/hooks/useLoader';
import useLightboxOptions from '@/hooks/useLightboxOptions';
import { useTranslations } from 'next-intl';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useRouter } from 'next/navigation';

const TopbarAdmin = () => {
  const translate = useTranslations();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const lightboxLoader = useLoader();
  const lightboxOptions = useLightboxOptions();

  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(menuRef, menuOpen, setMenuOpen);

  const handleSignOut = async () => {
    lightboxOptions.onClose();
    lightboxLoader.onOpen();
    const res = await signout();
    if (!res.error) {
      lightboxLoader.onClose();
      router.push('/');
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
    <div className="fixed top-0 left-0 w-full z-50" ref={menuRef}>
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

      {menuOpen && (
        <div className="md:hidden absolute top-12 left-0 w-full bg-white bg-opacity-80 backdrop-blur-md border-b p-5 z-40">
          <div className="flex flex-col text-center">
            <Link
              href={'/'}
              className="py-2 hover:bg-slate-100"
              onClick={() => setMenuOpen(false)}
            >
              {translate('HOME')}
            </Link>
            <Link
              href={'/products'}
              className="py-2 hover:bg-slate-100"
              onClick={() => setMenuOpen(false)}
            >
              {translate('ADMIN_TREASAURES')}
            </Link>
            <Link
              href={'/stream'}
              className="py-2 hover:bg-slate-100"
              onClick={() => setMenuOpen(false)}
            >
              {translate('ADMIN_NEXT_STREAM')}
            </Link>
            <button className="py-2 text-red-500" onClick={openSignOutModal}>
              {translate('SIGN_OUT')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopbarAdmin;
