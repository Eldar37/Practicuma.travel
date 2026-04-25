'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { CalendarDays, LogOut, Mail, Phone, ShieldCheck, Ticket } from 'lucide-react';

import { useAuth } from '@/components/auth/AuthProvider';
import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';
import { buttonStyles } from '@/components/ui/Button';
import type { BookingRecord } from '@/lib/types';
import { formatCurrency, formatReadableDate } from '@/lib/utils';
import { formatCurrencyByLocale, formatReadableDateByLocale } from '@/lib/i18n';

export function AccountDashboard() {
  const { hydrated, logout, openAuth, user } = useAuth();
  const { locale, t } = useSitePreferences();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const raw = window.localStorage.getItem('practicuma-bookings');
    const allBookings = raw ? (JSON.parse(raw) as BookingRecord[]) : [];
    setBookings(allBookings.filter((entry) => entry.userEmail === user.email));
  }, [user]);

  const stats = useMemo(
    () => ({
      bookings: bookings.length,
      total: bookings.reduce((sum, item) => sum + item.total, 0)
    }),
    [bookings]
  );

  if (!hydrated) {
    return <div className="section-shell">{t('account.loading')}</div>;
  }

  if (!user) {
    return (
      <div className="section-shell">
        <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-slate-200 bg-white p-10 text-center shadow-card">
          <h1 className="text-4xl font-extrabold dark:text-white">{t('account.title')}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {t('account.guestDescription')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className={buttonStyles({ variant: 'primary', size: 'lg' })} onClick={() => openAuth('login')}>
              {t('nav.login')}
            </button>
            <button className={buttonStyles({ variant: 'dark', size: 'lg' })} onClick={() => openAuth('register')}>
              {t('account.createAccount')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-shell space-y-8">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="space-y-6">
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-card">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="eyebrow">Account</p>
                <h1 className="mt-4 text-4xl font-extrabold dark:text-white">{user.name}</h1>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    {user.email}
                  </span>
                  {user.phone ? (
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      {user.phone}
                    </span>
                  ) : null}
                </div>
              </div>
              <button className={buttonStyles({ variant: 'ghost', size: 'md' })} onClick={logout}>
                <LogOut className="h-4 w-4" />
                {t('nav.logout')}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold dark:text-white">{t('account.myBookings')}</h2>
            {bookings.length ? (
              bookings.map((booking) => (
                <article key={booking.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Ticket className="h-4 w-4 text-primary" />
                        <span>{booking.id}</span>
                      </div>
                      <h3 className="mt-2 text-2xl font-bold dark:text-white">{booking.tourTitle}</h3>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-primary" />
                          {formatReadableDateByLocale(booking.travelDate, locale)}
                        </span>
                        <span>{booking.people}</span>
                        <span>{formatCurrencyByLocale(booking.total, booking.currency, locale)}</span>
                      </div>
                    </div>
                    <span className="rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success">{t('account.confirmed')}</span>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-card">
                <p className="text-base text-slate-600">{t('account.noBookings')}</p>
                <div className="mt-6">
                  <Link href="/tours" className={buttonStyles({ variant: 'primary', size: 'lg' })}>
                    {t('account.chooseTour')}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{t('account.stats')}</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm text-slate-500">{t('account.bookings')}</p>
                <p className="text-3xl font-extrabold text-dark">{stats.bookings}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">{t('account.total')}</p>
                <p className="text-3xl font-extrabold text-dark">{formatCurrencyByLocale(stats.total, 'KGS', locale)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-success" />
              <h3 className="text-lg font-bold dark:text-white">{t('account.secure')}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {t('account.secureDescription')}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
