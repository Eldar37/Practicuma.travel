import Link from 'next/link';

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  colorClassName?: string;
  href?: string;
}

export function Logo({ className, colorClassName = 'text-white', href = '/' }: LogoProps) {
  return (
    <Link className={cn('inline-flex items-center gap-3', className)} href={href} aria-label="Practicuma Travel">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/14 backdrop-blur-sm">
        <svg
          aria-hidden="true"
          className={cn('h-7 w-7', colorClassName)}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 46L24 24L34 38L42 28L54 46"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="48" cy="16" r="8" stroke="currentColor" strokeWidth="4" />
          <path d="M48 10V22M42 16H54" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col">
        <span className={cn('font-heading text-lg font-extrabold tracking-tight', colorClassName)}>Practicuma Travel</span>
        <span className={cn('text-xs font-medium text-slate-400', colorClassName === 'text-white' ? 'text-white/70' : 'text-slate-500')}>
          От вдохновения до дохода — в одной системе
        </span>
      </span>
    </Link>
  );
}
