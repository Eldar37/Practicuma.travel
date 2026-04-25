'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { CheckCircle2, CreditCard, Mail, Phone, ShieldCheck, UserRound, Wallet } from 'lucide-react';

import { useAuth } from '@/components/auth/AuthProvider';
import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';
import { Modal } from '@/components/ui/Modal';
import { Button, buttonStyles } from '@/components/ui/Button';
import type { BookingRecord, Tour } from '@/lib/types';
import { formatCurrencyByLocale, formatDateRangeByLocale } from '@/lib/i18n';

interface BookingWidgetProps {
  tour: Tour;
}

type BookingStep = 1 | 2 | 3 | 4;

export function BookingWidget({ tour }: BookingWidgetProps) {
  const { openAuth, user } = useAuth();
  const { locale } = useSitePreferences();
  const [date, setDate] = useState(tour.startDate);
  const [people, setPeople] = useState(tour.groupSize.min);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<BookingStep>(1);
  const [bookingNumber, setBookingNumber] = useState('');
  const [personal, setPersonal] = useState({ name: '', email: '', phone: '' });
  const [participants, setParticipants] = useState<Array<{ name: string; age: string }>>([]);
  const [openAfterAuth, setOpenAfterAuth] = useState(false);
  const total = useMemo(() => people * tour.price, [people, tour.price]);

  useEffect(() => {
    setParticipants((current) => Array.from({ length: people }, (_, index) => current[index] ?? { name: '', age: '' }));
  }, [people]);

  useEffect(() => {
    if (!user) {
      return;
    }

    setPersonal((current) => ({
      name: current.name || user.name,
      email: current.email || user.email,
      phone: current.phone || user.phone || ''
    }));
  }, [user]);

  useEffect(() => {
    if (!user || !openAfterAuth) {
      return;
    }

    setOpen(true);
    setOpenAfterAuth(false);
  }, [openAfterAuth, user]);

  const closeModal = () => {
    setOpen(false);
    setStep(1);
  };

  const persistBooking = (record: BookingRecord) => {
    const raw = window.localStorage.getItem('practicuma-bookings');
    const bookings = raw ? (JSON.parse(raw) as BookingRecord[]) : [];
    window.localStorage.setItem('practicuma-bookings', JSON.stringify([record, ...bookings]));
  };

  const handleNext = () => {
    if (step === 1 && (!personal.name || !personal.email || !personal.phone)) {
      return;
    }

    if (step === 2 && participants.some((item) => !item.name || !item.age)) {
      return;
    }

    if (step === 3) {
      const nextBookingNumber = `PT-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingNumber(nextBookingNumber);
      persistBooking({
        id: nextBookingNumber,
        tourId: tour.id,
        tourTitle: tour.title,
        travelDate: date,
        people,
        total,
        currency: tour.currency,
        bookedAt: new Date().toISOString(),
        userEmail: personal.email,
        status: 'confirmed'
      });
    }

    setStep((current) => (current < 4 ? ((current + 1) as BookingStep) : current));
  };

  const labels =
    locale === 'en'
      ? {
          from: 'from',
          perPerson: 'per person',
          departureDate: 'Departure date',
          travelers: 'Travelers',
          total: 'Total',
          book: 'Book now',
          ask: 'Ask a question',
          securePayment: 'Secure payment',
          refund: 'Refund guarantee',
          support: '24/7 support',
          bookingTitle: 'Tour booking',
          authRequired: 'Sign in to confirm the booking. After login, your data will be filled automatically.',
          step: 'Step',
          of: 'of',
          fullName: 'Full name',
          phone: 'Phone',
          participants: 'Participants',
          participant: 'Participant',
          age: 'Age',
          payment: 'Payment',
          cardNumber: 'Card number',
          expiry: 'Expiry date',
          toPay: 'To pay',
          confirmed: 'Booking confirmed',
          bookingNumber: 'Booking number',
          close: 'Close',
          back: 'Back',
          confirmAndPay: 'Confirm and pay',
          next: 'Next'
        }
      : locale === 'ky'
        ? {
            from: 'баштап',
            perPerson: 'адамга',
            departureDate: 'Чыгуу датасы',
            travelers: 'Адам саны',
            total: 'Жалпы',
            book: 'Брондоо',
            ask: 'Суроо берүү',
            securePayment: 'Коопсуз төлөм',
            refund: 'Кайтаруу кепилдиги',
            support: '24/7 колдоо',
            bookingTitle: 'Турду брондоо',
            authRequired: 'Брондоону ырастоо үчүн кирүү керек. Киргенден кийин маалымат автоматтык толукталат.',
            step: 'Кадам',
            of: 'ичинен',
            fullName: 'Аты-жөнү',
            phone: 'Телефон',
            participants: 'Катышуучулар',
            participant: 'Катышуучу',
            age: 'Жашы',
            payment: 'Төлөм',
            cardNumber: 'Карта номери',
            expiry: 'Жарактуулук мөөнөтү',
            toPay: 'Төлөнөт',
            confirmed: 'Брондоо тастыкталды',
            bookingNumber: 'Брондоо номери',
            close: 'Жабуу',
            back: 'Артка',
            confirmAndPay: 'Тастыктап төлөө',
            next: 'Улантуу'
          }
        : {
            from: 'от',
            perPerson: 'за человека',
            departureDate: 'Дата выезда',
            travelers: 'Количество людей',
            total: 'Итого',
            book: 'Забронировать',
            ask: 'Задать вопрос',
            securePayment: 'Безопасная оплата',
            refund: 'Гарантия возврата',
            support: 'Поддержка 24/7',
            bookingTitle: 'Бронирование тура',
            authRequired: 'Для подтверждения бронирования нужна авторизация. После входа данные подтянутся автоматически.',
            step: 'Шаг',
            of: 'из',
            fullName: 'Имя и фамилия',
            phone: 'Телефон',
            participants: 'Участники',
            participant: 'Участник',
            age: 'Возраст',
            payment: 'Оплата',
            cardNumber: 'Номер карты',
            expiry: 'Срок действия',
            toPay: 'К оплате',
            confirmed: 'Бронирование подтверждено',
            bookingNumber: 'Номер бронирования',
            close: 'Закрыть',
            back: 'Назад',
            confirmAndPay: 'Подтвердить и оплатить',
            next: 'Далее'
          };

  return (
    <>
      <div className="card-surface sticky top-28 space-y-6 p-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{labels.from}</p>
          <h3 className="font-heading text-4xl font-extrabold text-dark">{formatCurrencyByLocale(tour.price, tour.currency, locale)}</h3>
          <p className="text-sm text-slate-500">{labels.perPerson}</p>
        </div>
        <div className="space-y-4">
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            {labels.departureDate}
            <input
              type="date"
              value={date}
              min={tour.startDate}
              max={tour.endDate}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium"
            />
          </label>
          <div className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">{labels.travelers}</span>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
              <button
                aria-label="Уменьшить количество людей"
                className="h-9 w-9 rounded-full bg-slate-100 text-lg font-semibold text-slate-700"
                onClick={() => setPeople((value) => Math.max(1, value - 1))}
              >
                -
              </button>
              <span className="text-lg font-bold text-dark">{people}</span>
              <button
                aria-label="Увеличить количество людей"
                className="h-9 w-9 rounded-full bg-slate-100 text-lg font-semibold text-slate-700"
                onClick={() => setPeople((value) => value + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-[1.5rem] bg-slate-50 p-4">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>{people}</span>
            <span>{formatCurrencyByLocale(tour.price, tour.currency, locale)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-lg font-bold text-dark">
            <span>{labels.total}</span>
            <span>{formatCurrencyByLocale(total, tour.currency, locale)}</span>
          </div>
        </div>
        <div className="space-y-3">
          <Button
            fullWidth
            size="lg"
            onClick={() => {
              if (!user) {
                setOpenAfterAuth(true);
                openAuth('login');
                return;
              }

              setOpen(true);
            }}
          >
            {labels.book}
          </Button>
          <Link href="/help#contacts" className={buttonStyles({ variant: 'ghost', size: 'lg', fullWidth: true })}>
            {labels.ask}
          </Link>
        </div>
        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-success" />
            <span>{labels.securePayment}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span>{labels.refund}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-success" />
            <span>{labels.support}</span>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={closeModal} title={labels.bookingTitle}>
        <div className="space-y-8">
          {!user ? (
            <div className="rounded-[1.5rem] bg-accent/10 px-4 py-3 text-sm font-medium text-dark">
              {labels.authRequired}
            </div>
          ) : null}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
              <span>{labels.step} {step} {labels.of} 4</span>
              <span>{tour.title}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(step / 4) * 100}%` }} />
            </div>
          </div>

          {step === 1 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-slate-700 sm:col-span-2">
                {labels.fullName}
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4"
                    value={personal.name}
                    onChange={(event) => setPersonal((current) => ({ ...current, name: event.target.value }))}
                  />
                </div>
              </label>
              <label className="space-y-2 text-sm font-semibold text-slate-700">
                Email
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4"
                    value={personal.email}
                    onChange={(event) => setPersonal((current) => ({ ...current, email: event.target.value }))}
                  />
                </div>
              </label>
              <label className="space-y-2 text-sm font-semibold text-slate-700">
                {labels.phone}
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4"
                    value={personal.phone}
                    onChange={(event) => setPersonal((current) => ({ ...current, phone: event.target.value }))}
                  />
                </div>
              </label>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <h4 className="font-heading text-xl font-bold text-dark">{labels.participants}</h4>
              <div className="grid gap-4">
                {participants.map((participant, index) => (
                  <div key={index} className="grid gap-4 rounded-[1.5rem] border border-slate-200 p-4 sm:grid-cols-[1fr_140px]">
                    <label className="space-y-2 text-sm font-semibold text-slate-700">
                      {labels.participant} {index + 1}
                      <input
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                        value={participant.name}
                        onChange={(event) =>
                          setParticipants((current) =>
                            current.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, name: event.target.value } : item
                            )
                          )
                        }
                      />
                    </label>
                    <label className="space-y-2 text-sm font-semibold text-slate-700">
                      {labels.age}
                      <input
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                        value={participant.age}
                        onChange={(event) =>
                          setParticipants((current) =>
                            current.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, age: event.target.value } : item
                            )
                          )
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-4">
              <h4 className="font-heading text-xl font-bold text-dark">{labels.payment}</h4>
              <div className="grid gap-4 rounded-[1.5rem] bg-slate-50 p-5">
                <label className="space-y-2 text-sm font-semibold text-slate-700">
                  {labels.cardNumber}
                  <div className="relative">
                    <CreditCard className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4" placeholder="4242 4242 4242 4242" />
                  </div>
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    {labels.expiry}
                    <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="12/28" />
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    CVV
                    <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="123" />
                  </label>
                </div>
                <div className="flex items-center justify-between rounded-[1.5rem] border border-primary/10 bg-white p-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-600">{labels.toPay}</p>
                    <p className="font-heading text-2xl font-extrabold text-dark">{formatCurrencyByLocale(total, tour.currency, locale)}</p>
                  </div>
                  <Wallet className="h-10 w-10 text-primary" />
                </div>
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="rounded-[2rem] bg-gradient-to-br from-primary/10 to-white p-8 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
              <h4 className="mt-4 font-heading text-2xl font-extrabold text-dark">{labels.confirmed}</h4>
              <p className="mt-3 text-slate-600">
                {labels.bookingNumber} <span className="font-bold text-dark">{bookingNumber}</span>
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {locale === 'en'
                  ? `We sent trip details to ${personal.email}. The tour is scheduled for ${formatDateRangeByLocale(date, tour.endDate, locale)}.`
                  : locale === 'ky'
                    ? `${personal.email} дарегине сапардын деталдарын жөнөттүк. Тур ${formatDateRangeByLocale(date, tour.endDate, locale)} күндөрүнө пландалды.`
                    : `Мы отправили детали поездки на ${personal.email}. Тур запланирован на ${formatDateRangeByLocale(date, tour.endDate, locale)}.`}
              </p>
              <div className="mt-6">
                <Button onClick={closeModal}>{labels.close}</Button>
              </div>
            </div>
          ) : null}

          {step < 4 ? (
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <Button variant="ghost" onClick={() => setStep((current) => (current > 1 ? ((current - 1) as BookingStep) : current))} disabled={step === 1}>
                {labels.back}
              </Button>
              <Button onClick={handleNext}>{step === 3 ? labels.confirmAndPay : labels.next}</Button>
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  );
}
