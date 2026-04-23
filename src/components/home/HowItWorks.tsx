import { ArrowRight, CreditCard, Film, Map, Sparkles } from 'lucide-react';

import { SectionHeading } from '@/components/shared/SectionHeading';

const steps = [
  {
    title: 'Вдохновляйтесь',
    description: 'Смотрите видео и маршруты',
    icon: Film,
    emoji: '🎬'
  },
  {
    title: 'Выбирайте',
    description: 'Найдите идеальный тур',
    icon: Map,
    emoji: '🗺️'
  },
  {
    title: 'AI-подбор',
    description: 'Получите персональные рекомендации',
    icon: Sparkles,
    emoji: '🤖'
  },
  {
    title: 'Бронируйте',
    description: 'Оплата прямо на платформе',
    icon: CreditCard,
    emoji: '✅'
  }
];

export function HowItWorks() {
  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Journey"
        title="Как это работает"
        description="Платформа соединяет контент, выбор тура, AI-подбор и бронирование в одном прозрачном пользовательском сценарии."
        align="center"
        className="mx-auto max-w-3xl"
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-[repeat(4,minmax(0,1fr))]">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{step.emoji}</span>
                <span className="rounded-full bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
              {index < steps.length - 1 ? <ArrowRight className="absolute right-5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-300 lg:block" /> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
