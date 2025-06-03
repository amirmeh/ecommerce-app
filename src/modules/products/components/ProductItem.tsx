import Image from 'next/image';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  HoverCard,
} from '@/components/ui';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Spinner } from '@/components/loader';
import { useCart } from '@/modules/cart/hooks';
import CatalogImageModal from './catalog/CatalogImageModal';
import { HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';

const ProductItem = (props: { product: any }) => {
  const { product } = props;
  const { addToCartMutation } = useCart();
  const isAdding = addToCartMutation.isPending;

  return (
    <Card className="w-[350px] transform transition-transform duration-300 hover:scale-105">
      <CardHeader>
        <div className="relative w-full h-[300px]">
          <Image
            src={product?.images[0]?.image || '/assets/noImage.jpg'}
            alt={product?.name}
            fill
            className="rounded-t-lg object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <HoverCard>
          <HoverCardTrigger asChild>
            <h2 className="text-xl font-bold truncate">{product?.name}</h2>
          </HoverCardTrigger>
          <HoverCardContent>
            <Card>
              <CardContent>{product?.name}</CardContent>
            </Card>
          </HoverCardContent>
        </HoverCard>
        <p className="text-gray-500">{product?.category}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-semibold">${product?.price?.toFixed(2)}</p>
          <div className="flex items-center gap-1">
            <Button
              variant={'ghost'}
              className="cursor-pointer"
              disabled={isAdding}
              onClick={() =>
                addToCartMutation.mutateAsync({
                  productId: product.id,
                  productName: product.name,
                })
              }
              asChild
            >
              <span className="size-9">
                {isAdding ? (
                  <Spinner size={'1.5rem'} />
                ) : (
                  <ShoppingCart className="size-6" />
                )}
              </span>
            </Button>
            <Button variant={'ghost'} className="size-9">
              <Heart className="size-6" />
            </Button>
            <CatalogImageModal product={product} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full cursor-pointer" asChild>
          <Link href={`/products/${product.id}`}>More Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
