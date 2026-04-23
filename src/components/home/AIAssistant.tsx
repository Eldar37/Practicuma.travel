import Link from 'next/link';

import { Sparkles } from 'lucide-react';

import { buttonStyles } from '@/components/ui/Button';

export function AIAssistant() {
  return (
    <section className="section-shell">
      <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-[#2D94B8] to-mint px-6 py-12 text-white shadow-2xl sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_440px] lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              AI-помощник по маршрутам
            </span>
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">AI-помощник по маршрутам</h2>
            <p className="mt-4 text-lg leading-8 text-white/80">
              Декоративный preview будущей функции: пользователь описывает формат поездки, а AI собирает маршрут, бюджет и релевантные туры.
            </p>
            <div className="mt-8">
              <Link href="/content?type=ai-route" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
                Попробовать AI-подбор
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-md">
            <div className="space-y-4">
              <div className="ml-auto max-w-[85%] rounded-[1.5rem] rounded-br-md bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-soft">
                Хочу в горы на 3 дня с детьми, бюджет 15000 сом
              </div>
              <div className="max-w-[90%] rounded-[1.5rem] rounded-bl-md bg-slate-950/20 px-4 py-4 text-sm leading-6 text-white/90">
                Отлично! Рекомендую Алтын-Арашан — идеально для семей, если идти в мягком темпе. В бюджет укладываются трансфер, 2 ночи и гид. Альтернатива: weekend на Иссык-Куль + легкий выезд в ущелье.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
