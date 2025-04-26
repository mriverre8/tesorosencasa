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
      <body className={`${font.className} bg-[#f5f1e3]`}>{children}</body>
    </html>
  );
}
