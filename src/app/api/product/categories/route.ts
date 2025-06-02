import { ProductCategory } from '@/generated/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const enumValues = Object.values(ProductCategory);
  return NextResponse.json({ data: enumValues });
}
