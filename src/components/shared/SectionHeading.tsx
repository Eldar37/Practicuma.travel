import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = 'left', className }: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}
