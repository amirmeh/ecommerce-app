import ProductDetailView from '@/modules/products/views/ProductDetailView';
import { Suspense } from 'react';
import Loading from '@/app/(private)/loading';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const data = await params;
  const { id } = data;
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ProductDetailView id={id} />
      </Suspense>
    </div>
  );
};

export default page;
