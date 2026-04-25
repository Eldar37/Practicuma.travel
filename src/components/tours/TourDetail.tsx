'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Award, Check, ChevronDown, Flag, Globe, MapPin, Shield, Star, Users, X } from 'lucide-react';

import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';
import { BookingWidget } from '@/components/tours/BookingWidget';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { difficultyLabelsByLocale, formatCurrencyByLocale, tourCategoryLabelsByLocale } from '@/lib/i18n';
import type { Tour } from '@/lib/types';

interface TourDetailProps {
  tour: Tour;
}

type TabKey = 'description' | 'itinerary' | 'included' | 'reviews';

const tabs: TabKey[] = ['description', 'itinerary', 'included', 'reviews'];

const detailCopy = {
  ru: {
    home: 'Главная',
    tours: 'Туры',
    reviewWord: 'отзывов',
    perPerson: '/ чел',
    duration: 'Длительность',
    group: 'Группа',
    location: 'Локация',
    difficulty: 'Сложность',
    tabLabels: {
      description: 'Описание',
      itinerary: 'Маршрут',
      included: 'Включено',
      reviews: 'Отзывы'
    },
    highlights: 'Что особенно понравится',
    day: 'День',
    includes: 'Включено',
    excludes: 'Не включено',
    certified: 'Сертифицированный гид',
    toursCount: 'туров'
  },
  ky: {
    home: 'Башкы бет',
    tours: 'Турлар',
    reviewWord: 'сын-пикир',
    perPerson: '/ адам',
    duration: 'Узактыгы',
    group: 'Топ',
    location: 'Локация',
    difficulty: 'Татаалдыгы',
    tabLabels: {
      description: 'Сүрөттөмө',
      itinerary: 'Маршрут',
      included: 'Камтылган',
      reviews: 'Пикирлер'
    },
    highlights: 'Эмне өзгөчө жагат',
    day: 'Күн',
    includes: 'Камтылган',
    excludes: 'Камтылган эмес',
    certified: 'Сертификатталган гид',
    toursCount: 'тур'
  },
  en: {
    home: 'Home',
    tours: 'Tours',
    reviewWord: 'reviews',
    perPerson: '/ person',
    duration: 'Duration',
    group: 'Group',
    location: 'Location',
    difficulty: 'Difficulty',
    tabLabels: {
      description: 'Description',
      itinerary: 'Itinerary',
      included: 'Included',
      reviews: 'Reviews'
    },
    highlights: 'What you will love',
    day: 'Day',
    includes: 'Included',
    excludes: 'Not included',
    certified: 'Certified guide',
    toursCount: 'tours'
  }
} as const;

const reviewCopy = {
  ru: [
    {
      name: 'Анна',
      rating: 5,
      text: 'Очень собранный маршрут и спокойная логистика. Все ключевые точки увидели без ощущения спешки.'
    },
    {
      name: 'Тимур',
      rating: 5,
      text: 'Сильный гид, удобный темп группы и отличный подбор локаций для фото и отдыха.'
    },
    {
      name: 'Мария',
      rating: 4,
      text: 'Подойдёт тем, кто хочет увидеть настоящий Кыргызстан без сложной самостоятельной подготовки.'
    }
  ],
  ky: [
    {
      name: 'Айдана',
      rating: 5,
      text: 'Маршрут жакшы чогултулган, логистикасы тынч жана ыңгайлуу болду. Негизги чекиттердин баарына жетиштик.'
    },
    {
      name: 'Тимур',
      rating: 5,
      text: 'Гид күчтүү, топтун темпи ыңгайлуу, сүрөткө жана эс алууга ылайыктуу жерлер мыкты тандалган.'
    },
    {
      name: 'Мария',
      rating: 4,
      text: 'Өз алдынча татаал даярдыксыз эле чыныгы Кыргызстанды көргүсү келгендерге ылайыктуу.'
    }
  ],
  en: [
    {
      name: 'Anna',
      rating: 5,
      text: 'A very well-structured route with smooth logistics. We saw all the key places without feeling rushed.'
    },
    {
      name: 'Timur',
      rating: 5,
      text: 'Strong guide, comfortable group pace, and great location choices for both photos and rest stops.'
    },
    {
      name: 'Maria',
      rating: 4,
      text: 'A good fit for travelers who want to see the real Kyrgyzstan without complex self-planning.'
    }
  ]
} as const;

