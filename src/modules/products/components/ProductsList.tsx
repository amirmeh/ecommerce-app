import { DATA } from '../mock/products';
import ProductItem from './ProductItem';

function ProductsList() {
  return (
    <div className="flex flex-wrap justify-between items-center w-full my-10">
      {DATA.map((item) => {
        return <ProductItem key={item.id} product={item} />;
      })}
    </div>
  );
}

export default ProductsList;
