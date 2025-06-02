'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SortSelector({ value, onChange }: Props) {
  return (
    <div className="w-[200px]">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-asc">Cheapest First</SelectItem>
          <SelectItem value="price-desc">Most Expensive</SelectItem>
          <SelectItem value="name-asc">Name (A-Z)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
