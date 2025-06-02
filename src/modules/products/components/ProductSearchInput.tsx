'use client';

import { Input } from '@/components/ui';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks';
import { Search } from 'lucide-react';

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
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
