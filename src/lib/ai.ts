import type {
  AIRecommendation,
  AIRecommendationRequest,
  AIRecommendationResponse,
  ResolvedAIPreferences,
  Tour
} from '@/lib/types';

const categoryLabels: Record<Tour['category'], string> = {
  burning: 'горящие туры',
  weekend: 'туры выходного дня',
  kyrgyzstan: 'многодневные туры по Кыргызстану',
  trekking: 'треккинг',
  cultural: 'культурные поездки'
};

const difficultyLabels: Record<Tour['difficulty'], string> = {
  easy: 'легкий уровень',
  medium: 'средний уровень',
  hard: 'сложный уровень'
};

const stopWords = new Set([
  'и',
  'в',
  'во',
  'на',
  'по',
  'с',
  'со',
  'без',
  'к',
  'ко',
  'для',
  'или',
  'а',
  'но',
  'не',
  'из',
  'от',
  'до',
  'под',
  'над',
  'у',
  'о',
  'об',
  'про',
  'хочу',
  'нужно',
  'ищу',
  'тур',
  'туры',
  'поездка',
  'путешествие',
  'маршрут',
  'сом',
  'бюджет',
  'день',
  'дня',
  'дней'
]);

const keywordGroups = {
  family: ['дет', 'семь', 'family', 'child', 'kids'],
  mountains: ['гор', 'mountain', 'trek', 'трек', 'поход', 'ущель', 'пик'],
  lake: ['иссык', 'озер', 'lake', 'пляж', 'вода'],
  culture: ['культур', 'истор', 'город', 'юрта', 'кочевн', 'шёлк', 'шелк', 'музей'],
  horse: ['лошад', 'кон', 'horse'],
  comfort: ['комфорт', 'спокойн', 'релакс', 'отдых'],
  hot: ['горящ', 'срочно', 'скидк', 'дешев'],
  south: ['ош', 'баткен', 'юг', 'ленин'],
  nature: ['каньон', 'водопад', 'скал', 'природ', 'ущель']
} as const;

const categoryKeywords: Record<Tour['category'], string[]> = {
  burning: ['горящ', 'скидк', 'быстро', 'срочно'],
  weekend: ['выходн', 'коротк', '2 дня', '3 дня', 'одноднев'],
  kyrgyzstan: ['кыргызстан', 'автотур', 'экспедиция', 'регион'],
  trekking: ['трек', 'поход', 'горы', 'пик', 'маршрут'],
  cultural: ['культура', 'история', 'юрта', 'кочевники', 'город']
};

