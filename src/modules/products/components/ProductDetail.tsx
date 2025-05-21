'use client';

import { Spinner } from '@/components/loader';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import { useCart } from '@/hooks/useCart';
import { ProductsWithImages } from '@/types';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { ProductDetailImage } from './ProductDetailImage';

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
                images={product?.images ?? []}
                productName={product?.name ?? 'Product'}
              />
              {/*  {product?.images.length === 0 ? (
                <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
                  No Image Available
                </div>
              ) : product?.images.length === 1 ? (
                <Card className="py-0 overflow-hidden">
                  <CardContent className="relative aspect-square h-96 w-full flex items-center justify-center p-6">
                    <Image
                      src={product.images[0].image}
                      alt={`${product.name}`}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="rounded-lg"
                      priority
                    />
                  </CardContent>
                </Card>
              ) : product?.images.length > 1 ? (
                <Carousel opts={{ align: 'end', loop: false }}>
                  <CarouselContent>
                    {product.images.map((img, idx) => (
                      <CarouselItem
                        key={idx}
                        // use the className below if you want to delete <Card> and <CardContent>
                        // className="relative w-full h-96"
                      >
                        <Card className="py-0 overflow-hidden">
                          <CardContent className="relative aspect-square h-96 w-full flex items-center justify-center p-6">
                            <Image
                              src={img.image}
                              alt={`${product.name} imageNumber:${idx + 1}`}
                              fill
                              style={{ objectFit: 'contain' }}
                              className="rounded-lg"
                              priority={idx === 0}
                            />
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              ) : null} */}
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
