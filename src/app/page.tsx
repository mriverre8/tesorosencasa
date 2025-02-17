import HomeHeader from '@/pages/Home/HomeHeader';
import HomeProducts from '@/pages/Home/HomeProducts';
import { Tesoro } from '@/types/tesoro';
import tesoros from '@/mocks/tesoros.json';
import Layout from '@/components/Layout';

export default async function Home() {
  const tesorosData: Tesoro[] = tesoros;

  return (
    <main>
      <Layout>
        <div className="flex flex-col mt-[99px] ">
          <section id="header">
            <HomeHeader />
          </section>
          <section id="products">
            <HomeProducts tesorosData={tesorosData} />
          </section>
        </div>
      </Layout>
    </main>
  );
}
