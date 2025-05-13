import React from 'react';
import LightboxError from '@/components/Lightbox/LightboxError';
import './globals.css';
import { Parkinsans } from 'next/font/google';

const font = Parkinsans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <div className="block sm:hidden">{children}</div>
        <div className="hidden sm:block bg-background h-screen">
          {/* Mostrar texto en pantallas grandes */}
          <LightboxError isLightboxOpen={true} />
        </div>
      </body>
    </html>
  );
}
