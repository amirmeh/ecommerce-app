'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ProductsWithImages } from '@/types';
import { getProductsAPI } from '@/modules/products/services';
import ProductDetailImage from '@/modules/products/components/ProductDetailImage';
import { Spinner } from '@/components/loader';

type ProductsResponse = Awaited<ReturnType<typeof getProductsAPI>>;

function CatalogList() {
  const params = useSearchParams();
  const id = params.get('id');

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<ProductsResponse, Error, ProductsWithImages[]>({
    queryKey: ['products'],
    queryFn: () => getProductsAPI(),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  if (isError || !products)
    return <div>Error in receiving products (catalog)</div>;

  const product = products.find((item) => item.id === id);
  if (!product) return <div>No product with this id</div>;

  return (
    <div className="w-[50rem] h-[35rem]">
      <ProductDetailImage product={product} />
    </div>
  );
}

export default CatalogList;
