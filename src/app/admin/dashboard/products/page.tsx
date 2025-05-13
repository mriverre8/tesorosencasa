import { getAllProducts } from '@/actions/getAllProducts';
import DashboardProductsPage from '@/pages/Admin/DashboardProductsPage/DashboardProductsPage';

export default async function Products() {
  const fetchedData = await getAllProducts();
  const tesorosData = fetchedData ?? [];
  return (
    <div className="bg-background">
      <main>
        <DashboardProductsPage tesorosData={tesorosData} />
      </main>
    </div>
  );
}
