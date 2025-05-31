import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('search')?.trim() || '';
  const sort = req.nextUrl.searchParams.get('sort') || '';
  const category = req.nextUrl.searchParams.get('category') as
    | 'MOBILE'
    | 'LAPTOP'
    | 'WATCH'
    | 'OTHER'
    | undefined;

  const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10', 10);
  const skip = (page - 1) * limit;

  const conditions: any[] = [];

  if (search) {
    conditions.push({
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ],
    });
  }

  if (category) {
    conditions.push({ category });
  }

  const where = conditions.length > 0 ? { AND: conditions } : undefined;

  let orderBy: any = undefined;
  switch (sort) {
    case 'price-asc':
      orderBy = { price: 'asc' };
      break;
    case 'price-desc':
      orderBy = { price: 'desc' };
      break;
    case 'name-desc':
      orderBy = { name: 'desc' };
      break;
    default:
      orderBy = { name: 'asc' };
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { images: true },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({
    data: products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
