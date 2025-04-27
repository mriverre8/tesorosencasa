import Footer from '@/components/Footer';
import Topbar from '@/components/Topbar';
import { createClient } from '@/utils/supabase/server';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Topbar user={user} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
