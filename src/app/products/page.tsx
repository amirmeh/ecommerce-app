import { prisma, PrismaType } from '@/lib/prisma';
import ProductsListView from '@/modules/products/views/ProductsListView';

async function Products() {
  const data: PrismaType.Product[] = await prisma.product.findMany();
  // console.log(data);
  return (
    <div>
      <ProductsListView />
    </div>
  );
}

export default Products;
