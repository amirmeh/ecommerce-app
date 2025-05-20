'use client';

import { ShinyText } from '@/components/effect';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCart = () => {
  // get all cart items by query -->cart
  // add to cart --> addToCartMutation
  // delete from cart --> removeCartItemMutation
  const queryClient = useQueryClient();

  // fetch cart data
  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      // get data fro DB
      const res = await fetch('/api/cart/');
      if (!res.ok) throw new Error('Failed to fetch cart');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  // add to cart

  const addToCartMutation = useMutation({
    mutationFn: async (variables: {
      productId: string;
      productName: string;
    }) => {
      const { productId } = variables;
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: { 'Content-type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to add to cart');
      return res.json();
    },
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(
        <>
          <ShinyText
            text={variables.productName}
            duration={2}
            delay={1}
            iteration={1}
            direction={'normal'}
            className="font-bold"
          />
          {' added to your cart'}
        </>,
      );
    },
    onError: (_error, variables) => {
      toast.error(`Failed to add ${variables.productName} to your cart`);
    },
  });

  const removeCartItemMutation = useMutation({
    mutationFn: async (variables: {
      productId: string;
      productName: string;
    }) => {
      const { productId } = variables;
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        body: JSON.stringify({ productId }),
        headers: { 'Content-type': 'application/json' },
      });
      if (!res.ok) throw new Error(`Failed to remove from cart`);
      return res.json();
    },
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(
        <>
          <ShinyText
            text={variables.productName}
            duration={2}
            delay={0}
            iteration={1}
            direction={'reverse'}
            className="font-bold"
          />
          {' removed from your cart'}
        </>,
      );
    },
    onError: (_error, variables) => {
      toast.error(`Failed to remove ${variables.productName} from cart`);
    },
  });

  return { cart, isLoading, error, addToCartMutation, removeCartItemMutation };
};
