import AdminSidePanel from '@/components/AdminSidePanel';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminSidePanel />
      <main>
        <div className="mt-[69px] md:ml-72 md:mt-0">
          <div className="block md:hidden">
            {/* Mostrar children en pantallas pequeñas */}
            {children}
          </div>
          <div className="hidden md:block">
            {/* Mostrar texto en pantallas grandes */}
            <p>Este es un texto que se muestra en pantallas grandes.</p>
          </div>
        </div>
      </main>
    </>
  );
}