export function TourDetail({ tour }: TourDetailProps) {
  const { locale } = useSitePreferences();
  const content = detailCopy[locale];
  const reviews = useMemo(
    () =>
      reviewCopy[locale].map((review, index) => ({
        ...review,
        avatar: `https://i.pravatar.cc/100?img=${[48, 58, 61][index]}`
      })),
    [locale]
  );

  const [activeTab, setActiveTab] = useState<TabKey>('description');
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [openDay, setOpenDay] = useState<number | null>(tour.itinerary[0]?.day ?? null);

  return (
    <>
      <div className="section-shell space-y-8">
        <nav className="text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="transition hover:text-primary">
            {content.home}
          </Link>{' '}
          &gt;{' '}
          <Link href="/tours" className="transition hover:text-primary">
            {content.tours}
          </Link>{' '}
          &gt; <span className="text-slate-700 dark:text-slate-200">{tour.title}</span>
        </nav>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-8">
            <section className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                <button
                  type="button"
                  className="relative h-[420px] overflow-hidden rounded-[2rem]"
                  onClick={() => setOpenImage(tour.images[0])}
                >
                  <Image src={tour.images[0]} alt={tour.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  {tour.images.slice(1, 5).map((image) => (
                    <button
                      key={image}
                      type="button"
                      className="relative h-[200px] overflow-hidden rounded-[1.5rem]"
                      onClick={() => setOpenImage(image)}
                    >
                      <Image src={image} alt={tour.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 16vw" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex flex-wrap gap-3">
                  <Badge variant={tour.category === 'burning' ? 'danger' : 'primary'}>
                    {tourCategoryLabelsByLocale[locale][tour.category]}
                  </Badge>
                  <Badge variant="neutral">{difficultyLabelsByLocale[locale][tour.difficulty]}</Badge>
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">{tour.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }, (_, index) => (
                          <Star key={index} className={`h-4 w-4 ${index < Math.round(tour.rating) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">{tour.rating.toFixed(1)}</span>
                      <span>
                        ({tour.reviewCount} {content.reviewWord})
                      </span>
                    </div>
                    <span>
                      {formatCurrencyByLocale(tour.price, tour.currency, locale)} {content.perPerson}
                    </span>
                  </div>
                </div>
                <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="flex items-center gap-3">
                    <Flag className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{content.duration}</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{tour.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{content.group}</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">
                        {tour.groupSize.min}-{tour.groupSize.max}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{content.location}</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{tour.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{content.difficulty}</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">
                        {difficultyLabelsByLocale[locale][tour.difficulty]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                      activeTab === tab
                        ? 'bg-primary text-white shadow-soft'
                        : 'bg-white text-slate-600 shadow-soft hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {content.tabLabels[tab]}
                  </button>
                ))}
              </div>

              {activeTab === 'description' ? (
                <div className="card-surface space-y-6 p-6">
                  <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{tour.description}</p>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{content.highlights}</h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {tour.highlights.map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 px-4 py-4 dark:bg-slate-800/60">
                          <Check className="mt-0.5 h-5 w-5 text-success" />
                          <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {activeTab === 'itinerary' ? (
                <div className="space-y-4">
                  {tour.itinerary.map((day) => {
                    const isOpen = openDay === day.day;
                    return (
                      <div key={day.day} className="card-surface overflow-hidden">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-4 p-5 text-left"
                          onClick={() => setOpenDay(isOpen ? null : day.day)}
                        >
                          <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                              {content.day} {day.day}
                            </p>
                            <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{day.title}</h3>
                          </div>
                          <ChevronDown className={`h-5 w-5 text-slate-400 transition ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen ? (
                          <div className="border-t border-slate-100 px-5 pb-5 pt-4 dark:border-slate-800">
                            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{day.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {day.activities.map((activity) => (
                                <span key={activity} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                  {activity}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}

              {activeTab === 'included' ? (
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="card-surface p-6">
                    <h3 className="text-xl font-bold text-dark dark:text-white">{content.includes}</h3>
                    <div className="mt-4 space-y-3">
                      {tour.includes.map((item) => (
                        <div key={item} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                          <Check className="mt-0.5 h-5 w-5 text-success" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card-surface p-6">
                    <h3 className="text-xl font-bold text-dark dark:text-white">{content.excludes}</h3>
                    <div className="mt-4 space-y-3">
                      {tour.excludes.map((item) => (
                        <div key={item} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                          <X className="mt-0.5 h-5 w-5 text-rose-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {activeTab === 'reviews' ? (
                <div className="grid gap-4">
                  {reviews.map((review) => (
                    <article key={review.name} className="card-surface p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 overflow-hidden rounded-full">
                          <Image src={review.avatar} alt={review.name} fill className="object-cover" sizes="56px" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{review.name}</h3>
                          <div className="flex gap-1 text-amber-500">
                            {Array.from({ length: 5 }, (_, index) => (
                              <Star key={index} className={`h-4 w-4 ${index < review.rating ? 'fill-current' : ''}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{review.text}</p>
                    </article>
                  ))}
                </div>
              ) : null}
            </section>

            <section className="card-surface p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-[1.5rem]">
                  <Image src={tour.guide.photo} alt={tour.guide.name} fill className="object-cover" sizes="96px" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{tour.guide.name}</h3>
                    {tour.guide.certified ? <Badge variant="success">{content.certified}</Badge> : null}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-current text-amber-500" />
                      {tour.guide.rating.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      {tour.guide.toursCount} {content.toursCount}
                    </span>
                    <span className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      {tour.guide.languages.join(', ')}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{tour.guide.bio}</p>
                </div>
              </div>
            </section>
          </div>

          <BookingWidget tour={tour} />
        </div>
      </div>

      <Modal open={Boolean(openImage)} onClose={() => setOpenImage(null)} className="max-w-5xl p-4 sm:p-6">
        {openImage ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem]">
            <Image src={openImage} alt={tour.title} fill className="object-cover" sizes="90vw" />
          </div>
        ) : null}
      </Modal>
    </>
  );
}
