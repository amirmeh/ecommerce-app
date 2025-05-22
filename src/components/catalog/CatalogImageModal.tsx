import { GalleryThumbnails } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui';
import ProductDetailImage from '@/modules/products/components/ProductDetailImage';
import { ProductsWithImages } from '@/types';

type Props = {
  product: ProductsWithImages;
};

const CatalogImageModal = ({ product }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'ghost'} className="cursor-pointer size-9">
          <GalleryThumbnails className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full h-full md:max-w-[70vw] md:max-h-[70vh] grid-rows-[auto_1fr]">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-full h-full m-6">
            <ProductDetailImage product={product} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CatalogImageModal;
