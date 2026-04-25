'use client';

import { useMemo } from 'react';

import { ArrowRight, CreditCard, Film, Map, Sparkles } from 'lucide-react';

import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function HowItWorks() {
  const { locale, t } = useSitePreferences();
  const steps = useMemo(
    () =>
      locale === 'en'
        ? [
            { title: 'Get inspired', description: 'Watch videos and route ideas', icon: Film, emoji: '🎬' },
            { title: 'Choose', description: 'Find the right tour', icon: Map, emoji: '🗺️' },
            { title: 'AI match', description: 'Receive personalized suggestions', icon: Sparkles, emoji: '🤖' },
            { title: 'Book', description: 'Pay directly on the platform', icon: CreditCard, emoji: '✅' }
          ]
        : locale === 'ky'
          ? [
              { title: 'Илхам алыңыз', description: 'Видео жана маршруттарды көрүңүз', icon: Film, emoji: '🎬' },
              { title: 'Тандаңыз', description: 'Ылайыктуу турду табыңыз', icon: Map, emoji: '🗺️' },
              { title: 'AI тандоо', description: 'Жеке сунуштарды алыңыз', icon: Sparkles, emoji: '🤖' },
              { title: 'Брондоңуз', description: 'Төлөмдү платформада бүтүрүңүз', icon: CreditCard, emoji: '✅' }
            ]
          : [
              { title: 'Вдохновляйтесь', description: 'Смотрите видео и маршруты', icon: Film, emoji: '🎬' },
              { title: 'Выбирайте', description: 'Найдите идеальный тур', icon: Map, emoji: '🗺️' },
              { title: 'AI-подбор', description: 'Получите персональные рекомендации', icon: Sparkles, emoji: '🤖' },
              { title: 'Бронируйте', description: 'Оплата прямо на платформе', icon: CreditCard, emoji: '✅' }
            ],
    [locale]
  );

  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Journey"
        title={t('home.howItWorks')}
        description={t('home.howDescription')}
        align="center"
        className="mx-auto max-w-3xl"
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-[repeat(4,minmax(0,1fr))]">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{step.emoji}</span>
                <span className="rounded-full bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-bold dark:text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.description}</p>
              {index < steps.length - 1 ? <ArrowRight className="absolute right-5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-300 lg:block" /> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
