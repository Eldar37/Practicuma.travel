import { ArrowLeftRight, BarChart3, Compass, PlayCircle, Wallet } from 'lucide-react';

import { SectionHeading } from '@/components/shared/SectionHeading';
import { Logo } from '@/components/layout/Logo';

const pillars = [
  {
    title: 'Контент',
    description: 'Авторы, видео, маршруты и редакционные подборки, которые прогревают интерес к поездке.',
    icon: PlayCircle
  },
  {
    title: 'Платформа',
    description: 'Центральный слой, где пользователь связывает вдохновение, карту, тур и бронирование.',
    icon: Compass
  },
  {
    title: 'Монетизация',
    description: 'Туры, оплата, аналитика и точки роста для гидов, агентств и локальных партнёров.',
    icon: Wallet
  }
];

export function Ecosystem() {
  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Ecosystem"
        title="Экосистема Practicuma Travel"
        description="Три опоры продукта: контент создает спрос, платформа направляет пользователя, монетизация превращает интерес в реальные поездки."
        align="center"
        className="mx-auto max-w-3xl"
      />
      <div className="mt-12 grid gap-6 xl:grid-cols-3">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          const isCenter = index === 1;
          return (
            <div
              key={pillar.title}
              className={`relative overflow-hidden rounded-[2rem] border p-8 shadow-card ${
                isCenter ? 'border-primary/20 bg-gradient-to-br from-primary/10 to-white' : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`rounded-full p-3 ${isCenter ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'}`}>
                  <Icon className="h-5 w-5" />
                </span>
                {isCenter ? (
                  <div className="rounded-full border border-primary/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Hub
                  </div>
                ) : null}
              </div>
              {isCenter ? <Logo colorClassName="text-dark" className="mt-8" /> : <h3 className="mt-8 text-3xl font-bold">{pillar.title}</h3>}
              <p className="mt-4 text-sm leading-7 text-slate-600">{pillar.description}</p>
              {index < pillars.length - 1 ? (
                <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 xl:flex">
                  <span className="flex h-12 w-12 animate-float items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    {index === 0 ? <ArrowLeftRight className="h-5 w-5" /> : <BarChart3 className="h-5 w-5" />}
                  </span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
