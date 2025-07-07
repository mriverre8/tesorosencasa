import React from 'react';
import './globals.css';
import { Parkinsans } from 'next/font/google';
import ModalContainer from '@/components/ModalContainer';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.className}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Tesoros en Casa" />
      </head>
      <body>
        {children}
        <ModalContainer />
      </body>
    </html>
  );
}
