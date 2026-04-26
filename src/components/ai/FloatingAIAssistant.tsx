'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import { BotMessageSquare, Loader2, SendHorizonal, Sparkles, X } from 'lucide-react';

import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrencyByLocale } from '@/lib/i18n';
import type { AIRecommendationResponse } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ApiErrorResponse {
  error?: string;
}

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  recommendations?: AIRecommendationResponse['recommendations'];
  source?: AIRecommendationResponse['source'];
}

const widgetCopy = {
  ru: {
    open: 'Открыть AI-чат',
    title: 'AI-ассистент',
    subtitle: 'Подберёт туры только из базы сайта',
    greeting:
      'Опишите поездку в свободной форме, и я предложу подходящие туры с Practicuma Travel с коротким объяснением.',
    placeholder: 'Например: хочу лёгкий тур на 2 дня рядом с Бишкеком до 15000 сом',
    send: 'Отправить',
    sending: 'Подбираем...',
    suggested: 'Быстрые запросы',
    price: 'Цена',
    openTour: 'Открыть тур',
    allTours: 'Все туры',
    source: 'Источник',
    sourceOllama: 'Локальный Ollama AI',
    sourceFallback: 'Резервный подбор',
    empty: 'Напишите сообщение, и AI начнёт подбор.',
    error: 'Не удалось получить ответ. Попробуйте ещё раз.',
    prompts: [
      'Хочу семейный тур на 3 дня с бюджетом 15000 сом',
      'Нужен weekend-тур рядом с Бишкеком',
      'Ищу культурный тур по Кыргызстану на 5-7 дней'
    ]
  },
  ky: {
    open: 'AI-чатты ачуу',
    title: 'AI-жардамчы',
    subtitle: 'Сайттагы турлар базасынан гана тандайт',
    greeting:
      'Сапарыңызды эркин формада жазыңыз, мен Practicuma Travel сайтындагы ылайыктуу турларды кыска түшүндүрмө менен сунуштайм.',
    placeholder: 'Мисалы: Бишкекке жакын 2 күндүк жеңил тур керек, бюджет 15000 сомго чейин',
    send: 'Жөнөтүү',
    sending: 'Тандалып жатат...',
    suggested: 'Тез суроолор',
    price: 'Баасы',
    openTour: 'Турду ачуу',
    allTours: 'Бардык турлар',
    source: 'Булак',
    sourceOllama: 'Локалдык Ollama AI',
    sourceFallback: 'Резервдик тандоо',
    empty: 'Кабар жазыңыз, ошондо AI тандоону баштайт.',
    error: 'Жооп алуу мүмкүн болгон жок. Кайра аракет кылыңыз.',
    prompts: [
      'Балдар менен 3 күндүк үй-бүлөлүк тур керек, бюджет 15000 сом',
      'Бишкекке жакын дем алыш туру керек',
      'Кыргызстан боюнча 5-7 күндүк маданий тур издеп жатам'
    ]
  },
  en: {
    open: 'Open AI chat',
    title: 'AI assistant',
    subtitle: 'Matches tours only from the site database',
    greeting:
      'Describe your trip in your own words and I will suggest matching Practicuma Travel tours with a short explanation.',
    placeholder: 'For example: I want an easy 2-day tour near Bishkek under 15000 som',
    send: 'Send',
    sending: 'Matching...',
    suggested: 'Quick prompts',
    price: 'Price',
    openTour: 'Open tour',
    allTours: 'All tours',
    source: 'Source',
    sourceOllama: 'Local Ollama AI',
    sourceFallback: 'Fallback matching',
    empty: 'Send a message and the AI will start matching.',
    error: 'Could not get a response. Please try again.',
    prompts: [
      'I want a 3-day family tour with a 15000 som budget',
      'I need a weekend tour near Bishkek',
      'I am looking for a cultural tour across Kyrgyzstan for 5-7 days'
    ]
  }
} as const;

