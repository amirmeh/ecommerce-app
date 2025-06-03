'use server';

import { Product } from '@/generated/prisma';
import { getRuntimeConfig } from '@/lib/config';
import { prisma } from '@/lib/prisma';
import { ProductsWithImages } from '@/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const getProducts = async () => {
  const result = await prisma.product.findMany({ include: { images: true } });
  return result;
};

// export const getProductsAPI = async () => {
//   // const result = await fetch('/api/product');
//   const result = await fetch('http://localhost:3000/api/product', {
//     next: { revalidate: 30 },
//   });
//   const response = await result.json();
//   return response;
// };

type ProductQueryParams = {
  search?: string;
  sort?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
};

export const getProductsAPI = async (
  params: ProductQueryParams = {},
): Promise<{
  data: ProductsWithImages[];
  total: number;
  page: number;
  totalPages: number;
}> => {
  const query = new URLSearchParams();

  if (params.search) query.append('search', params.search);
  if (params.sort) query.append('sort', params.sort);
  if (params.category) {
    params.category.split(',').forEach((cat) => {
      query.append('category', cat);
    });
  }
  if (params.minPrice !== undefined)
    query.append('minPrice', params.minPrice.toString());
  if (params.maxPrice !== undefined)
    query.append('maxPrice', params.maxPrice.toString());
  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());

  const { baseUrl } = getRuntimeConfig();
  const result = await fetch(`${baseUrl}/api/product?${query.toString()}`);
  const response = await result.json();
  return response;
};

export const getProductCategories = async (): Promise<string[]> => {
  const { baseUrl } = getRuntimeConfig();
  const res = await fetch(`${baseUrl}/api/product/categories`);
  const json = await res.json();
  return json.data;
};

export const getProductsById = async (id: string) => {
  const result = await prisma.product.findFirst({
    where: { id },
    include: { images: true },
  });
  if (!result) {
    return null;
  }
  return result;
};

export const upsertProduct = async (product: Product) => {
  let result;
  const { id } = product;
  if (id) {
    result = await prisma.product.update({
      where: {
        id,
      },
      data: product,
    });
  } else {
    result = await prisma.product.create({
      data: product,
    });
  }

  revalidatePath('/dashboard/products');

  return result;
};

export const deleteProduct = async (id: string) => {
  await prisma.product.delete({ where: { id } });
  redirect('/dashboard/products');
};
