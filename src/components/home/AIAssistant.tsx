'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Loader2, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button, buttonStyles } from '@/components/ui/Button';
import type { AIRecommendationRequest, AIRecommendationResponse, Tour } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface ApiErrorResponse {
  error?: string;
}

const categoryOptions: Array<{ value: '' | Tour['category']; label: string }> = [
  { value: '', label: 'Любой формат' },
  { value: 'burning', label: 'Горящие' },
  { value: 'weekend', label: 'Выходные' },
  { value: 'kyrgyzstan', label: 'По Кыргызстану' },
  { value: 'trekking', label: 'Треккинг' },
  { value: 'cultural', label: 'Культурные' }
];

const difficultyOptions: Array<{ value: '' | Tour['difficulty']; label: string }> = [
  { value: '', label: 'Любая сложность' },
  { value: 'easy', label: 'Легкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'hard', label: 'Сложный' }
];

const quickPrompts = [
  'Хочу в горы на 3 дня с детьми, бюджет 15000 сом',
  'Нужен легкий тур выходного дня рядом с Бишкеком',
  'Ищу культурную поездку по Кыргызстану на 5-7 дней',
  'Хочу серьезный треккинг и красивую горную локацию'
];

const initialForm: AIRecommendationRequest = {
  prompt: quickPrompts[0],
  budget: 15000,
  days: 3,
  people: 4,
  difficulty: 'easy',
  category: ''
};

export function AIAssistant() {
  const [form, setForm] = useState<AIRecommendationRequest>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AIRecommendationResponse | null>(null);

  const handleSubmit = async () => {
    if (!form.prompt.trim()) {
      setError('Опишите желаемую поездку, чтобы AI смог подобрать туры.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/ai-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = (await response.json()) as AIRecommendationResponse | ApiErrorResponse;

      const responseError = 'error' in data ? data.error : undefined;

      if (!response.ok || responseError) {
        setResult(null);
        setError(responseError ?? 'Не удалось получить рекомендации.');
        return;
      }

      setResult(data as AIRecommendationResponse);
    } catch {
      setResult(null);
      setError('Ошибка сети. Проверьте подключение и попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-shell" id="ai-assistant">
      <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-[#2D94B8] to-mint px-6 py-12 text-white shadow-2xl sm:px-10">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_500px] xl:items-start">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              AI-помощник по маршрутам
            </span>
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">AI-подбор реальных туров с сайта</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/85">
              Опишите поездку своими словами. AI учитывает ваши параметры, выбирает туры только из текущей базы Practicuma Travel и кратко объясняет, почему они подходят.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                  onClick={() => setForm((current) => ({ ...current, prompt }))}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4">
              <label className="space-y-2 text-sm font-semibold text-white/90">
                Что вы хотите?
                <textarea
                  value={form.prompt}
                  onChange={(event) => setForm((current) => ({ ...current, prompt: event.target.value }))}
                  placeholder="Например: хочу легкий семейный тур на 2-3 дня у озера, бюджет до 20 000 сом"
                  className="min-h-[120px] w-full rounded-[1.75rem] border border-white/15 bg-white/10 px-5 py-4 text-base text-white placeholder:text-white/55 outline-none backdrop-blur-sm transition focus:border-white/30 focus:ring-4 focus:ring-white/10"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="space-y-2 text-sm font-semibold text-white/90">
                  Бюджет, сом
                  <input
                    type="number"
                    min={0}
                    value={form.budget ?? ''}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        budget: event.target.value ? Number(event.target.value) : null
                      }))
                    }
                    className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-white/30 focus:ring-4 focus:ring-white/10"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-white/90">
                  Дней
                  <input
                    type="number"
                    min={1}
                    value={form.days ?? ''}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        days: event.target.value ? Number(event.target.value) : null
                      }))
                    }
                    className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-white/30 focus:ring-4 focus:ring-white/10"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-white/90">
                  Людей
                  <input
                    type="number"
                    min={1}
                    value={form.people ?? ''}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        people: event.target.value ? Number(event.target.value) : null
                      }))
                    }
                    className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-white/30 focus:ring-4 focus:ring-white/10"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-white/90">
                  Сложность
                  <select
                    value={form.difficulty ?? ''}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        difficulty: event.target.value as AIRecommendationRequest['difficulty']
                      }))
                    }
                    className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-white/30 focus:ring-4 focus:ring-white/10"
                  >
                    {difficultyOptions.map((option) => (
                      <option key={option.value || 'all'} value={option.value} className="text-slate-900">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                <label className="space-y-2 text-sm font-semibold text-white/90">
                  Формат тура
                  <select
                    value={form.category ?? ''}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        category: event.target.value as AIRecommendationRequest['category']
                      }))
                    }
                    className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-white/30 focus:ring-4 focus:ring-white/10"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value || 'all'} value={option.value} className="text-slate-900">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="flex items-end">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="min-w-[220px]"
                    onClick={handleSubmit}
                    disabled={loading}
                    iconLeft={loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  >
                    {loading ? 'Подбираем туры...' : 'Получить рекомендации'}
                  </Button>
                </div>
              </div>

              {error ? <div className="rounded-[1.5rem] bg-rose-500/15 px-4 py-3 text-sm font-medium text-white">{error}</div> : null}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-md">
            {!result ? (
              <div className="space-y-4">
                <div className="ml-auto max-w-[85%] rounded-[1.5rem] rounded-br-md bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-soft">
                  {form.prompt}
                </div>
                <div className="max-w-[92%] rounded-[1.5rem] rounded-bl-md bg-slate-950/20 px-4 py-4 text-sm leading-6 text-white/90">
                  Заполните запрос и нажмите «Получить рекомендации». Я предложу туры, которые реально есть на сайте, и объясню выбор коротко и по делу.
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="rounded-[1.5rem] bg-slate-950/20 px-4 py-4 text-sm leading-6 text-white/90">
                  {result.summary}
                </div>

                <div className="space-y-4">
                  {result.recommendations.map((item, index) => (
                    <article key={item.tourId} className="rounded-[1.75rem] bg-white p-5 text-slate-700 shadow-soft">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="primary">#{index + 1}</Badge>
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.duration}</span>
                          </div>
                          <h3 className="mt-3 text-xl font-bold text-dark">{item.title}</h3>
                          <p className="mt-2 text-sm text-slate-500">{item.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Цена</p>
                          <p className="mt-1 text-lg font-extrabold text-dark">{formatCurrency(item.price, item.currency)}</p>
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-600">{item.reason}</p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-slate-500">{item.shortDescription}</p>
                        <Link href={`/tours/${item.slug}`} className={buttonStyles({ variant: 'primary', size: 'sm' })}>
                          Открыть тур
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  <span>Источник ответа: {result.source === 'hf' ? 'Hugging Face AI + база Practicuma Travel' : 'База Practicuma Travel + локальный fallback'}</span>
                  <Link href="/tours" className="font-semibold text-white underline-offset-4 hover:underline">
                    Смотреть все туры
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
