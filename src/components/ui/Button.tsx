import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white shadow-soft hover:brightness-95 focus-visible:ring-primary/40',
  secondary:
    'bg-accent text-dark shadow-soft hover:brightness-95 focus-visible:ring-accent/40',
  outline:
    'border border-white/70 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-dark focus-visible:ring-white/50',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-300',
  dark:
    'bg-dark text-white shadow-soft hover:brightness-95 focus-visible:ring-slate-500'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base'
};

export const buttonStyles = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}) =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-60',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, iconLeft, iconRight, children, ...props }, ref) => (
    <button ref={ref} className={buttonStyles({ variant, size, fullWidth, className })} {...props}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
);

Button.displayName = 'Button';
