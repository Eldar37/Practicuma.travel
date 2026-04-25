'use client';

import { MessageCircle, ShieldCheck, Wallet } from 'lucide-react';

import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { buttonStyles } from '@/components/ui/Button';
import {
  PARTNER_PHONE_DISPLAY,
  PARTNER_PHONE_HREF,
  PARTNER_TELEGRAM_HANDLE,
  PARTNER_TELEGRAM_URL
} from '@/lib/contacts';

const copy = {
  ru: {
    eyebrow: 'Помощь',
    title: 'Помощь и контакты',
    description: 'Частые вопросы, информация об оплате и быстрые способы связи в одном месте.',
    faq: 'FAQ',
    payment: 'Оплата',
    contacts: 'Контакты',
    partner: 'Стать партнёром',
    write: 'Написать нам',
    safe: 'В этой версии платежный сценарий демонстрационный: реальные списания не выполняются.',
    paymentText:
      'На сайте уже работает полноценный booking flow: выбор даты, количества участников, карточная форма, подтверждение и сохранение бронирования в локальном кабинете.',
    faqItems: [
      ['Как работает бронирование?', 'Сейчас это рабочий UI-сценарий без внешнего платежного шлюза и без реального списания средств.'],
      ['Нужен ли аккаунт?', 'Да. Для подтверждения бронирования используется локальная авторизация по email и паролю.'],
      ['Можно ли стать партнёром?', `Да. Кнопка партнёрства ведёт напрямую в Telegram ${PARTNER_TELEGRAM_HANDLE}.`]
    ]
  },
  ky: {
    eyebrow: 'Жардам',
    title: 'Жардам жана байланыштар',
    description: 'Көп берилген суроолор, төлөм тууралуу маалымат жана байланыш жолдору бир жерде.',
    faq: 'FAQ',
    payment: 'Төлөм',
    contacts: 'Байланыштар',
    partner: 'Өнөктөш болуу',
    write: 'Бизге жазуу',
    safe: 'Бул версияда төлөм сценарийи демонстрациялык: чыныгы акча алынбайт.',
    paymentText:
      'Сайтта брондоо агымы иштейт: датаны тандоо, катышуучулардын саны, карта формасы, ырастоо жана брондоону локалдык кабинетке сактоо.',
    faqItems: [
      ['Брондоо кантип иштейт?', 'Азыр бул сырткы төлөм шлюзусуз жана чыныгы акча алынбаган иштеген UI-сценарий.'],
      ['Аккаунт керекпи?', 'Ооба. Брондоону ырастоо үчүн email жана сырсөз менен локалдык авторизация колдонулат.'],
      ['Өнөктөш боло аламбы?', `Ооба. Өнөктөштүк баскычы түздөн-түз Telegram ${PARTNER_TELEGRAM_HANDLE} барагына алып барат.`]
    ]
  },
  en: {
    eyebrow: 'Help',
    title: 'Help and contacts',
    description: 'Common questions, payment information, and quick contact options in one place.',
    faq: 'FAQ',
    payment: 'Payments',
    contacts: 'Contacts',
    partner: 'Become a partner',
    write: 'Email us',
    safe: 'In this version, the payment flow is a demo only: no real charges are made.',
    paymentText:
      'The site already includes a working booking flow: choose dates, participants, fill a card UI, confirm, and save the booking in the local account dashboard.',
    faqItems: [
      ['How does booking work?', 'At the moment it is a working UI flow without an external payment gateway and without real money processing.'],
      ['Do I need an account?', 'Yes. Booking confirmation now uses local email-and-password authentication.'],
      ['Can I become a partner?', `Yes. The partnership button takes you directly to Telegram ${PARTNER_TELEGRAM_HANDLE}.`]
    ]
  }
} as const;

export default function HelpPage() {
  const { locale } = useSitePreferences();
  const content = copy[locale];

  return (
    <div className="section-shell space-y-12">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />

      <section id="faq" className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{content.faq}</h2>
        <div className="mt-6 grid gap-4">
          {content.faqItems.map(([title, text]) => (
            <div key={title} className="rounded-[1.5rem] bg-background px-5 py-4 dark:bg-slate-800/60">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="payment" className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <Wallet className="h-5 w-5 text-accent" />
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{content.payment}</h2>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{content.paymentText}</p>
        <div className="mt-5 flex items-center gap-3 rounded-[1.5rem] bg-success/10 px-5 py-4 text-sm font-medium text-success">
          <ShieldCheck className="h-4 w-4" />
          {content.safe}
        </div>
      </section>

      <section id="contacts" className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{content.contacts}</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            className="rounded-[1.5rem] bg-background px-5 py-4 text-sm font-semibold text-slate-700 dark:bg-slate-800/60 dark:text-slate-100"
            href="mailto:hello@practicuma.travel"
          >
            hello@practicuma.travel
          </a>
          <a
            className="rounded-[1.5rem] bg-background px-5 py-4 text-sm font-semibold text-slate-700 dark:bg-slate-800/60 dark:text-slate-100"
            href={PARTNER_PHONE_HREF}
          >
            {PARTNER_PHONE_DISPLAY}
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <a href={PARTNER_TELEGRAM_URL} target="_blank" rel="noreferrer" className={buttonStyles({ variant: 'primary', size: 'lg' })}>
            {content.partner}
          </a>
          <a href="mailto:hello@practicuma.travel" className={buttonStyles({ variant: 'dark', size: 'lg' })}>
            {content.write}
          </a>
        </div>
      </section>
    </div>
  );
}
