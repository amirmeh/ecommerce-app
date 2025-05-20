import ProductItem from './ProductItem';
import { ProductsWithImages } from '@/types';

function ProductsList(props: { products: ProductsWithImages[] }) {
  const { products } = props;
  return (
    <div className="flex flex-wrap justify-between items-center w-full my-10 gap-y-10">
      {products?.map((item) => {
        return <ProductItem key={item.id} product={item} />;
      })}
    </div>
  );
}

export default ProductsList;
