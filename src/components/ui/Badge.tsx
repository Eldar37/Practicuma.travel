import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type BadgeVariant = 'primary' | 'accent' | 'success' | 'danger' | 'neutral' | 'dark';

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/15 text-[#C45F10]',
  success: 'bg-success/10 text-success',
  danger: 'bg-rose-100 text-rose-700',
  neutral: 'bg-slate-100 text-slate-600',
  dark: 'bg-dark text-white'
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
