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
    <html lang="en">
      <body className={`${font.className}`}>
        <div className="block sm:hidden">{children}</div>
        <div className="hidden sm:block bg-background h-screen">
          {/* Mostrar texto en pantallas grandes */}
          <LightboxError isLightboxOpen={true} />
        </div>
      </body>
    </html>
  );
}
