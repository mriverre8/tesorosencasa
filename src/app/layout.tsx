import React from 'react';
import './globals.css';
import { Parkinsans } from 'next/font/google';

const font = Parkinsans({ subsets: ['latin'] });

export const metadata = {
  title: 'Tesoros en Casa',
  description:
    'Explora una cuidada selección de piezas antiguas con historia y carácter.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      /* { url: '/favicon.svg', type: 'image/svg+xml' }, */
      { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-96.png', type: 'image/png', sizes: '96x96' },
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
      <body>{children}</body>
    </html>
  );
}
