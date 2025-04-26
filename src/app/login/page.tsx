import Layout from '@/components/Layout';
import Login from '@/pages/User/Login';

export default function LoginPage() {
  return (
    <main>
      <Layout>
        <div className=" mt-[17vh] flex justify-center ">
          <Login />
        </div>
      </Layout>
    </main>
  );
}
