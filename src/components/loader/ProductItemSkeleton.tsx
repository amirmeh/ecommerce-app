'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton,
} from '@/components/ui';

export function ProductItemSkeleton() {
  return (
    <div className="flex flex-wrap justify-between items-center w-full gap-10">
      {Array.from({ length: 10 }, (_key, index) => (
        <Card key={index} className="w-[350px]">
          <CardHeader>
            <div className="relative w-full h-[300px]">
              <Skeleton className="rounded-t-lg w-full h-full" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            {/* Product Name */}
            <Skeleton className="h-7 w-3/5" />
            {/* Product Category */}
            <Skeleton className="h-6 w-2/5" />
            <div className="flex justify-between items-center mt-4">
              {/* Product Price */}
              <Skeleton className="h-7 w-1/3" />
              <div className="flex gap-2">
                {/* Heart Button */}
                <Skeleton className="size-6" />
                {/* GalleryThumbnails Button */}
                <Skeleton className="size-6" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {/* More Details Button */}
            <Skeleton className="w-full h-9" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
