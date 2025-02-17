import Topbar from '@/components/Topbar';
import './globals.css';
import Footer from '@/components/Footer';
import { Parkinsans } from 'next/font/google';

const font = Parkinsans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-[#f5f1e3]`}>
        <Topbar />
        <div className="h-full ">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
