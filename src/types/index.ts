import { Prisma } from '@/generated/prisma';

export type ProductsWithImages = Prisma.ProductGetPayload<{
  include: { images: true };
}>;
