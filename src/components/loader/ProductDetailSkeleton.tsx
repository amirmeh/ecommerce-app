'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@/components/ui';

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>
            {/* Product Name */}
            <Skeleton className="h-8 w-1/3" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-[28rem_1fr] gap-4">
            <div className="w-full h-96 p-2">
              {/* Product Image */}
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
            <div className="flex flex-col justify-between p-2">
              <div className="flex flex-col gap-3">
                {/* Product Price */}
                <Skeleton className="h-6 w-1/3" />
                {/* Product Quantity */}
                <Skeleton className="h-6 w-1/4" />
                {/* Product Category */}
                <Skeleton className="h-6 w-1/2" />
                {/* Product Description */}
                <Skeleton className="h-6 w-2/3" />
              </div>
              <div className="flex flex-col gap-3">
                {/* Add to Cart Button */}
                <Skeleton className="h-9" />
                {/* View Catalog Button */}
                <Skeleton className="h-9" />
                {/* Back to Products Button */}
                <Skeleton className="h-9" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
