'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, MapPinned, Search, Users2 } from 'lucide-react';

import { Button, buttonStyles } from '@/components/ui/Button';

const destinations = ['Иссык-Куль', 'Бишкек', 'Нарын', 'Ош', 'Сон-Куль', 'Ала-Арча'];

export function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState(destinations[0]);
  const [date, setDate] = useState('2026-06-14');
  const [people, setPeople] = useState(2);

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/seed/kyrgyzstan-mountain/1920/1080')" }}
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="container-shell relative z-10 py-20 text-white">
        <div className="max-w-4xl">
          <motion.span
            className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Цифровая платформа туризма Кыргызстана
          </motion.span>
          <motion.h1
            className="mt-6 max-w-3xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Откройте настоящий Кыргызстан
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            От вдохновения до поездки — в одной платформе. Контент, маршруты, AI-подбор и бронирование в одном travel-продукте.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
          >
            <Link href="/tours" className={buttonStyles({ variant: 'primary', size: 'lg' })}>
              Найти тур
            </Link>
            <Link href="/map" className={buttonStyles({ variant: 'outline', size: 'lg' })}>
              Смотреть на карте
            </Link>
          </motion.div>
        </div>

        <motion.form
          className="mt-14 grid gap-4 rounded-[2rem] border border-white/10 bg-white/10 p-4 backdrop-blur-xl lg:grid-cols-[1.2fr_1fr_0.8fr_auto]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
          onSubmit={(event) => {
            event.preventDefault();
            const params = new URLSearchParams({
              q: destination,
              date,
              people: String(people),
              sort: 'popular',
              priceMax: '100000'
            });
            router.push(`/tours?${params.toString()}`);
          }}
        >
          <label className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-4">
            <MapPinned className="h-5 w-5 text-white/80" />
            <div className="flex-1">
              <span className="block text-xs uppercase tracking-[0.18em] text-white/50">Направление</span>
              <select
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-white"
              >
                {destinations.map((item) => (
                  <option key={item} className="text-dark">
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-4">
            <CalendarDays className="h-5 w-5 text-white/80" />
            <div className="flex-1">
              <span className="block text-xs uppercase tracking-[0.18em] text-white/50">Даты</span>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-white"
              />
            </div>
          </label>
          <label className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-4">
            <Users2 className="h-5 w-5 text-white/80" />
            <div className="flex-1">
              <span className="block text-xs uppercase tracking-[0.18em] text-white/50">Люди</span>
              <input
                type="number"
                min={1}
                max={12}
                value={people}
                onChange={(event) => setPeople(Number(event.target.value))}
                className="w-full bg-transparent text-sm font-semibold text-white"
              />
            </div>
          </label>
          <Button size="lg" iconLeft={<Search className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>
            Найти
          </Button>
        </motion.form>

        <motion.div
          className="mt-12 flex items-center gap-3 text-sm font-medium text-white/75"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="h-px w-14 bg-white/40" />
          Листайте, чтобы увидеть экосистему платформы
        </motion.div>
      </div>
    </section>
  );
}
