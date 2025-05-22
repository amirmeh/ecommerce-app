'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ProductsWithImages } from '@/types';
import { getProductsAPI } from '@/modules/products/services';
import { Spinner } from '../loader';
import ProductDetailImage from '@/modules/products/components/ProductDetailImage';

function CatalogList() {
  const params = useSearchParams();
  const id = params.get('id');

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<ProductsWithImages[]>({
    queryKey: ['products'],
    queryFn: getProductsAPI,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (isError || !products) return <div>Error in receiving products</div>;

  const product = products.find((item) => item.id === id);

  if (!product) return <div>No product with this id</div>;

  return (
    <div className="w-[50rem] h-[35rem]">
      <ProductDetailImage product={product} />
    </div>
  );
}

export default CatalogList;
