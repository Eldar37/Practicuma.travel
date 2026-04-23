import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, Compass, CreditCard, PlayCircle, Sparkles } from 'lucide-react';

import { SectionHeading } from '@/components/shared/SectionHeading';
import { buttonStyles } from '@/components/ui/Button';

const features = [
  {
    title: 'Контент как вход',
    description: 'Видео, редакционные подборки и AI-маршруты формируют спрос еще до выбора конкретного тура.',
    icon: PlayCircle
  },
  {
    title: 'Карта как навигация',
    description: 'Пользователь видит географию маршрута, соседние точки интереса и региональный контекст.',
    icon: Compass
  },
  {
    title: 'Бронь как завершение',
    description: 'В одном интерфейсе пользователь проходит путь от вдохновения до подтверждения поездки.',
    icon: CreditCard
  }
];

export default function AboutPage() {
  return (
    <div className="section-shell space-y-20">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_480px] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="About"
            title="Practicuma Travel — цифровая экосистема туризма Кыргызстана"
            description="Платформа связывает редакционный контент, выбор маршрута, карту локаций и клиентское бронирование в одном современном интерфейсе."
          />
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            Мы проектируем продукт в логике современного travel-commerce: сначала пользователь вдохновляется, затем сравнивает направления, а после этого переходит к покупке. Для Кыргызстана это особенно важно, потому что сильный туристический продукт начинается с контекста, а не только с прайса.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/tours" className={buttonStyles({ variant: 'primary', size: 'lg' })}>
              Смотреть туры
            </Link>
            <Link href="/map" className={buttonStyles({ variant: 'dark', size: 'lg' })}>
              Открыть карту
            </Link>
          </div>
        </div>
        <div className="relative h-[520px] overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-card">
          <Image
            src="https://picsum.photos/seed/about-kyrgyzstan/1200/900"
            alt="Киргизский горный пейзаж"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
          <div className="absolute bottom-0 p-8 text-white">
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              От вдохновения до дохода — в одной системе
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article key={feature.title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
              <span className="inline-flex rounded-full bg-primary/10 p-3 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-6 text-3xl font-bold">{feature.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{feature.description}</p>
            </article>
          );
        })}
      </section>

      <section className="overflow-hidden rounded-[2.5rem] bg-dark px-6 py-14 text-white shadow-2xl sm:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4" />
              Product Vision
            </span>
            <h2 className="mt-6 text-4xl font-extrabold text-white">Travel platform, а не просто каталог</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/75">
              В основе Practicuma Travel лежит идея, что у Кыргызстана должен быть цифровой туристический слой, где контент и коммерция не конфликтуют, а усиливают друг друга.
            </p>
          </div>
          <Link
            href="/content"
            className="inline-flex items-center justify-center gap-2 rounded-[2rem] border border-white/10 bg-white/5 px-8 py-8 text-left transition hover:bg-white/10"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/50">Следующий шаг</p>
              <p className="mt-2 text-2xl font-bold text-white">Смотреть контент</p>
            </div>
            <ArrowRight className="h-5 w-5 text-white" />
          </Link>
        </div>
      </section>
    </div>
  );
}
