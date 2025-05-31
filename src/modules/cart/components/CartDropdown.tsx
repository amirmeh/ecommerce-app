'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button,
} from '@/components/ui';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '../hooks';
import CartItemList from './CartItemList';
import Link from 'next/link';
import { CartWithProduct } from '@/types';
import { usePathname } from 'next/navigation';

export default function CartDropdown() {
  const { cart, refetch } = useCart();
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  const totalQuantity =
    cart?.reduce(
      (sum: number, item: CartWithProduct) => sum + item.quantity,
      0,
    ) ?? 0;

  const totalPrice =
    cart?.reduce((sum: number, item: CartWithProduct) => {
      return sum + (item.product.price ?? 0) * item.quantity;
    }, 0) ?? 0;

  return (
    <DropdownMenu
      open={isCartDropdownOpen}
      onOpenChange={setIsCartDropdownOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative cursor-pointer">
          <ShoppingCart size={24} />
          {cart?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalQuantity}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4">
        <h4 className="text-xl font-semibold">Cart Items</h4>
        <div className="flex flex-col my-2 mb-3 gap-y-3">
          <div className="flex flex-col">
            <p>
              <span className="text-lg">Subtotal:</span>
              <span className="text-xl font-semibold">{` $${totalPrice}`}</span>
            </p>
            <p className="text-sm">{`${totalQuantity} ${
              totalQuantity === 1 ? 'item' : 'items'
            } (across ${cart?.length} ${cart?.length === 1 ? 'product' : 'products'})`}</p>
          </div>
          <Link href="/cart">
            <Button
              variant={'secondary'}
              className="cursor-pointer"
              onClick={() => setIsCartDropdownOpen(false)}
            >
              Go to cart
            </Button>
          </Link>
        </div>
        <CartItemList />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
