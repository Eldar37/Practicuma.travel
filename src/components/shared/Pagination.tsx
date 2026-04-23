'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <Button variant="ghost" size="sm" onClick={() => onPageChange(page - 1)} disabled={page <= 1} iconLeft={<ChevronLeft className="h-4 w-4" />}>
        Назад
      </Button>
      {Array.from({ length: totalPages }, (_, index) => {
        const current = index + 1;
        return (
          <button
            key={current}
            aria-label={`Перейти на страницу ${current}`}
            className={cn(
              'h-10 w-10 rounded-full text-sm font-semibold transition',
              current === page ? 'bg-primary text-white shadow-soft' : 'bg-white text-slate-600 hover:bg-slate-100'
            )}
            onClick={() => onPageChange(current)}
          >
            {current}
          </button>
        );
      })}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        iconRight={<ChevronRight className="h-4 w-4" />}
      >
        Вперед
      </Button>
    </div>
  );
}
