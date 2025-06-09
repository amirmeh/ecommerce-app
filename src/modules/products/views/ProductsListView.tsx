'use client';

import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductCategories, getProductsAPI } from '../services';
import ProductsList from '../components/ProductsList';
import { ProductItemSkeleton } from '@/components/loader';
import ProductsPagination from '../components/filters/ProductsPagination';
import ProductSidebar from '../components/ProductSidebar';
import { SidebarInset } from '@/components/ui';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProductsListView() {
  const [categories, setCategories] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get('search') ?? '';
  const sort = searchParams.get('sort') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1', 10);

  const categoryParams = searchParams.getAll('category');
  const minPrice = parseInt(searchParams.get('minPrice') ?? '0', 10);
  const maxPrice = parseInt(searchParams.get('maxPrice') ?? '10000', 10);

  const filters = {
    categories: categoryParams,
    minPrice,
    maxPrice,
  };

  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', search, filters, sort, page],
    queryFn: () =>
      getProductsAPI({
        search,
        sort,
        category: filters.categories.join(','),
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        page,
        limit,
      }),
    staleTime: 1000 * 60 * 5,
  });

  const handleSearch = (value: string) => {
    if (value === search) return;
    const params = new URLSearchParams(searchParams);
    if (value) params.set('search', value);
    else params.delete('search');
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  const handleSort = (value: string) => {
    if (value === sort) return;
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === page) return;
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`/products?${params.toString()}`);
  };

  const handleApplyFilters = useCallback(
    (filters: { categories: string[]; minPrice: number; maxPrice: number }) => {
      const params = new URLSearchParams(searchParams);
      params.delete('category');
      filters.categories.forEach((cat) => {
        params.append('category', cat);
      });
      params.set('minPrice', filters.minPrice.toString());
      params.set('maxPrice', filters.maxPrice.toString());
      params.set('page', '1');
      router.push(`/products?${params.toString()}`);
    },
    [searchParams, router],
  );

  useEffect(() => {
    getProductCategories().then(setCategories);
  }, []);

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div className="sticky top-22 self-start h-fit">
        <ProductSidebar
          onSearch={handleSearch}
          onSort={handleSort}
          sort={sort}
          onApplyFilters={handleApplyFilters}
          categories={categories}
        />
      </div>

      {/* Main content */}
      <SidebarInset className="px-4">
        {!isLoading && !isError && Array.isArray(data?.data) ? (
          <div className="flex flex-col justify-center">
            <ProductsList products={data.data} />
            <ProductsPagination
              page={page}
              totalPages={data?.totalPages ?? 1}
              onPageChange={handlePageChange}
            />
          </div>
        ) : isLoading ? (
          <ProductItemSkeleton />
        ) : isError ? (
          <div>Error in receiving products (products list)</div>
        ) : (
          <div>No products found.</div>
        )}
      </SidebarInset>
    </div>
  );
}
