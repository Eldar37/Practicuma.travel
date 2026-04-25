'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import { AlertCircle, Loader2, Mic, Sparkles, Square, Volume2 } from 'lucide-react';

import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';
import { Badge } from '@/components/ui/Badge';
import { Button, buttonStyles } from '@/components/ui/Button';
import { difficultyLabelsByLocale, formatCurrencyByLocale, tourCategoryLabelsByLocale } from '@/lib/i18n';
import type { AIRecommendationRequest, AIRecommendationResponse, Tour } from '@/lib/types';

interface ApiErrorResponse {
  error?: string;
}

type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error' | 'unsupported';

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionErrorLike {
  error: string;
  message?: string;
}

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onstart: ((event: Event) => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type RecognitionConstructor = new () => SpeechRecognitionLike;

const getRecognitionConstructor = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const voiceWindow = window as Window & {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };

  return voiceWindow.SpeechRecognition ?? voiceWindow.webkitSpeechRecognition ?? null;
};

const speechLocaleMap = {
  ru: 'ru-RU',
  ky: 'ky-KG',
  en: 'en-US'
} as const;

const copy = {
  ru: {
    badge: 'AI-помощник по маршрутам',
    title: 'AI-подбор реальных туров с сайта',
    description:
      'Можно писать текстом или говорить голосом. AI учитывает ваши параметры, выбирает туры только из базы Practicuma Travel и коротко объясняет выбор.',
    empty: 'Пишите текстом или говорите голосом. После запроса я подберу реальные туры с сайта и, если браузер поддерживает озвучку, прочитаю ответ вслух.',
    browserHint: 'Голосовой ввод лучше всего работает в Chrome и Edge.',
    outputHint: 'Распознавание речи доступно, но озвучка ответа в этом браузере может не сработать.',
    transcriptTitle: 'Распознано',
    transcriptEmpty: 'Нажмите на микрофон, произнесите запрос и завершите запись. Например: «Хочу семейный тур на 3 дня до 15 000 сом».',
    promptLabel: 'Что вы хотите?',
    promptPlaceholder: 'Например: хочу лёгкий семейный тур на 2-3 дня у озера, бюджет до 20 000 сом',
    budget: 'Бюджет, сом',
    days: 'Дней',
    people: 'Людей',
    difficulty: 'Сложность',
    category: 'Формат тура',
    anyCategory: 'Любой формат',
    anyDifficulty: 'Любая сложность',
    startVoice: 'Сказать голосом',
    finishVoice: 'Завершить запись',
    cancel: 'Отмена',
    stopVoice: 'Остановить озвучку',
    processingVoice: 'Обрабатываем голос...',
    recommend: 'Получить рекомендации',
    recommending: 'Подбираем туры...',
    source: 'Источник ответа',
    sourceOllama: 'Локальный Ollama AI + база Practicuma Travel',
    sourceFallback: 'Резервный подбор по базе Practicuma Travel',
    openTour: 'Открыть тур',
    viewAll: 'Смотреть все туры',
    price: 'Цена',
    states: {
      idle: 'Голосовой помощник готов',
      listening: 'Слушаю...',
      processing: 'ИИ подбирает туры...',
      speaking: 'Идет озвучка ответа...',
      error: 'Ошибка голосового режима',
      unsupported: 'Браузер не поддерживает голосовой режим'
    },
    errors: {
      promptRequired: 'Опишите желаемую поездку, чтобы AI смог подобрать туры.',
      generic: 'Не удалось получить рекомендации.',
      network: 'Ошибка сети. Проверьте подключение и попробуйте ещё раз.',
      unsupported: 'Голосовой ввод поддерживается не в каждом браузере. Лучше всего он работает в Chrome.',
      speechMissing: 'Речь не распознана. Попробуйте ещё раз и говорите чуть ближе к микрофону.',
      micStart: 'Не удалось включить микрофон. Обновите страницу и попробуйте снова.',
      speak: 'Голосовой ответ не удалось озвучить. Текстовые рекомендации уже показаны на экране.'
    },
    voiceErrors: {
      notAllowed: 'Дайте доступ к микрофону в браузере, чтобы использовать голосовой режим.',
      audioCapture: 'Микрофон не найден. Проверьте устройство и попробуйте снова.',
      network: 'Во время распознавания речи произошла ошибка сети.',
      noSpeech: 'Речь не распознана. Попробуйте говорить чуть громче и ближе к микрофону.',
      default: 'Не удалось распознать голосовой запрос. Попробуйте ещё раз.'
    },
    prompts: [
      'Хочу в горы на 3 дня с детьми, бюджет 15000 сом',
      'Нужен лёгкий тур выходного дня рядом с Бишкеком',
      'Ищу культурную поездку по Кыргызстану на 5-7 дней',
      'Хочу серьезный треккинг и красивую горную локацию'
    ],
    voiceReplyFirst: 'Первый вариант',
    voiceReplySecond: 'Второй вариант'
  },
  ky: {
    badge: 'AI-маршрут жардамчысы',
    title: 'Сайттагы реалдуу турларды AI менен тандоо',
    description:
      'Суроону текст менен да, үн менен да бере аласыз. AI сиздин параметрлерди эске алып, Practicuma Travel базасындагы турларды гана сунуштайт жана тандоосун кыска түшүндүрөт.',
    empty: 'Текст жазыңыз же үн менен айтыңыз. Сурамдан кийин мен сайттагы реалдуу турларды көрсөтөм жана браузер колдосо жоопту үн менен окуп берем.',
    browserHint: 'Үн менен киргизүү Chrome жана Edge браузерлеринде жакшыраак иштейт.',
    outputHint: 'Үндү таануу жеткиликтүү, бирок бул браузерде жоопту үн менен окуу иштебей калышы мүмкүн.',
    transcriptTitle: 'Таанылган текст',
    transcriptEmpty: 'Микрофонду басып, сурооңузду айтыңыз да жазууну бүтүрүңүз. Мисалы: «Үй-бүлө менен 3 күндүк тур керек, бюджет 15 000 сом».',
    promptLabel: 'Кандай сапар каалайсыз?',
    promptPlaceholder: 'Мисалы: көлдүн жанында 2-3 күндүк жеңил үй-бүлөлүк тур, бюджет 20 000 сомго чейин',
    budget: 'Бюджет, сом',
    days: 'Күн',
    people: 'Адам',
    difficulty: 'Татаалдыгы',
    category: 'Тур форматы',
    anyCategory: 'Каалаган формат',
    anyDifficulty: 'Каалаган татаалдык',
    startVoice: 'Үн менен айтуу',
    finishVoice: 'Жазууну бүтүрүү',
    cancel: 'Жокко чыгаруу',
    stopVoice: 'Үн чыгарууну токтотуу',
    processingVoice: 'Үн иштетилип жатат...',
    recommend: 'Сунуш алуу',
    recommending: 'Турлар тандалып жатат...',
    source: 'Жооп булагы',
    sourceOllama: 'Локалдык Ollama AI + Practicuma Travel базасы',
    sourceFallback: 'Practicuma Travel базасы боюнча резервдик тандоо',
    openTour: 'Турду ачуу',
    viewAll: 'Бардык турларды көрүү',
    price: 'Баасы',
    states: {
      idle: 'Үн жардамчысы даяр',
      listening: 'Угуп жатам...',
      processing: 'ИИ турларды тандап жатат...',
      speaking: 'Жооп үн менен айтылып жатат...',
      error: 'Үн режими боюнча ката',
      unsupported: 'Браузер үн режимин колдобойт'
    },
    errors: {
      promptRequired: 'AI турларды тандашы үчүн сапарыңызды сүрөттөп бериңиз.',
      generic: 'Сунуштарды алуу мүмкүн болгон жок.',
      network: 'Тармак катасы. Байланышты текшерип, кайра аракет кылыңыз.',
      unsupported: 'Үн менен киргизүү бардык браузерлерде иштебейт. Chrome сунушталат.',
      speechMissing: 'Сүйлөө таанылган жок. Дагы бир жолу аракет кылып, микрофонго жакыныраак сүйлөңүз.',
      micStart: 'Микрофонду иштетүү мүмкүн болгон жок. Баракты жаңыртып, кайра аракет кылыңыз.',
      speak: 'Жоопту үн менен окуу мүмкүн болгон жок. Тексттик сунуштар экранда көрсөтүлдү.'
    },
    voiceErrors: {
      notAllowed: 'Үн режимин колдонуу үчүн браузерде микрофонго уруксат бериңиз.',
      audioCapture: 'Микрофон табылган жок. Түзмөктү текшерип, кайра аракет кылыңыз.',
      network: 'Сүйлөөнү таанууда тармак катасы болду.',
      noSpeech: 'Сүйлөө таанылган жок. Бир аз катуураак жана жакыныраак сүйлөңүз.',
      default: 'Үн суроосун таануу мүмкүн болгон жок. Дагы аракет кылыңыз.'
    },
    prompts: [
      'Балдар менен 3 күнгө тоого баргым келет, бюджет 15000 сом',
      'Бишкекке жакын жеңил дем алыш туру керек',
      'Кыргызстан боюнча 5-7 күндүк маданий сапар издеп жатам',
      'Олуттуу треккинг жана кооз тоо локациясы керек'
    ],
    voiceReplyFirst: 'Биринчи вариант',
    voiceReplySecond: 'Экинчи вариант'
  },
  en: {
    badge: 'AI route assistant',
    title: 'AI matching for real tours on the site',
    description:
      'You can type or speak. The AI considers your preferences, selects tours only from the Practicuma Travel catalog, and explains the match briefly.',
    empty: 'Type or speak your request. I will suggest real tours from the site and, if your browser supports speech output, read the answer aloud.',
    browserHint: 'Voice input works best in Chrome and Edge.',
    outputHint: 'Speech recognition is available, but voice playback may not work in this browser.',
    transcriptTitle: 'Recognized text',
    transcriptEmpty: 'Press the microphone, say your request, and finish the recording. Example: “I want a family mountain trip for 3 days under 15,000 som.”',
    promptLabel: 'What are you looking for?',
    promptPlaceholder: 'For example: I want an easy 2-3 day family tour by a lake, budget up to 20,000 som',
    budget: 'Budget, som',
    days: 'Days',
    people: 'People',
    difficulty: 'Difficulty',
    category: 'Tour format',
    anyCategory: 'Any format',
    anyDifficulty: 'Any difficulty',
    startVoice: 'Speak your request',
    finishVoice: 'Finish recording',
    cancel: 'Cancel',
    stopVoice: 'Stop voice playback',
    processingVoice: 'Processing voice...',
    recommend: 'Get recommendations',
    recommending: 'Matching tours...',
    source: 'Response source',
    sourceOllama: 'Local Ollama AI + Practicuma Travel database',
    sourceFallback: 'Fallback matching using the Practicuma Travel database',
    openTour: 'Open tour',
    viewAll: 'View all tours',
    price: 'Price',
    states: {
      idle: 'Voice assistant is ready',
      listening: 'Listening...',
      processing: 'AI is matching tours...',
      speaking: 'Playing the answer...',
      error: 'Voice mode error',
      unsupported: 'This browser does not support voice mode'
    },
    errors: {
      promptRequired: 'Describe your trip so the AI can match tours.',
      generic: 'Could not get recommendations.',
      network: 'Network error. Check your connection and try again.',
      unsupported: 'Voice input is not supported in every browser. Chrome works best.',
      speechMissing: 'Speech was not recognized. Try again and speak a bit closer to the microphone.',
      micStart: 'Could not start the microphone. Refresh the page and try again.',
      speak: 'The voice response could not be played. The text recommendations are already shown on screen.'
    },
    voiceErrors: {
      notAllowed: 'Allow microphone access in the browser to use voice mode.',
      audioCapture: 'No microphone was found. Check the device and try again.',
      network: 'A network error occurred during speech recognition.',
      noSpeech: 'Speech was not recognized. Try speaking a bit louder and closer to the microphone.',
      default: 'The voice request could not be recognized. Please try again.'
    },
    prompts: [
      'I want a 3-day mountain trip with kids, budget 15000 som',
      'I need an easy weekend tour near Bishkek',
      'I am looking for a cultural trip across Kyrgyzstan for 5-7 days',
      'I want serious trekking and a beautiful mountain location'
    ],
    voiceReplyFirst: 'First option',
    voiceReplySecond: 'Second option'
  }
} as const;

