import Layout from '@/components/Layout';
import HomePage from '@/pages/Home/HomePage';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';
import Alert from '@/components/Alert';

import { getAllProducts } from '@/actions/getAllProducts';

import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fetchedData = await getAllProducts();
  const tesorosData = fetchedData ?? [];

  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Topbar user={user} />
      <main>
        <Layout>
          <div className="flex flex-col mt-[90px] ">
            <Alert
              type={1}
              text={'El tablón de anuncios estará disponible proximamente.'}
            />
            <HomePage tesorosData={tesorosData} />
          </div>
        </Layout>
      </main>
      <Footer />
    </div>
  );
}
