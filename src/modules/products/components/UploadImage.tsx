'use client';

import { Button, Input, Label } from '@/components/ui';
import { PrismaType } from '@/lib/prisma';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import { deleteImage, fetchImages, uploadImage } from '../services/image';
import { Spinner } from '@/components/loader';
import UploadFileNameDisplay from './UploadFileNameDisplay';

const UploadImage: FC<{ productId: string }> = ({ productId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<PrismaType.Image[] | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const updateImageList = (imageId: string) => {
    setImages(
      (preState) => preState?.filter((img) => img.id !== imageId) || null,
    );
  };

  const handleDelete = async (imageId: string) => {
    setLoading(true);
    const data = await deleteImage(imageId);
    updateImageList(imageId);
    setLoading(false);
  };

  const getImages = async () => {
    const data = await fetchImages(productId);
    setImages(data?.images);
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!file || !productId) {
      alert('please select a valid file and product');
    } else {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('productId', productId);
      const { data } = await uploadImage(formData);
      setImages(data);
      setFile(null);
    }
  };

  useEffect(() => {
    getImages();
  }, [productId]);

  return (
    <div className="w-full">
      <Label htmlFor="picture" className="mb-1">
        Product Image
      </Label>
      <div className="border-l border-input py-3 pl-2">
        <div className="relative flex gap-2 w-full justify-between">
          <Input
            ref={fileInputRef}
            id="picture"
            type="file"
            accept="image/*"
            onChange={handleChangeFile}
            className="hidden"
          />
          <Button
            type="button"
            onClick={handleClick}
            className="cursor-pointer"
          >
            Choose File
          </Button>
          <UploadFileNameDisplay fileName={file?.name} />
          <Button onClick={handleUpload} className="cursor-pointer">
            Upload Image
          </Button>
        </div>
        {loading ? (
          <Spinner size={30} className="mt-4 items-center justify-between" />
        ) : (
          <div className="flex gap-2 mt-4 flex-wrap items-center justify-between">
            {images?.map((item) => {
              return (
                <div className="relative group" key={item.id}>
                  <CircleX
                    className="absolute top-1 right-1 text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  />
                  <Image
                    alt="product image"
                    width={100}
                    height={100}
                    src={item.image}
                    className="mt-4 mx-auto rounded-md"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
