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
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
            <div className="w-full h-96">
              {product?.images.length > 0 ? (
                <Image
                  src={product?.images[0].image}
                  alt={product?.name}
                  width={448}
                  height={348}
                  quality={50}
                  property="1"
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
                  No Image Available
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between">
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
