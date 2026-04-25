'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, Compass, CreditCard, PlayCircle, Sparkles } from 'lucide-react';

import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { buttonStyles } from '@/components/ui/Button';

const copy = {
  ru: {
    eyebrow: 'О нас',
    title: 'Practicuma Travel — цифровая экосистема туризма Кыргызстана',
    description:
      'Платформа соединяет вдохновляющий контент, карту локаций, подбор туров и бронирование в одном современном интерфейсе.',
    body:
      'Мы строим travel-продукт, где пользователь сначала вдохновляется маршрутом, затем быстро сравнивает направления, а после этого бронирует подходящий тур без перехода между десятком сервисов.',
    tours: 'Смотреть туры',
    map: 'Открыть карту',
    tagline: 'От вдохновения до дохода — в одной системе',
    visionBadge: 'Видение продукта',
    visionTitle: 'Travel platform, а не просто каталог',
    visionText:
      'В основе Practicuma Travel лежит идея, что туризм Кыргызстана должен иметь цельную цифровую среду, где контент, туры, AI-подбор и партнёрская монетизация усиливают друг друга.',
    nextStep: 'Следующий шаг',
    nextCta: 'Смотреть контент',
    features: [
      {
        title: 'Контент как вход',
        description: 'Видео, редакционные подборки и AI-маршруты формируют спрос ещё до выбора конкретного тура.'
      },
      {
        title: 'Карта как навигация',
        description: 'Пользователь видит географию маршрута, соседние точки интереса и контекст региона.'
      },
      {
        title: 'Бронь как завершение',
        description: 'Один интерфейс проводит человека от интереса к подтверждённой поездке.'
      }
    ]
  },
  ky: {
    eyebrow: 'Биз жөнүндө',
    title: 'Practicuma Travel — Кыргызстандын санариптик туризм экосистемасы',
    description:
      'Платформа шыктандыруучу контентти, локациялар картасын, тур тандоону жана брондоону бир заманбап интерфейске бириктирет.',
    body:
      'Биз колдонуучу адегенде шыктанып, андан кийин багыттарды салыштырып, соңунда туура турду кошумча сервистерге өтпөстөн брондой алган travel-продукт куруп жатабыз.',
    tours: 'Турларды көрүү',
    map: 'Картаны ачуу',
    tagline: 'Илхамдан кирешеге чейин — бир системада',
    visionBadge: 'Продукт көрүнүшү',
    visionTitle: 'Жөн эле каталог эмес, толук travel platform',
    visionText:
      'Practicuma Travel идеясы жөнөкөй: Кыргызстандын туризмине контент, турлар, AI-кеңеш жана өнөктөштүк монетизация бир экосистемада иштеген санариптик мейкиндик керек.',
    nextStep: 'Кийинки кадам',
    nextCta: 'Контентти көрүү',
    features: [
      {
        title: 'Контент кирүү чекити катары',
        description: 'Видео, редакциялык тандоолор жана AI-маршруттар суроо-талапты алдын ала түзөт.'
      },
      {
        title: 'Карта багыт берүүчү катары',
        description: 'Колдонуучу маршруттун географиясын, жакын жерлерди жана аймактын контекстин көрөт.'
      },
      {
        title: 'Брондоо финал катары',
        description: 'Бир интерфейс кызыгуудан тастыкталган сапарга чейин алып барат.'
      }
    ]
  },
  en: {
    eyebrow: 'About',
    title: 'Practicuma Travel is a digital tourism ecosystem for Kyrgyzstan',
    description:
      'The platform connects inspiring content, a map of locations, tour discovery, and booking inside one modern interface.',
    body:
      'We are building a travel product where the user gets inspired first, compares destinations next, and then books the right tour without jumping across multiple disconnected services.',
    tours: 'Browse tours',
    map: 'Open the map',
    tagline: 'From inspiration to revenue — in one system',
    visionBadge: 'Product vision',
    visionTitle: 'A travel platform, not just a catalog',
    visionText:
      'Practicuma Travel is built on the idea that Kyrgyz tourism should have a single digital layer where content, tours, AI matching, and partner monetization reinforce each other.',
    nextStep: 'Next step',
    nextCta: 'Explore content',
    features: [
      {
        title: 'Content as the entry point',
        description: 'Videos, editorial collections, and AI routes create demand before the user picks a specific tour.'
      },
      {
        title: 'Map as navigation',
        description: 'The user sees route geography, nearby attractions, and regional context in one place.'
      },
      {
        title: 'Booking as completion',
        description: 'One interface moves the traveler from interest to a confirmed trip.'
      }
    ]
  }
} as const;

export default function AboutPage() {
  const { locale } = useSitePreferences();
  const content = copy[locale];
  const icons = [PlayCircle, Compass, CreditCard] as const;

  return (
    <div className="section-shell space-y-20">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_480px] lg:items-center">
        <div>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">{content.body}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/tours" className={buttonStyles({ variant: 'primary', size: 'lg' })}>
              {content.tours}
            </Link>
            <Link href="/map" className={buttonStyles({ variant: 'dark', size: 'lg' })}>
              {content.map}
            </Link>
          </div>
        </div>

        <div className="relative h-[520px] overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-card dark:border-slate-800">
          <Image
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
            alt="Kyrgyzstan mountains"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 p-8 text-white">
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              {content.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {content.features.map((feature, index) => {
          const Icon = icons[index];
          return (
            <article key={feature.title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-slate-900">
              <span className="inline-flex rounded-full bg-primary/10 p-3 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">{feature.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
            </article>
          );
        })}
      </section>

      <section className="overflow-hidden rounded-[2.5rem] bg-dark px-6 py-14 text-white shadow-2xl sm:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4" />
              {content.visionBadge}
            </span>
            <h2 className="mt-6 text-4xl font-extrabold text-white">{content.visionTitle}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/75">{content.visionText}</p>
          </div>

          <Link
            href="/content"
            className="inline-flex items-center justify-center gap-2 rounded-[2rem] border border-white/10 bg-white/5 px-8 py-8 text-left transition hover:bg-white/10"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/50">{content.nextStep}</p>
              <p className="mt-2 text-2xl font-bold text-white">{content.nextCta}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-white" />
          </Link>
        </div>
      </section>
    </div>
  );
}
