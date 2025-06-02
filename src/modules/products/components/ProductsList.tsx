import ProductItem from './ProductItem';
import { ProductsWithImages } from '@/types';

function ProductsList(props: { products: ProductsWithImages[] }) {
  const { products = [] } = props;

  return (
    <div className="flex flex-wrap justify-between items-center w-full gap-10">
      {products.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </div>
  );
}

export default ProductsList;
