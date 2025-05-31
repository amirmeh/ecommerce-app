export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { getOrCreateGuestProfile } from '@/lib/guest';

export async function GET(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  let cart;

  if (userId) {
    cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: { include: { product: { include: { images: true } } } },
      },
    });
  } else {
    const guest = await getOrCreateGuestProfile(req);
    cart = await prisma.cart.findFirst({
      where: { guestId: guest.id },
      include: {
        items: { include: { product: { include: { images: true } } } },
      },
    });
  }

  if (cart) {
    return NextResponse.json(cart.items);
  }

  return NextResponse.json([]);
}

export async function POST(req: NextRequest) {
  const { productId } = await req.json();
  const user = await currentUser();
  const userId = user?.id;

  let cart;

  if (userId) {
    cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }
  } else {
    const guest = await getOrCreateGuestProfile(req);
    cart = await prisma.cart.findFirst({
      where: { guestId: guest.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { guestId: guest.id },
      });
    }
  }

  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
    },
  });

  if (existingCartItem) {
    const updatedItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    });

    return NextResponse.json(updatedItem);
  } else {
    const newCartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });

    return NextResponse.json(newCartItem);
  }
}

export async function DELETE(req: NextRequest) {
  const { productId } = await req.json();
  const user = await currentUser();
  const userId = user?.id;

  let cart;

  if (userId) {
    cart = await prisma.cart.findFirst({
      where: { userId },
    });
  } else {
    const guest = await getOrCreateGuestProfile(req);
    cart = await prisma.cart.findFirst({
      where: { guestId: guest.id },
    });
  }

  if (!cart) {
    return NextResponse.json({ success: true });
  }

  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
    },
  });

  if (existingCartItem) {
    await prisma.cartItem.delete({
      where: { id: existingCartItem.id },
    });
  }

  return NextResponse.json({ success: true });
}
