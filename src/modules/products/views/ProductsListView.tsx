'use client';

import { useEffect, useState } from 'react';
import ProductsList from '../components/ProductsList';
import { getProductsAPI } from '../services';
import { ProductsWithImages } from '@/types';

function ProductsListView() {
  const [products, setProducts] = useState<ProductsWithImages[]>([]);

  const getProductData = async () => {
    const result = await getProductsAPI();
    setProducts(result?.data);
  };

  useEffect(() => {
    getProductData();
  }, []);
  // const products = getProducts();
  return (
    <div>
      <ProductsList products={products} />
    </div>
  );
}

export default ProductsListView;
