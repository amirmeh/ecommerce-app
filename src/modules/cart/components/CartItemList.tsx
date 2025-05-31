'use client';

import { useEffect, useState } from 'react';
import { CartWithProduct } from '@/types';
import { Button } from '@/components/ui';
import { Spinner } from '@/components/loader';
import { useCart } from '../hooks';
import Image from 'next/image';

interface Props {
  imageSize?: string;
}

const CartItemList: React.FC<Props> = ({ imageSize = '3.5rem' }) => {
  const { cart, isLoading, removeCartItemMutation } = useCart();
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!cart) return;

    const idsInCart = new Set(cart.map((c: CartWithProduct) => c.product.id));

    setRemovingIds((prev) => {
      const next = new Set(prev);
      prev.forEach((id) => {
        if (!idsInCart.has(id)) next.delete(id);
      });
      return next;
    });
  }, [cart]);

  const handleRemove = async (productId: string, productName: string) => {
    setRemovingIds((prev) => new Set(prev).add(productId));
    await removeCartItemMutation.mutateAsync({
      productId,
      productName,
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (!cart || cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="space-y-3 border rounded-lg p-3">
      {cart.map((item: CartWithProduct) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b last:border-b-0 last:pb-0 pb-3"
        >
          <div className="flex items-center gap-4">
            <div
              className="relative border rounded-md"
              style={{ width: `${imageSize}`, height: `${imageSize}` }}
            >
              <Image
                src={item.product.images?.[0]?.image || '/assets/noImage.jpg'}
                alt={item.product.name}
                fill
                quality={50}
                className="p-1"
              />
            </div>
            <div>
              <p className="text-sm font-medium">{item.product.name}</p>
              <p className="text-xs text-gray-500">
                Price: ${item.product.price?.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            disabled={removingIds.has(item.product.id)}
            onClick={() => handleRemove(item.product.id, item.product.name)}
            className="cursor-pointer"
          >
            {removingIds.has(item.product.id) ? <Spinner size="10px" /> : '✕'}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CartItemList;
