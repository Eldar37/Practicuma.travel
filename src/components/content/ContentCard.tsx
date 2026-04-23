import Image from 'next/image';
import Link from 'next/link';

import { ExternalLink, Play, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import type { ContentItem } from '@/lib/types';
import { cn, formatCompactNumber, formatReadableDate } from '@/lib/utils';

interface ContentCardProps {
  item: ContentItem;
  linkedTourHref?: string;
}

const typeMeta = {
  video: {
    badge: 'VIDEO',
    variant: 'danger' as const
  },
  blog: {
    badge: 'BLOG',
    variant: 'primary' as const
  },
  'ai-route': {
    badge: 'AI',
    variant: 'accent' as const
  }
};

export function ContentCard({ item, linkedTourHref }: ContentCardProps) {
  const meta = typeMeta[item.type];

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover">
      <div className="relative h-60 overflow-hidden">
        <Image src={item.thumbnail} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        {item.type === 'video' && item.externalUrl ? (
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Смотреть видео ${item.title} на YouTube`}
            className="absolute inset-0"
          />
        ) : null}
        <Badge variant={meta.variant} className="absolute left-4 top-4">
          {meta.badge}
        </Badge>
        {item.type === 'video' ? (
          <span className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-xl">
              <Play className="h-5 w-5 fill-current" />
            </span>
          </span>
        ) : item.type === 'ai-route' ? (
          <span className="absolute right-4 top-4 rounded-full bg-white/85 p-2 text-accent shadow-soft">
            <Sparkles className="h-4 w-4" />
          </span>
        ) : null}
      </div>
      <div className="space-y-4 p-6">
        <div className="space-y-3">
          <h3 className="text-xl font-bold leading-tight">{item.title}</h3>
          <p className="text-sm leading-6 text-slate-600">{item.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="font-semibold text-slate-700">{item.author}</span>
          <span>{formatReadableDate(item.date)}</span>
          <span>{item.readTime ?? `${formatCompactNumber(item.views)} просмотров`}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {item.type === 'video' && item.externalUrl ? (
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
            >
              Смотреть на YouTube
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
          {linkedTourHref ? (
            <Link href={linkedTourHref} className={cn('inline-flex text-sm font-semibold text-primary transition hover:opacity-80')}>
              Связанный тур →
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