const difficultyKeywords: Record<Tour['difficulty'], string[]> = {
  easy: ['легк', 'спокойн', 'сем', 'дет'],
  medium: ['средн', 'активн'],
  hard: ['сложн', 'опытн', 'экстрим', 'восхожд']
};

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[ё]/g, 'е')
    .replace(/[^a-zа-я0-9\s-]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const extractDurationDays = (tour: Tour) => {
  const durationMatch = tour.duration.match(/(\d+)/);
  if (durationMatch) {
    return Number(durationMatch[1]);
  }

  return tour.itinerary.length || 1;
};

const parseBudget = (prompt: string) => {
  const normalized = prompt.toLowerCase().replace(/,/g, '.');
  const thousandsMatch = normalized.match(/(\d+(?:\.\d+)?)\s*(к|k|тыс)/i);
  if (thousandsMatch) {
    return Math.round(Number(thousandsMatch[1]) * 1000);
  }

  const budgetMatch = normalized.match(/(?:до|бюджет|budget)\s*(\d[\d\s]*)/i);
  if (budgetMatch) {
    return Number(budgetMatch[1].replace(/\s+/g, ''));
  }

  const plainMatch = normalized.match(/\b(\d{4,6})\b/);
  if (plainMatch) {
    return Number(plainMatch[1]);
  }

  return null;
};

const parseDays = (prompt: string) => {
  const normalized = prompt.toLowerCase();
  const match = normalized.match(/(\d+)\s*(дн|дня|дней|day)/i);
  if (match) {
    return Number(match[1]);
  }

  if (normalized.includes('выходн')) {
    return 2;
  }

  if (normalized.includes('одноднев')) {
    return 1;
  }

  return null;
};

const parsePeople = (prompt: string) => {
  const normalized = prompt.toLowerCase();
  const match = normalized.match(/(\d+)\s*(чел|человек|человека|person|people)/i);
  if (match) {
    return Number(match[1]);
  }

  if (normalized.includes('с детьми') || normalized.includes('семь')) {
    return 4;
  }

  return null;
};

const inferCategory = (prompt: string): Tour['category'] | null => {
  const normalized = normalizeText(prompt);

  for (const [category, terms] of Object.entries(categoryKeywords) as Array<[Tour['category'], string[]]>) {
    if (terms.some((term) => normalized.includes(term))) {
      return category;
    }
  }

  return null;
};

const inferDifficulty = (prompt: string): Tour['difficulty'] | null => {
  const normalized = normalizeText(prompt);

  for (const [difficulty, terms] of Object.entries(difficultyKeywords) as Array<[Tour['difficulty'], string[]]>) {
    if (terms.some((term) => normalized.includes(term))) {
      return difficulty;
    }
  }

  return null;
};

const extractKeywords = (prompt: string) =>
  Array.from(
    new Set(
      normalizeText(prompt)
        .split(' ')
        .filter((word) => word.length > 2 && !stopWords.has(word))
    )
  ).slice(0, 12);

export const resolveAIPreferences = (request: AIRecommendationRequest): ResolvedAIPreferences => {
  const prompt = request.prompt.trim();

  return {
    prompt,
    budget: request.budget ?? parseBudget(prompt),
    days: request.days ?? parseDays(prompt),
    people: request.people ?? parsePeople(prompt),
    difficulty: request.difficulty || inferDifficulty(prompt),
    category: request.category || inferCategory(prompt),
    keywords: extractKeywords(prompt)
  };
};

const countKeywordMatches = (haystack: string, keywords: string[]) =>
  keywords.reduce((count, keyword) => count + (haystack.includes(keyword) ? 1 : 0), 0);

const scoreBudget = (price: number, budget: number | null) => {
  if (!budget) {
    return 0;
  }

  if (price <= budget) {
    const savingsRatio = Math.max(0, (budget - price) / Math.max(budget, 1));
    return 30 + savingsRatio * 8;
  }

  const overspendRatio = (price - budget) / budget;
  if (overspendRatio <= 0.15) {
    return -10;
  }

  return -30 - overspendRatio * 20;
};

const scoreDuration = (tourDays: number, requestedDays: number | null) => {
  if (!requestedDays) {
    return 0;
  }

  const delta = Math.abs(tourDays - requestedDays);
  if (delta === 0) {
    return 24;
  }

  if (delta === 1) {
    return 16;
  }

  if (delta === 2) {
    return 8;
  }

  return -delta * 5;
};

const scorePeople = (tour: Tour, people: number | null) => {
  if (!people) {
    return 0;
  }

  if (people >= tour.groupSize.min && people <= tour.groupSize.max) {
    return 12;
  }

  return -28;
};

const scoreCategory = (tour: Tour, category: Tour['category'] | null) => {
  if (!category) {
    return 0;
  }

  return tour.category === category ? 24 : -8;
};

const scoreDifficulty = (tour: Tour, difficulty: Tour['difficulty'] | null) => {
  if (!difficulty) {
    return 0;
  }

  return tour.difficulty === difficulty ? 16 : -6;
};

const scorePromptIntent = (tour: Tour, normalizedPrompt: string, keywords: string[]) => {
  const haystack = normalizeText(
    [
      tour.title,
      tour.location,
      tour.shortDescription,
      tour.description,
      tour.tags.join(' '),
      tour.highlights.join(' ')
    ].join(' ')
  );

  let score = countKeywordMatches(haystack, keywords) * 6;

  if (keywordGroups.family.some((keyword) => normalizedPrompt.includes(keyword))) {
    score += tour.difficulty === 'easy' ? 16 : tour.difficulty === 'medium' ? 6 : -22;
  }

  if (keywordGroups.mountains.some((keyword) => normalizedPrompt.includes(keyword)) && /гор|пик|ущель|трек/.test(haystack)) {
    score += 12;
  }

  if (keywordGroups.lake.some((keyword) => normalizedPrompt.includes(keyword)) && /иссык|озер|пляж|барскоон/.test(haystack)) {
    score += 12;
  }

  if (keywordGroups.culture.some((keyword) => normalizedPrompt.includes(keyword)) && /юрта|кочевн|ош|шелк|истор/.test(haystack)) {
    score += 12;
  }

  if (keywordGroups.horse.some((keyword) => normalizedPrompt.includes(keyword)) && /кон|лошад|сон-куль/.test(haystack)) {
    score += 10;
  }

  if (keywordGroups.hot.some((keyword) => normalizedPrompt.includes(keyword)) && tour.isHot) {
    score += 16;
  }

  if (keywordGroups.south.some((keyword) => normalizedPrompt.includes(keyword)) && /ош|ленин|баткен/.test(haystack)) {
    score += 12;
  }

  if (keywordGroups.nature.some((keyword) => normalizedPrompt.includes(keyword)) && /каньон|водопад|ущель|скал/.test(haystack)) {
    score += 10;
  }

  if (keywordGroups.comfort.some((keyword) => normalizedPrompt.includes(keyword))) {
    score += tour.difficulty === 'easy' ? 10 : 0;
  }

  return score;
};

export const rankToursForAI = (items: Tour[], preferences: ResolvedAIPreferences) => {
  const normalizedPrompt = normalizeText(preferences.prompt);

  return [...items]
    .map((tour) => {
      const durationDays = extractDurationDays(tour);
      const popularityScore = tour.rating * 5 + tour.reviewCount / 40 + Number(tour.isHot) * 4;
      const score =
        popularityScore +
        scoreCategory(tour, preferences.category) +
        scoreDifficulty(tour, preferences.difficulty) +
        scoreBudget(tour.price, preferences.budget) +
        scoreDuration(durationDays, preferences.days) +
        scorePeople(tour, preferences.people) +
        scorePromptIntent(tour, normalizedPrompt, preferences.keywords);

      return { tour, score };
    })
    .sort((left, right) => right.score - left.score);
};

const formatBudgetFragment = (budget: number | null, price: number) => {
  if (!budget) {
    return null;
  }

  if (price <= budget) {
    return `укладывается в бюджет до ${budget.toLocaleString('ru-RU')} сом`;
  }

  return `немного выше бюджета, но дает более насыщенную программу`;
};

const formatDaysFragment = (requestedDays: number | null, duration: string) => {
  if (!requestedDays) {
    return null;
  }

  return `по длительности близок к запросу на ${requestedDays} дн.`;
};

export const buildFallbackReason = (tour: Tour, preferences: ResolvedAIPreferences) => {
  const shortDescription = tour.shortDescription.replace(/[.!?]+$/g, '');
  const lead = `${tour.title} хорошо совпадает с вашим сценарием: ${shortDescription.charAt(0).toLowerCase()}${shortDescription.slice(1)}`;
  const fragments = [
    formatBudgetFragment(preferences.budget, tour.price),
    formatDaysFragment(preferences.days, tour.duration),
    preferences.difficulty ? `по сложности это ${difficultyLabels[tour.difficulty]} уровень` : null,
    preferences.people ? `группа из ${preferences.people} человек вписывается в формат тура` : null,
    `локация ${tour.location} добавляет именно тот формат поездки, который вы описали`
  ].filter(Boolean) as string[];

  return `${lead}. Дополнительно он ${fragments.slice(0, 2).join(', ')}.`;
};

export const buildFallbackAIResponse = (
  preferences: ResolvedAIPreferences,
  rankedTours: Array<{ tour: Tour; score: number }>
): AIRecommendationResponse => {
  const recommendations: AIRecommendation[] = rankedTours.slice(0, 3).map(({ tour, score }) => ({
    tourId: tour.id,
    slug: tour.slug,
    title: tour.title,
    price: tour.price,
    currency: tour.currency,
    duration: tour.duration,
    location: tour.location,
    image: tour.images[0],
    shortDescription: tour.shortDescription,
    reason: buildFallbackReason(tour, preferences),
    score
  }));

  return {
    summary: recommendations.length
      ? `Подобрал туры по вашему запросу: учитывал бюджет, длительность, формат поездки и совпадение по интересам, а выбор ограничил только турами, которые уже есть на Practicuma Travel.`
      : `Пока не нашел точного совпадения по запросу, поэтому показываю самые близкие туры из текущей базы Practicuma Travel.`,
    recommendations,
    preferences,
    source: 'fallback'
  };
};
