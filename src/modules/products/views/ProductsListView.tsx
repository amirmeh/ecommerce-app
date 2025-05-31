'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductsAPI } from '../services';
import ProductsList from '../components/ProductsList';
import { ProductsWithImages } from '@/types';
import { ProductItemSkeleton } from '@/components/loader';
import { useState } from 'react';
import ProductSearchInput from '../components/ProductSearchInput';

export default function ProductsListView() {
  const [search, setSearch] = useState('');

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<ProductsWithImages[]>({
    queryKey: ['products', search],
    queryFn: () => getProductsAPI(search),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <ProductSearchInput onSearch={setSearch} />
      {isLoading ? (
        <ProductItemSkeleton />
      ) : isError ? (
        <div>Error in receiving products</div>
      ) : (
        <ProductsList products={products ?? []} />
      )}
    </>
  );
}