export function FloatingAIAssistant() {
  const { locale } = useSitePreferences();
  const content = widgetCopy[locale];
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const initialMessage = useMemo<ChatMessage>(
    () => ({
      id: `assistant-greeting-${locale}`,
      role: 'assistant',
      text: content.greeting
    }),
    [content.greeting, locale]
  );

  useEffect(() => {
    setMessages((current) => {
      if (current.length === 0) {
        return [initialMessage];
      }

      if (current[0]?.id?.startsWith('assistant-greeting-')) {
        return [initialMessage, ...current.slice(1)];
      }

      return current;
    });
  }, [initialMessage]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    });
  }, [messages, open, loading]);

  const submitPrompt = async (nextPrompt?: string) => {
    const text = (nextPrompt ?? prompt).trim();

    if (!text || loading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text
    };

    setOpen(true);
    setError('');
    setPrompt('');
    setMessages((current) => [...current, userMessage]);
    setLoading(true);

    try {
      const response = await fetch('/api/ai-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: text })
      });

      const data = (await response.json()) as AIRecommendationResponse | ApiErrorResponse;
      const responseError = 'error' in data ? data.error : undefined;

      if (!response.ok || responseError) {
        setError(responseError ?? content.error);
        setMessages((current) => [
          ...current,
          {
            id: `assistant-error-${Date.now()}`,
            role: 'assistant',
            text: responseError ?? content.error
          }
        ]);
        return;
      }

      const payload = data as AIRecommendationResponse;
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: payload.summary,
          recommendations: payload.recommendations,
          source: payload.source
        }
      ]);
    } catch {
      setError(content.error);
      setMessages((current) => [
        ...current,
        {
          id: `assistant-error-${Date.now()}`,
          role: 'assistant',
          text: content.error
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[65] flex items-end gap-3">
        {open ? (
          <div className="hidden rounded-full border border-primary/15 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-card backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 lg:block">
            {content.subtitle}
          </div>
        ) : null}
        <button
          type="button"
          aria-label={content.open}
          onClick={() => setOpen((current) => !current)}
          className="group flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary via-[#2D94B8] to-mint text-white shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(37,99,235,0.35)] focus:outline-none focus:ring-4 focus:ring-primary/25"
        >
          <BotMessageSquare className="h-7 w-7 transition duration-300 group-hover:scale-110" />
        </button>
      </div>

      <aside
        className={cn(
          'fixed bottom-24 right-4 z-[64] flex w-[calc(100vw-2rem)] max-w-[420px] origin-bottom-right flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] transition-all duration-300 dark:border-slate-800 dark:bg-slate-900',
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        )}
        aria-hidden={!open}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-gradient-to-r from-primary via-[#2D94B8] to-mint px-5 py-4 text-white dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
              <Sparkles className="h-3.5 w-3.5" />
              AI
            </div>
            <h3 className="mt-3 font-heading text-2xl font-extrabold">{content.title}</h3>
            <p className="mt-1 text-sm text-white/80">{content.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close AI chat"
            className="rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div ref={scrollRef} className="flex max-h-[60vh] flex-1 flex-col gap-4 overflow-y-auto bg-slate-50/80 px-4 py-4 dark:bg-slate-950/60">
          {messages.map((message) => (
            <div key={message.id} className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'max-w-[92%] rounded-[1.5rem] px-4 py-3 text-sm leading-6 shadow-soft',
                  message.role === 'user'
                    ? 'rounded-br-md bg-primary text-white'
                    : 'rounded-bl-md bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200'
                )}
              >
                <p>{message.text}</p>

                {message.recommendations?.length ? (
                  <div className="mt-4 space-y-3">
                    {message.recommendations.slice(0, 3).map((item, index) => (
                      <article
                        key={item.tourId}
                        className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="primary">#{index + 1}</Badge>
                              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{item.duration}</span>
                            </div>
                            <h4 className="mt-2 font-bold text-slate-900 dark:text-white">{item.title}</h4>
                            <p className="mt-1 text-xs text-slate-500">{item.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{content.price}</p>
                            <p className="mt-1 text-sm font-extrabold text-slate-900 dark:text-white">
                              {formatCurrencyByLocale(item.price, item.currency, locale)}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 text-xs leading-5 text-slate-600 dark:text-slate-300">{item.reason}</p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <span className="line-clamp-1 text-xs text-slate-500">{item.shortDescription}</span>
                          <Link
                            href={`/tours/${item.slug}`}
                            onClick={() => setOpen(false)}
                            className="shrink-0 text-xs font-semibold text-primary transition hover:opacity-80"
                          >
                            {content.openTour}
                          </Link>
                        </div>
                      </article>
                    ))}

                    {message.source ? (
                      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                        {content.source}: {message.source === 'ollama' ? content.sourceOllama : content.sourceFallback}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          ))}

          {loading ? (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-2 rounded-[1.25rem] rounded-bl-md bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-soft dark:bg-slate-900 dark:text-slate-200">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                {content.sending}
              </div>
            </div>
          ) : null}

          {!loading && messages.length <= 1 ? (
            <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white/80 px-4 py-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              {content.empty}
            </div>
          ) : null}
        </div>

        <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap gap-2">
            {content.prompts.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  void submitPrompt(suggestion);
                }}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-primary/20 hover:text-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {error ? <p className="mb-3 text-xs font-medium text-rose-500">{error}</p> : null}

          <div className="flex gap-3">
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  void submitPrompt();
                }
              }}
              placeholder={content.placeholder}
              className="min-h-[92px] flex-1 resize-none rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <Button
              type="button"
              className="self-end"
              onClick={() => {
                void submitPrompt();
              }}
              disabled={loading || !prompt.trim()}
              iconLeft={loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
            >
              {loading ? content.sending : content.send}
            </Button>
          </div>

          <div className="mt-3 flex justify-end">
            <Link
              href="/tours"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold text-primary transition hover:opacity-80"
            >
              {content.allTours}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
