import { prisma } from '@/lib/prisma';

export async function mergeGuestCartToUser(guestId: string, userId: string) {
  const guestCart = await prisma.cart.findUnique({
    where: { guestId },
    include: { items: true },
  });

  if (!guestCart) return;

  let userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: { userId },
      include: { items: true },
    });
  }

  const existingItemsMap = new Map(
    userCart.items.map((item) => [item.productId, item]),
  );

  for (const guestItem of guestCart.items) {
    const existing = existingItemsMap.get(guestItem.productId);
    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + guestItem.quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: guestItem.productId,
          quantity: guestItem.quantity,
        },
      });
    }
  }

  await prisma.cartItem.deleteMany({ where: { cartId: guestCart.id } });
  await prisma.cart.delete({ where: { id: guestCart.id } });
}
