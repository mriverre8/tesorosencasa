import Footer from '@/components/Footer';
import TopbarServer from '@/components/TopbarServer';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopbarServer />
      <main>{children}</main>
      <Footer />
    </>
  );
}
