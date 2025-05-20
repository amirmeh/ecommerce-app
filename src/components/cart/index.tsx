'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button,
} from '@/components/ui';
import { useCart } from '@/hooks';
import { CartWithProduct } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Spinner } from '../loader';

export default function CartDropdown() {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative cursor-pointer">
          <ShoppingCart size={24} />
          {cart?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-4">
        <h4 className="text-lg font-semibold mb-2">Cart Items</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : !cart || cart?.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-3">
            {cart?.map((item: CartWithProduct) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-xs text-gray-500">
                    Price: ${item.product.price?.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={removingIds.has(item.product.id)}
                  onClick={() =>
                    handleRemove(item.product.id, item.product.name)
                  }
                  className="cursor-pointer"
                >
                  {removingIds.has(item.product.id) ? (
                    <>
                      Removing... <Spinner />
                    </>
                  ) : (
                    '✕'
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
