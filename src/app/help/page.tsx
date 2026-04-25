import { MessageCircle, ShieldCheck, Wallet } from 'lucide-react';

import { SectionHeading } from '@/components/shared/SectionHeading';
import { buttonStyles } from '@/components/ui/Button';
import {
  PARTNER_PHONE_DISPLAY,
  PARTNER_PHONE_HREF,
  PARTNER_TELEGRAM_HANDLE,
  PARTNER_TELEGRAM_URL
} from '@/lib/contacts';

export default function HelpPage() {
  return (
    <div className="section-shell space-y-12">
      <SectionHeading
        eyebrow="Help"
        title="Помощь и контакты"
        description="Единая страница для частых вопросов, информации об оплате и способов связи."
      />

      <section id="faq" className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-card">
        <h2 className="text-3xl font-extrabold">FAQ</h2>
        <div className="mt-6 grid gap-4">
          {[
            ['Как работает бронирование?', 'В текущей версии бронирование и оплата работают как полноценный UI-flow без внешнего платежного шлюза.'],
            ['Нужен ли аккаунт?', 'Да, для подтверждения бронирования теперь нужна локальная авторизация в браузере.'],
            ['Можно ли стать гидом или партнёром?', `Да, кнопка “Стать партнёром” ведет напрямую в Telegram ${PARTNER_TELEGRAM_HANDLE}.`]
          ].map(([title, text]) => (
            <div key={title} className="rounded-[1.5rem] bg-background px-5 py-4">
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="payment" className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-card">
        <div className="flex items-center gap-3">
          <Wallet className="h-5 w-5 text-accent" />
          <h2 className="text-3xl font-extrabold">Оплата</h2>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          На сайте реализован полный mock payment flow: выбор даты, числа участников, карточная форма, подтверждение, номер бронирования и сохранение в личный кабинет.
        </p>
        <div className="mt-5 flex items-center gap-3 rounded-[1.5rem] bg-success/10 px-5 py-4 text-sm font-medium text-success">
          <ShieldCheck className="h-4 w-4" />
          Все платежные действия в этой версии безопасны, потому что ничего реально не списывают.
        </div>
      </section>

      <section id="contacts" className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-card">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h2 className="text-3xl font-extrabold">Контакты</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a className="rounded-[1.5rem] bg-background px-5 py-4 text-sm font-semibold text-slate-700" href="mailto:hello@practicuma.travel">
            hello@practicuma.travel
          </a>
          <a className="rounded-[1.5rem] bg-background px-5 py-4 text-sm font-semibold text-slate-700" href={PARTNER_PHONE_HREF}>
            {PARTNER_PHONE_DISPLAY}
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={PARTNER_TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonStyles({ variant: 'primary', size: 'lg' })}
          >
            Стать партнёром
          </a>
          <a href="mailto:hello@practicuma.travel" className={buttonStyles({ variant: 'dark', size: 'lg' })}>
            Написать нам
          </a>
        </div>
      </section>
    </div>
  );
}
