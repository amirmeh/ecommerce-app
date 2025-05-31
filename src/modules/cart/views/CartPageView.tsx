'use client';

import CartItemList from '@/modules/cart/components/CartItemList';
import { useCart } from '@/modules/cart/hooks';
import { CartWithProduct } from '@/types';

function CartPageView() {
  const { cart } = useCart();

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
    <div>
      <h4 className="text-xl font-semibold">Cart Items</h4>
      <div className="flex flex-col my-2 mb-3 gap-y-3">
        <div className="flex flex-col">
          <p>
            <span className="text-lg">Subtotal:</span>
            <span className="text-xl font-semibold">{` $${totalPrice}`}</span>
          </p>
          <p className="text-sm">{`${totalQuantity} ${
            totalQuantity === 1 ? 'item' : 'items'
          } (across ${cart.length} ${cart.length === 1 ? 'product' : 'products'})`}</p>
        </div>
      </div>
      <CartItemList imageSize="150px" />
    </div>
  );
}

export default CartPageView;
