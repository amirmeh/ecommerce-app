'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function ProductsPagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <Pagination>
      <PaginationContent className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              isActive={p === page}
              onClick={() => onPageChange(p)}
              className="cursor-pointer"
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}
