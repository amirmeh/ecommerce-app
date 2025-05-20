'use client';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui';
import { Product, ProductCategory } from '@/generated/prisma';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { upsertProduct } from '../services';
import UploadImage from './UploadImage';
import { useEffect } from 'react';

const ProductForm = (props: { product: Product | null }) => {
  const { product } = props;
  const { register, handleSubmit, setValue } = useForm<Product>();

  useEffect(() => {
    setValue('category', product?.category || ProductCategory.OTHER);
  }, [product?.category, setValue]);

  const onSubmitForm = (data: Product) => {
    const _product = {
      ...data,
      id: product?.id,
      price: parseFloat(data.price?.toString() || '0'),
      quantity: parseInt(data.quantity?.toString() || '0'),
      category: data.category || product?.category,
    };
    upsertProduct(_product as Product);
  };

  return (
    <Card className="w-[500px] mx-auto">
      <form className="max-w-lg" onSubmit={handleSubmit(onSubmitForm)}>
        <CardHeader>
          <CardTitle> Product</CardTitle>
          <CardDescription>
            {product?.id ? 'Edit Product' : 'Create New Product'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-3 py-5">
          <div>
            <Label htmlFor="name" className="mb-1">
              Product Name
            </Label>
            <Input
              {...register('name')}
              id="name"
              required
              defaultValue={product?.name || ''}
            />
          </div>
          <div>
            <Label htmlFor="category" className="mb-1">
              Category
            </Label>
            <Select
              required
              onValueChange={(value) =>
                setValue('category', value as ProductCategory)
              }
              defaultValue={product?.category || ProductCategory.OTHER}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ProductCategory).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description" className="mb-1">
              Description
            </Label>
            <Textarea
              {...register('description')}
              id="description"
              defaultValue={product?.description || ''}
            />
          </div>
          <div>
            <Label htmlFor="price" className="mb-1">
              Price
            </Label>
            <Input
              {...register('price')}
              type="number"
              id="price"
              step="0.01"
              defaultValue={product?.price || ''}
            />
          </div>
          <div>
            <Label htmlFor="quantity" className="mb-1">
              Quantity
            </Label>
            <Input
              {...register('quantity')}
              type="number"
              id="quantity"
              defaultValue={product?.quantity || ''}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard/products">Back</Link>
          </Button>
          <Button type="submit" className="cursor-pointer">
            {product?.id ? 'Update Product' : 'Add Product'}
          </Button>
        </CardFooter>
      </form>
      <hr className="border-b-gray-200" />
      {product?.id && (
        <CardFooter>
          <UploadImage productId={product?.id} />
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductForm;
