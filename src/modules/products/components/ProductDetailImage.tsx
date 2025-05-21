'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';

type Props = {
  images: { image: string }[];
  productName: string;
};

export const ProductDetailImage = ({ images, productName }: Props) => {
  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
        No Image Available
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <Card className="py-0 overflow-hidden">
        <CardContent className="relative aspect-square h-96 w-full flex items-center justify-center p-6">
          <Image
            src={images[0].image}
            alt={`${productName}`}
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
            priority
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Carousel opts={{ align: 'end', loop: false }}>
      <CarouselContent>
        {images.map((img, idx) => (
          <CarouselItem key={idx}>
            <Card className="py-0 overflow-hidden">
              <CardContent className="relative aspect-square h-96 w-full flex items-center justify-center p-6">
                <Image
                  src={img.image}
                  alt={`${productName} imageNumber:${idx + 1}`}
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
  );
};
