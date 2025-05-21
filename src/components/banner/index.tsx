'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Card,
  CardContent,
} from '@/components/ui';

import IMG1 from './image/ipad.jpg';
import IMG2 from './image/iphone.jpg';
import IMG3 from './image/macbook.jpg';
import IMG4 from './image/pencil.jpg';
import IMG5 from './image/watch.jpg';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

function Banner() {
  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {[IMG1, IMG2, IMG3, IMG4, IMG5].map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="py-0 overflow-hidden">
                <CardContent className="relative aspect-square h-[400px] w-full flex items-center justify-center p-6">
                  <Image
                    src={image}
                    alt="Banner"
                    fill
                    className="object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Banner;
