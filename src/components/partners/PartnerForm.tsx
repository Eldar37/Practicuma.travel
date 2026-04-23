'use client';

import { useState } from 'react';

import { Building2, Mail, MapPinned, MessageSquareText, Phone, UserRound } from 'lucide-react';

import { Button } from '@/components/ui/Button';

export function PartnerForm() {
  const [form, setForm] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    region: 'Бишкек',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (!form.company || !form.name || !form.email || !form.phone || !form.message) {
      return;
    }

    const raw = window.localStorage.getItem('practicuma-partner-requests');
    const requests = raw ? JSON.parse(raw) : [];
    requests.unshift({
      ...form,
      submittedAt: new Date().toISOString()
    });
    window.localStorage.setItem('practicuma-partner-requests', JSON.stringify(requests));
    setSubmitted(true);
  };

  return (
    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-card">
      <h2 className="text-3xl font-extrabold">Заявка на партнёрство</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Для гидов, локальных туроператоров, авторов маршрутов и тревел-медиа. Форма сохраняет mock-заявку локально и показывает успешную отправку.
      </p>

      {submitted ? (
        <div className="mt-6 rounded-[2rem] bg-success/10 px-5 py-4 text-sm font-medium text-success">
          Заявка сохранена. В реальном проекте отсюда уходит запрос в CRM или почтовый backend.
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Компания
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4"
              value={form.company}
              onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
            />
          </div>
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Контактное лицо
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
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
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            />
          </div>
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Телефон
          <div className="relative">
            <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4"
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            />
          </div>
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-700 sm:col-span-2">
          Регион работы
          <div className="relative">
            <MapPinned className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4"
              value={form.region}
              onChange={(event) => setForm((current) => ({ ...current, region: event.target.value }))}
            >
              <option>Бишкек</option>
              <option>Issyk-Kul</option>
              <option>Нарын</option>
              <option>Ош</option>
              <option>Баткен</option>
            </select>
          </div>
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-700 sm:col-span-2">
          Чем вы хотите заниматься на платформе
          <div className="relative">
            <MessageSquareText className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-400" />
            <textarea
              rows={5}
              className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4"
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            />
          </div>
        </label>
      </div>

      <div className="mt-6">
        <Button size="lg" onClick={submit}>
          Отправить заявку
        </Button>
      </div>
    </div>
  );
}
