'use client';

import { Spinner } from '@/components/loader';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { useCart } from '@/hooks/useCart';
import { ProductsWithImages } from '@/types';
import { GalleryThumbnails, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import ProductDetailImage from './ProductDetailImage';

export default function ProductDetail(product: ProductsWithImages) {
  const { addToCartMutation } = useCart();
  const isAdding = addToCartMutation.isPending;

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{product?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-[28rem_1fr] gap-4">
            <div className="relative w-full h-96">
              <ProductDetailImage
                product={product}
                prevButtonClassName="left-2"
                nextButtonClassName="right-2"
              />
            </div>
            <div className="flex flex-col justify-between p-2">
              <div className="flex flex-col gap-3">
                <p>Price: ${product?.price?.toFixed(2)}</p>
                <p>Quantity: {product?.quantity}</p>
                <p>Category: {product?.category}</p>
                <p className="text-gray-600 line-clamp">
                  {product?.description || 'No Description Available'}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  className="cursor-pointer"
                  disabled={isAdding}
                  onClick={() =>
                    addToCartMutation.mutateAsync({
                      productId: product.id,
                      productName: product.name,
                    })
                  }
                >
                  {isAdding ? (
                    <>
                      Adding... <Spinner />
                    </>
                  ) : (
                    <>
                      Add to cart <ShoppingCart />
                    </>
                  )}
                </Button>
                <Button className="bg-gray-400" asChild>
                  <Link href={`/products/catalog?id=${product.id}`}>
                    View Catalog <GalleryThumbnails />
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/products">Back to Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
