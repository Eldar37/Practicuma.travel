'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Award, Check, ChevronDown, Flag, Globe, MapPin, Shield, Star, Users, X } from 'lucide-react';

import { BookingWidget } from '@/components/tours/BookingWidget';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import type { Tour } from '@/lib/types';
import { difficultyLabels, formatDateRange, formatCurrency, tourCategoryLabels } from '@/lib/utils';

interface TourDetailProps {
  tour: Tour;
}

const tabs = ['Описание', 'Маршрут', 'Включено', 'Отзывы'] as const;

const reviews = [
  {
    name: 'Анна',
    avatar: 'https://i.pravatar.cc/100?img=48',
    rating: 5,
    text: 'Очень собранный маршрут и спокойная логистика. Все ключевые точки увидели без ощущения спешки.'
  },
  {
    name: 'Тимур',
    avatar: 'https://i.pravatar.cc/100?img=58',
    rating: 5,
    text: 'Сильный гид, удобный темп группы и отличный подбор локаций для фото и отдыха.'
  },
  {
    name: 'Мария',
    avatar: 'https://i.pravatar.cc/100?img=61',
    rating: 4,
    text: 'Подойдет тем, кто хочет увидеть настоящий Кыргызстан без сложной самостоятельной подготовки.'
  }
];

export function TourDetail({ tour }: TourDetailProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Описание');
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [openDay, setOpenDay] = useState<number | null>(tour.itinerary[0]?.day ?? null);

  return (
    <>
      <div className="section-shell space-y-8">
        <nav className="text-sm text-slate-500">
          <Link href="/" className="transition hover:text-primary">
            Главная
          </Link>{' '}
          &gt;{' '}
          <Link href="/tours" className="transition hover:text-primary">
            Туры
          </Link>{' '}
          &gt; <span className="text-slate-700">{tour.title}</span>
        </nav>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-8">
            <section className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                <button className="relative h-[420px] overflow-hidden rounded-[2rem]" onClick={() => setOpenImage(tour.images[0])}>
                  <Image src={tour.images[0]} alt={tour.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  {tour.images.slice(1, 5).map((image) => (
                    <button key={image} className="relative h-[200px] overflow-hidden rounded-[1.5rem]" onClick={() => setOpenImage(image)}>
                      <Image src={image} alt={tour.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 16vw" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex flex-wrap gap-3">
                  <Badge variant={tour.category === 'burning' ? 'danger' : 'primary'}>{tourCategoryLabels[tour.category]}</Badge>
                  <Badge variant="neutral">{difficultyLabels[tour.difficulty]}</Badge>
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{tour.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }, (_, index) => (
                          <Star key={index} className={`h-4 w-4 ${index < Math.round(tour.rating) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="font-semibold text-slate-800">{tour.rating.toFixed(1)}</span>
                      <span>({tour.reviewCount} отзывов)</span>
                    </div>
                    <span>{formatCurrency(tour.price, tour.currency)} / чел</span>
                  </div>
                </div>
                <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-card sm:grid-cols-2 xl:grid-cols-4">
                  <div className="flex items-center gap-3">
                    <Flag className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Duration</p>
                      <p className="font-semibold text-slate-800">{tour.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Group</p>
                      <p className="font-semibold text-slate-800">
                        {tour.groupSize.min}-{tour.groupSize.max}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Location</p>
                      <p className="font-semibold text-slate-800">{tour.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Difficulty</p>
                      <p className="font-semibold text-slate-800">{difficultyLabels[tour.difficulty]}</p>
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
                    className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                      activeTab === tab ? 'bg-primary text-white shadow-soft' : 'bg-white text-slate-600 shadow-soft hover:bg-slate-100'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'Описание' ? (
                <div className="card-surface space-y-6 p-6">
                  <p className="text-base leading-7 text-slate-600">{tour.description}</p>
                  <div>
                    <h3 className="text-xl font-bold">Что особенно понравится</h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {tour.highlights.map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 px-4 py-4">
                          <Check className="mt-0.5 h-5 w-5 text-success" />
                          <span className="text-sm leading-6 text-slate-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {activeTab === 'Маршрут' ? (
                <div className="space-y-4">
                  {tour.itinerary.map((day) => {
                    const isOpen = openDay === day.day;
                    return (
                      <div key={day.day} className="card-surface overflow-hidden">
                        <button
                          className="flex w-full items-center justify-between gap-4 p-5 text-left"
                          onClick={() => setOpenDay(isOpen ? null : day.day)}
                        >
                          <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">День {day.day}</p>
                            <h3 className="mt-1 text-xl font-bold">{day.title}</h3>
                          </div>
                          <ChevronDown className={`h-5 w-5 text-slate-400 transition ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen ? (
                          <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                            <p className="text-sm leading-6 text-slate-600">{day.description}</p>
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

              {activeTab === 'Включено' ? (
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="card-surface p-6">
                    <h3 className="text-xl font-bold text-dark">Включено</h3>
                    <div className="mt-4 space-y-3">
                      {tour.includes.map((item) => (
                        <div key={item} className="flex items-start gap-3 text-sm text-slate-600">
                          <Check className="mt-0.5 h-5 w-5 text-success" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card-surface p-6">
                    <h3 className="text-xl font-bold text-dark">Не включено</h3>
                    <div className="mt-4 space-y-3">
                      {tour.excludes.map((item) => (
                        <div key={item} className="flex items-start gap-3 text-sm text-slate-600">
                          <X className="mt-0.5 h-5 w-5 text-rose-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {activeTab === 'Отзывы' ? (
                <div className="grid gap-4">
                  {reviews.map((review) => (
                    <article key={review.name} className="card-surface p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 overflow-hidden rounded-full">
                          <Image src={review.avatar} alt={review.name} fill className="object-cover" sizes="56px" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{review.name}</h3>
                          <div className="flex gap-1 text-amber-500">
                            {Array.from({ length: 5 }, (_, index) => (
                              <Star key={index} className={`h-4 w-4 ${index < review.rating ? 'fill-current' : ''}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-600">{review.text}</p>
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
                    <h3 className="text-2xl font-bold">{tour.guide.name}</h3>
                    {tour.guide.certified ? <Badge variant="success">Certified Guide</Badge> : null}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-current text-amber-500" />
                      {tour.guide.rating.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      {tour.guide.toursCount} туров
                    </span>
                    <span className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      {tour.guide.languages.join(', ')}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">{tour.guide.bio}</p>
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
