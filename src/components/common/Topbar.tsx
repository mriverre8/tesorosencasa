'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Actions
import { signout } from '@/actions/signout';

// Components
import Layout from './Layout';

// Icons
import { MdAdminPanelSettings } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';

// Hooks
import useLoader from '@/hooks/useLoader';
import useLightboxOptions from '@/hooks/useLightboxOptions';
import { useTranslations } from 'next-intl';
import { useClickOutside } from '@/hooks/useClickOutside';

// Supabase
import { createClient } from '@/utils/supabase/client';

interface Props {
  isUserLoggedIn?: boolean;
}

const Topbar = ({ isUserLoggedIn: initialUserState }: Props) => {
  const translate = useTranslations();
  const router = useRouter();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    initialUserState ?? false
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const lightboxLoader = useLoader();
  const lightboxOptions = useLightboxOptions();

  const menuRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(menuRef, menuOpen, setMenuOpen);

  // Check authentication status on client side
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsUserLoggedIn(user != null);
    };

    if (initialUserState === undefined) {
      checkAuth();
    }
  }, [initialUserState]);

  const handleAuthClick = () => {
    router.push('/login');
  };

  const handleSignOut = async () => {
    lightboxOptions.onClose();
    lightboxLoader.onOpen();
    const res = await signout();
    if (!res.error) {
      lightboxLoader.onClose();
      setIsUserLoggedIn(false);
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

  // Render admin topbar when user is logged in
  if (isUserLoggedIn) {
    return (
      <>
        <div className="fixed top-0 left-0 w-full z-50" ref={menuRef}>
          <nav className="bg-white bg-opacity-80 backdrop-blur-md w-full border-b">
            <Layout>
              <div className="flex justify-between items-center relative h-[69px]">
                <div className="flex items-center">
                  <Link
                    className="flex gap-2 text-3xl font-bold whitespace-nowrap text-secondary select-none"
                    href={'/'}
                  >
                    <h1 className="text-primary">
                      {translate('TESOROS_EN_CASA_1')}
                    </h1>
                    <h1>{translate('TESOROS_EN_CASA_2')}</h1>
                  </Link>
                </div>

                <GiHamburgerMenu
                  size={24}
                  className="text-secondary cursor-pointer md:hidden block"
                  onClick={() => setMenuOpen(!menuOpen)}
                />
                <nav className="hidden md:flex gap-6 items-center text-sm">
                  <Link
                    href={'/products'}
                    className="py-2 hover:text-primary whitespace-nowrap"
                    onClick={() => setMenuOpen(false)}
                  >
                    {translate('ADMIN_TREASAURES')}
                  </Link>
                  <Link
                    href={'/stream'}
                    className="py-2 hover:text-primary whitespace-nowrap"
                    onClick={() => setMenuOpen(false)}
                  >
                    {translate('ADMIN_NEXT_STREAM')}
                  </Link>
                  <button
                    className="py-2 text-red-500 hover:underline whitespace-nowrap"
                    onClick={openSignOutModal}
                  >
                    {translate('SIGN_OUT')}
                  </button>
                </nav>
              </div>
            </Layout>
          </nav>

          {menuOpen && (
            <div className="absolute top-[69px] left-0 w-full bg-white bg-opacity-80 backdrop-blur-md border-b p-5 z-50">
              <div className="flex flex-col text-center">
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
                <button
                  className="py-2 text-red-500"
                  onClick={openSignOutModal}
                >
                  {translate('SIGN_OUT')}
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  // Render public topbar when no user is logged in
  return (
    <nav className="bg-white bg-opacity-80 backdrop-blur-md fixed top-0 w-full border-b z-50">
      <Layout>
        <div className="flex justify-between items-center h-[69px]">
          <div className="flex items-center">
            <Link
              className="flex gap-2 text-3xl font-bold whitespace-nowrap text-secondary cursor-pointer select-none"
              href={'/'}
            >
              <h1 className="text-primary">{translate('TESOROS_EN_CASA_1')}</h1>
              <h1>{translate('TESOROS_EN_CASA_2')}</h1>
            </Link>
          </div>
          <MdAdminPanelSettings
            size={24}
            className="text-secondary hover:text-secondary-hover cursor-pointer"
            onClick={handleAuthClick}
          />
        </div>
      </Layout>
    </nav>
  );
};

export default Topbar;
