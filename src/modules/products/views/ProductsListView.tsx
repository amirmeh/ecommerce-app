'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductsAPI } from '../services';
import ProductsList from '../components/ProductsList';
import { ProductsWithImages } from '@/types';
import { ProductItemSkeleton } from '@/components/loader';

export default function ProductsListView() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<ProductsWithImages[]>({
    queryKey: ['products'],
    queryFn: getProductsAPI,
    staleTime: 1000 * 60 * 5, // 5 Minutes
  });

  if (isLoading) return <ProductItemSkeleton />;
  if (isError) return <div>Error in receiving products</div>;

  return <ProductsList products={products ?? []} />;
}
