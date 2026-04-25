import { MessageCircle, Phone, UserRound } from 'lucide-react';

import { SectionHeading } from '@/components/shared/SectionHeading';
import { buttonStyles } from '@/components/ui/Button';
import {
  PARTNER_PHONE_DISPLAY,
  PARTNER_PHONE_HREF,
  PARTNER_TELEGRAM_HANDLE,
  PARTNER_TELEGRAM_URL
} from '@/lib/contacts';

export default function PartnersPage() {
  return (
    <div className="section-shell space-y-12">
      <SectionHeading
        eyebrow="Partners"
        title="Партнёрство с Practicuma Travel"
        description="Для гидов, туроператоров, тревел-авторов и локальных команд. Для подключения к платформе свяжитесь с нами напрямую в Telegram."
      />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-card">
          <h2 className="text-3xl font-extrabold">Подключение партнёров</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Сейчас вход для партнёров идёт напрямую через Telegram. Напишите нам, отправьте информацию о вашем туре, фото и детали размещения, и мы продолжим подключение уже в личном диалоге.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a
              href={PARTNER_TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-[2rem] border border-primary/10 bg-primary/5 p-6 transition hover:border-primary/20 hover:bg-primary/10"
            >
              <MessageCircle className="h-6 w-6 text-primary" />
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-slate-400">Telegram</p>
              <p className="mt-2 text-xl font-bold text-dark">{PARTNER_TELEGRAM_HANDLE}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Основной канал для подачи заявки на партнёрство.</p>
            </a>
            <a
              href={PARTNER_PHONE_HREF}
              className="rounded-[2rem] border border-slate-200 bg-background p-6 transition hover:border-slate-300"
            >
              <Phone className="h-6 w-6 text-primary" />
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-slate-400">Телефон</p>
              <p className="mt-2 text-xl font-bold text-dark">{PARTNER_PHONE_DISPLAY}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Если удобнее, можно сразу позвонить или написать в WhatsApp.</p>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={PARTNER_TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonStyles({ variant: 'primary', size: 'lg' })}
            >
              Перейти в Telegram
            </a>
            <a href={PARTNER_PHONE_HREF} className={buttonStyles({ variant: 'dark', size: 'lg' })}>
              Позвонить
            </a>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="text-2xl font-bold">Что можно подключить</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Туры', 'Гиды', 'Видео', 'Маршруты', 'Трансферы', 'Юртовые лагеря'].map((item) => (
                <span key={item} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div id="guides" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
            <div className="flex items-center gap-3">
              <UserRound className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Для гидов</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Если вы гид или локальный организатор, напишите в Telegram {PARTNER_TELEGRAM_HANDLE}. Укажите ваш регион, форматы туров и приложите фото или описание программ.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
