'use client';

import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks';

type Props = {
  onSearch: (query: string) => void;
};

export default function ProductSearchInput({ onSearch }: Props) {
  const [input, setInput] = useState('');
  const debounced = useDebounce(input, 500);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <Input
      type="text"
      placeholder="Search products..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="w-full max-w-md"
    />
  );
}
