'use client';

import { useEffect, useState } from 'react';
import { Input, Slider, Checkbox, Button } from '@/components/ui';
import { getProductCategories } from '../../services';

type Props = {
  onApply: (filters: {
    categories: string[];
    minPrice: number;
    maxPrice: number;
  }) => void;
};

export default function FilterPanel({ onApply }: Props) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  useEffect(() => {
    getProductCategories().then((cats) => {
      setCategories(cats);
    });
  }, []);

  const handleApply = () => {
    onApply({ categories: selected, minPrice, maxPrice });
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md w-full max-w-md">
      <div>
        <p className="font-medium mb-2">Categories</p>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 capitalize">
              <Checkbox
                checked={selected.includes(cat)}
                onCheckedChange={(checked) =>
                  setSelected((prev) =>
                    checked ? [...prev, cat] : prev.filter((c) => c !== cat),
                  )
                }
              />
              {cat.toLowerCase()}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-medium mb-2 mt-4">Price Range</p>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="Min"
          />
          <Input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            placeholder="Max"
          />
        </div>
        <Slider
          min={0}
          max={10000}
          step={100}
          value={[minPrice, maxPrice]}
          onValueChange={([min, max]) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
        />
      </div>

      <Button className="cursor-pointer" onClick={handleApply}>
        Apply Filters
      </Button>
    </div>
  );
}
