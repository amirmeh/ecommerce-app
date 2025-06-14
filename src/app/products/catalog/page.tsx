import { Button } from '@/components/ui';
import CatalogList from '@/modules/products/components/catalog/CatalogList';
import Link from 'next/link';

function Catalog() {
  return (
    <div className="flex flex-col items-center mx-auto my-4">
      <CatalogList />
      <Button asChild>
        <Link href="/products">Back To Products List</Link>
      </Button>
    </div>
  );
}

export default Catalog;
