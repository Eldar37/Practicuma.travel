'use client';

import { MessageCircle, Phone, UserRound } from 'lucide-react';

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
    eyebrow: 'Партнёры',
    title: 'Партнёрство с Practicuma Travel',
    description:
      'Для гидов, туроператоров, travel-авторов и локальных команд. Подключение сейчас идёт напрямую через Telegram.',
    connectTitle: 'Подключение партнёров',
    connectText:
      'Напишите нам, отправьте информацию о вашем туре, фотографии и детали размещения. Дальше мы продолжим подключение уже в личном диалоге.',
    telegramLabel: 'Основной канал для подачи заявки на партнёрство.',
    phoneLabel: 'Если удобнее, можно сразу позвонить или написать в WhatsApp.',
    telegramCta: 'Перейти в Telegram',
    phoneCta: 'Позвонить',
    attachTitle: 'Что можно подключить',
    guideTitle: 'Для гидов',
    guideText:
      `Если вы гид или локальный организатор, напишите в Telegram ${PARTNER_TELEGRAM_HANDLE}. Укажите регион, форматы туров и приложите фото или описание программ.`,
    tags: ['Туры', 'Гиды', 'Видео', 'Маршруты', 'Трансферы', 'Юртовые лагеря']
  },
  ky: {
    eyebrow: 'Өнөктөштөр',
    title: 'Practicuma Travel менен өнөктөштүк',
    description:
      'Гиддер, туроператорлор, travel-авторлор жана локалдык командалар үчүн. Азыр кошулуу түздөн-түз Telegram аркылуу жүрөт.',
    connectTitle: 'Өнөктөштөрдү кошуу',
    connectText:
      'Бизге жазыңыз, туруңуз тууралуу маалымат, сүрөттөр жана жайгаштыруу деталдарын жөнөтүңүз. Андан кийин кошулуу процессин жеке диалогдо улантабыз.',
    telegramLabel: 'Өнөктөштүк арызын жөнөтүүнүн негизги каналы.',
    phoneLabel: 'Ыңгайлуу болсо, дароо чалып же WhatsApp аркылуу жазсаңыз болот.',
    telegramCta: 'Telegramга өтүү',
    phoneCta: 'Чалуу',
    attachTitle: 'Эмнени кошууга болот',
    guideTitle: 'Гиддер үчүн',
    guideText:
      `Эгер сиз гид же жергиликтүү уюштуруучу болсоңуз, Telegram ${PARTNER_TELEGRAM_HANDLE} дарегине жазыңыз. Аймакты, тур форматтарын жана программа сүрөттөмөсүн кошуңуз.`,
    tags: ['Турлар', 'Гиддер', 'Видеолор', 'Маршруттар', 'Трансферлер', 'Боз үй лагерлери']
  },
  en: {
    eyebrow: 'Partners',
    title: 'Partnership with Practicuma Travel',
    description:
      'For guides, tour operators, travel creators, and local teams. Partner onboarding currently happens directly through Telegram.',
    connectTitle: 'Partner onboarding',
    connectText:
      'Message us, send details about your tour, photos, and placement information. We will continue the onboarding process in a direct conversation.',
    telegramLabel: 'The main channel for partnership requests.',
    phoneLabel: 'If easier, you can call right away or message us on WhatsApp.',
    telegramCta: 'Open Telegram',
    phoneCta: 'Call now',
    attachTitle: 'What can be added',
    guideTitle: 'For guides',
    guideText:
      `If you are a guide or local organizer, message ${PARTNER_TELEGRAM_HANDLE} on Telegram. Include your region, tour formats, and photos or program descriptions.`,
    tags: ['Tours', 'Guides', 'Videos', 'Routes', 'Transfers', 'Yurt camps']
  }
} as const;

export default function PartnersPage() {
  const { locale } = useSitePreferences();
  const content = copy[locale];

  return (
    <div className="section-shell space-y-12">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{content.connectTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{content.connectText}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a
              href={PARTNER_TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-[2rem] border border-primary/10 bg-primary/5 p-6 transition hover:border-primary/20 hover:bg-primary/10"
            >
              <MessageCircle className="h-6 w-6 text-primary" />
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-slate-400">Telegram</p>
              <p className="mt-2 text-xl font-bold text-dark dark:text-white">{PARTNER_TELEGRAM_HANDLE}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{content.telegramLabel}</p>
            </a>
            <a
              href={PARTNER_PHONE_HREF}
              className="rounded-[2rem] border border-slate-200 bg-background p-6 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60"
            >
              <Phone className="h-6 w-6 text-primary" />
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-slate-400">Phone</p>
              <p className="mt-2 text-xl font-bold text-dark dark:text-white">{PARTNER_PHONE_DISPLAY}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{content.phoneLabel}</p>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={PARTNER_TELEGRAM_URL} target="_blank" rel="noreferrer" className={buttonStyles({ variant: 'primary', size: 'lg' })}>
              {content.telegramCta}
            </a>
            <a href={PARTNER_PHONE_HREF} className={buttonStyles({ variant: 'dark', size: 'lg' })}>
              {content.phoneCta}
            </a>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{content.attachTitle}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {content.tags.map((item) => (
                <span key={item} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div id="guides" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <UserRound className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{content.guideTitle}</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{content.guideText}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