const voiceOnlyPayload = (prompt: string): AIRecommendationRequest => ({
  prompt,
  budget: null,
  days: null,
  people: null,
  difficulty: '',
  category: ''
});

export function AIAssistant() {
  const { locale } = useSitePreferences();
  const content = copy[locale];

  const quickPrompts = content.prompts;
  const categoryOptions: Array<{ value: '' | Tour['category']; label: string }> = useMemo(
    () => [
      { value: '', label: content.anyCategory },
      { value: 'burning', label: tourCategoryLabelsByLocale[locale].burning },
      { value: 'weekend', label: tourCategoryLabelsByLocale[locale].weekend },
      { value: 'kyrgyzstan', label: tourCategoryLabelsByLocale[locale].kyrgyzstan },
      { value: 'trekking', label: tourCategoryLabelsByLocale[locale].trekking },
      { value: 'cultural', label: tourCategoryLabelsByLocale[locale].cultural }
    ],
    [content.anyCategory, locale]
  );
  const difficultyOptions: Array<{ value: '' | Tour['difficulty']; label: string }> = useMemo(
    () => [
      { value: '', label: content.anyDifficulty },
      { value: 'easy', label: difficultyLabelsByLocale[locale].easy },
      { value: 'medium', label: difficultyLabelsByLocale[locale].medium },
      { value: 'hard', label: difficultyLabelsByLocale[locale].hard }
    ],
    [content.anyDifficulty, locale]
  );

  const [form, setForm] = useState<AIRecommendationRequest>({
    prompt: quickPrompts[0],
    budget: 15000,
    days: 3,
    people: 4,
    difficulty: 'easy',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AIRecommendationResponse | null>(null);
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceInputSupported, setVoiceInputSupported] = useState(false);
  const [voiceOutputSupported, setVoiceOutputSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const finalTranscriptRef = useRef('');
  const shouldSubmitVoiceRef = useRef(false);
  const voiceErrorRef = useRef<string | null>(null);

  useEffect(() => {
    setForm((current) => (current.prompt ? current : { ...current, prompt: quickPrompts[0] }));
  }, [quickPrompts]);

  useEffect(() => {
    setVoiceInputSupported(Boolean(getRecognitionConstructor()));
    setVoiceOutputSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);

    return () => {
      shouldSubmitVoiceRef.current = false;
      recognitionRef.current?.abort();
      recognitionRef.current = null;

      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const getVoiceErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'not-allowed':
      case 'service-not-allowed':
        return content.voiceErrors.notAllowed;
      case 'audio-capture':
        return content.voiceErrors.audioCapture;
      case 'network':
        return content.voiceErrors.network;
      case 'no-speech':
        return content.voiceErrors.noSpeech;
      default:
        return content.voiceErrors.default;
    }
  };

  const getVoiceStateMeta = (state: VoiceState) => {
    switch (state) {
      case 'listening':
        return { label: content.states.listening, className: 'bg-emerald-500/15 text-white' };
      case 'processing':
        return { label: content.states.processing, className: 'bg-white/15 text-white' };
      case 'speaking':
        return { label: content.states.speaking, className: 'bg-amber-400/20 text-white' };
      case 'error':
        return { label: content.states.error, className: 'bg-rose-500/20 text-white' };
      case 'unsupported':
        return { label: content.states.unsupported, className: 'bg-slate-950/20 text-white' };
      default:
        return { label: content.states.idle, className: 'bg-white/10 text-white' };
    }
  };

  const buildVoiceReply = (response: AIRecommendationResponse) => {
    const firstRecommendation = response.recommendations[0];
    const secondRecommendation = response.recommendations[1];

    return [
      response.summary,
      firstRecommendation ? `${content.voiceReplyFirst}: ${firstRecommendation.title}. ${firstRecommendation.reason}` : null,
      secondRecommendation ? `${content.voiceReplySecond}: ${secondRecommendation.title}. ${secondRecommendation.reason}` : null
    ]
      .filter(Boolean)
      .join(' ');
  };

  const stopSpeaking = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    setVoiceState((current) => (current === 'speaking' ? 'idle' : current));
  };

  const speakResponse = (response: AIRecommendationResponse) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !voiceOutputSupported) {
      setVoiceState('idle');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(buildVoiceReply(response));
    const language = speechLocaleMap[locale];
    const availableVoice = window.speechSynthesis
      .getVoices()
      .find((voice) => voice.lang.toLowerCase().startsWith(language.slice(0, 2).toLowerCase()));

    utterance.lang = language;
    utterance.rate = 1;
    utterance.pitch = 1;

    if (availableVoice) {
      utterance.voice = availableVoice;
    }

    utterance.onstart = () => setVoiceState('speaking');
    utterance.onend = () => setVoiceState('idle');
    utterance.onerror = () => {
      setVoiceState('error');
      setError(content.errors.speak);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const requestRecommendations = async (payload: AIRecommendationRequest, source: 'manual' | 'voice' = 'manual') => {
    if (!payload.prompt.trim()) {
      setError(content.errors.promptRequired);
      if (source === 'voice') {
        setVoiceState('error');
      }
      return;
    }

    if (source === 'voice') {
      setVoiceState('processing');
    }

    stopSpeaking();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/ai-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as AIRecommendationResponse | ApiErrorResponse;
      const responseError = 'error' in data ? data.error : undefined;

      if (!response.ok || responseError) {
        setResult(null);
        setError(responseError ?? content.errors.generic);
        if (source === 'voice') {
          setVoiceState('error');
        }
        return;
      }

      setResult(data as AIRecommendationResponse);

      if (source === 'voice') {
        speakResponse(data as AIRecommendationResponse);
      } else {
        setVoiceState((current) => (current === 'error' ? 'idle' : current));
      }
    } catch {
      setResult(null);
      setError(content.errors.network);
      if (source === 'voice') {
        setVoiceState('error');
      }
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    const Recognition = getRecognitionConstructor();

    if (!Recognition) {
      setVoiceState('unsupported');
      setError(content.errors.unsupported);
      return;
    }

    stopSpeaking();
    setError('');
    setVoiceTranscript('');
    finalTranscriptRef.current = '';
    voiceErrorRef.current = null;
    shouldSubmitVoiceRef.current = true;

    const recognition = new Recognition();
    recognition.lang = speechLocaleMap[locale];
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => setVoiceState('listening');

    recognition.onresult = (event) => {
      let finalTranscript = finalTranscriptRef.current;
      let interimTranscript = '';

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const transcript = result[0]?.transcript?.trim() ?? '';
        if (!transcript) {
          continue;
        }
        if (result.isFinal) {
          finalTranscript = `${finalTranscript} ${transcript}`.trim();
        } else {
          interimTranscript = `${interimTranscript} ${transcript}`.trim();
        }
      }

      finalTranscriptRef.current = finalTranscript;
      setVoiceTranscript(`${finalTranscript} ${interimTranscript}`.trim());
    };

    recognition.onerror = (event) => {
      shouldSubmitVoiceRef.current = false;
      voiceErrorRef.current = event.error;
      recognitionRef.current = null;
      setVoiceState('error');
      setError(getVoiceErrorMessage(event.error));
    };

    recognition.onend = () => {
      const transcript = finalTranscriptRef.current.trim();
      recognitionRef.current = null;

      if (voiceErrorRef.current) {
        return;
      }

      if (shouldSubmitVoiceRef.current && transcript) {
        shouldSubmitVoiceRef.current = false;
        setVoiceTranscript(transcript);
        const payload = voiceOnlyPayload(transcript);
        setForm(payload);
        void requestRecommendations(payload, 'voice');
        return;
      }

      if (!transcript) {
        setVoiceState('error');
        setError(content.errors.speechMissing);
        return;
      }

      setVoiceState('idle');
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setVoiceState('error');
      setError(content.errors.micStart);
    }
  };

  const finishListening = () => {
    if (!recognitionRef.current) {
      return;
    }
    shouldSubmitVoiceRef.current = true;
    recognitionRef.current.stop();
  };

  const cancelListening = () => {
    shouldSubmitVoiceRef.current = false;
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    finalTranscriptRef.current = '';
    setVoiceTranscript('');
    setVoiceState('idle');
  };

  const voiceStateMeta = getVoiceStateMeta(voiceState);

  return (
    <section className="section-shell" id="ai-assistant">
      <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-[#2D94B8] to-mint px-6 py-12 text-white shadow-2xl sm:px-10">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_500px] xl:items-start">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              {content.badge}
            </span>
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{content.title}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/85">{content.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                  onClick={() => setForm((current) => ({ ...current, prompt }))}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${voiceStateMeta.className}`}>
                  {voiceStateMeta.label}
                </span>
                {!voiceInputSupported ? <span className="text-sm text-white/75">{content.browserHint}</span> : null}
                {voiceInputSupported && !voiceOutputSupported ? <span className="text-sm text-white/75">{content.outputHint}</span> : null}
              </div>

              <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex flex-wrap gap-3">
                  {voiceState === 'listening' ? (
                    <>
                      <Button variant="secondary" size="lg" onClick={finishListening} iconLeft={<Square className="h-4 w-4" />}>
                        {content.finishVoice}
                      </Button>
                      <Button variant="ghost" size="lg" className="bg-white/10 text-white hover:bg-white/15" onClick={cancelListening}>
                        {content.cancel}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={startListening}
                      disabled={loading || voiceState === 'processing' || voiceState === 'speaking'}
                      iconLeft={voiceState === 'processing' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
                    >
                      {voiceState === 'processing' ? content.processingVoice : content.startVoice}
                    </Button>
                  )}

                  {voiceState === 'speaking' ? (
                    <Button
                      variant="ghost"
                      size="lg"
                      className="bg-white/10 text-white hover:bg-white/15"
                      onClick={stopSpeaking}
                      iconLeft={<Volume2 className="h-4 w-4" />}
                    >
                      {content.stopVoice}
                    </Button>
                  ) : null}
                </div>

                <div className="mt-4 rounded-[1.5rem] bg-slate-950/20 px-4 py-4 text-sm leading-6 text-white/85">
                  {voiceTranscript ? (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">{content.transcriptTitle}</p>
                      <p className="mt-2">{voiceTranscript}</p>
                    </>
                  ) : (
                    <p>{content.transcriptEmpty}</p>
                  )}
                </div>
              </div>

              <label className="space-y-2 text-sm font-semibold text-white/90">
                {content.promptLabel}
                <textarea
                  value={form.prompt}
                  onChange={(event) => setForm((current) => ({ ...current, prompt: event.target.value }))}
                  placeholder={content.promptPlaceholder}
                  className="min-h-[120px] w-full rounded-[1.75rem] border border-white/15 bg-white/10 px-5 py-4 text-base text-white placeholder:text-white/55 outline-none backdrop-blur-sm transition focus:border-white/30 focus:ring-4 focus:ring-white/10"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="space-y-2 text-sm font-semibold text-white/90">
                  {content.budget}
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
                  {content.days}
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
                  {content.people}
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
                  {content.difficulty}
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
                  {content.category}
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
                    onClick={() => {
                      void requestRecommendations(form, 'manual');
                    }}
                    disabled={loading || voiceState === 'listening'}
                    iconLeft={loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  >
                    {loading ? content.recommending : content.recommend}
                  </Button>
                </div>
              </div>

              {error ? (
                <div className="flex items-start gap-3 rounded-[1.5rem] bg-rose-500/15 px-4 py-3 text-sm font-medium text-white">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-md">
            {!result ? (
              <div className="space-y-4">
                <div className="ml-auto max-w-[85%] rounded-[1.5rem] rounded-br-md bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-soft">
                  {form.prompt}
                </div>
                <div className="max-w-[92%] rounded-[1.5rem] rounded-bl-md bg-slate-950/20 px-4 py-4 text-sm leading-6 text-white/90">
                  {content.empty}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="rounded-[1.5rem] bg-slate-950/20 px-4 py-4 text-sm leading-6 text-white/90">{result.summary}</div>

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
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{content.price}</p>
                          <p className="mt-1 text-lg font-extrabold text-dark">
                            {formatCurrencyByLocale(item.price, item.currency, locale)}
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-600">{item.reason}</p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-slate-500">{item.shortDescription}</p>
                        <Link href={`/tours/${item.slug}`} className={buttonStyles({ variant: 'primary', size: 'sm' })}>
                          {content.openTour}
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  <span>
                    {content.source}:{' '}
                    {result.source === 'ollama' ? content.sourceOllama : content.sourceFallback}
                  </span>
                  <Link href="/tours" className="font-semibold text-white underline-offset-4 hover:underline">
                    {content.viewAll}
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
