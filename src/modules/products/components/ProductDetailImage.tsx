import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import { ProductsWithImages } from '@/types';
import Image from 'next/image';

type Props = {
  product: ProductsWithImages;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
};

const ProductDetailImage = ({
  product,
  prevButtonClassName,
  nextButtonClassName,
}: Props) => {
  if (!product.images || product.images.length === 0) {
    return (
      <div className="w-full h-full p-2">
        <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
          No Image Available
        </div>
      </div>
    );
  }

  if (product.images.length === 1) {
    return (
      <div className="w-full h-full p-2">
        <Card className="w-full h-full py-0 overflow-hidden">
          <CardContent className="relative w-full h-full flex items-center justify-center">
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
      </div>
    );
  }

  return (
    <Carousel opts={{ align: 'end', loop: false }} className="w-full h-full">
      <CarouselContent className="w-full h-full">
        {product.images.map((img, idx) => (
          <CarouselItem key={idx} className="p-2">
            <Card className="w-full h-full py-0 overflow-hidden">
              <CardContent className="relative w-full h-full flex items-center justify-center">
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
      <CarouselPrevious className={prevButtonClassName} />
      <CarouselNext className={nextButtonClassName} />
    </Carousel>
  );
};

export default ProductDetailImage;
