import Layout from '@/components/Layout';
import HomePage from '@/pages/Home/HomePage';
import Footer from '@/components/Footer';
import TopbarServer from '@/components/TopbarServer';

import { getAllProducts } from '@/actions/getAllProducts';

export default async function Home() {
  const fetchedData = await getAllProducts();
  const tesorosData = fetchedData ?? [];

  return (
    <>
      <TopbarServer />
      <main>
        <Layout>
          <div className="flex flex-col mt-[90px] ">
            <HomePage tesorosData={tesorosData} />
          </div>
        </Layout>
      </main>
      <Footer />
    </>
  );
}
