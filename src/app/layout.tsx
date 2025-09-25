import React from 'react';
import './globals.css';
import { Parkinsans } from 'next/font/google';
import ModalContainer from '@/components/common/ModalContainer';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

const font = Parkinsans({ subsets: ['latin'] });

export const metadata = {
  title: 'Tesoros en Casa',
  description:
    'Explora una cuidada selección de piezas antiguas con historia y carácter.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={font.className}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Tesoros en Casa" />
      </head>
      <body>
        <NextIntlClientProvider>
          {children}
          <ModalContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
