import CatalogList from '@/components/catalog/CatalogList';
import CatalogSelector from '@/components/catalog/CatalogSelector';

function Catalog() {
  return (
    <div className="flex flex-col items-center mx-auto my-4">
      <CatalogList />
      <CatalogSelector />
    </div>
  );
}

export default Catalog;
