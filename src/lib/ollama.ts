import { buildFallbackAIResponse } from '@/lib/ai';
import { tours } from '@/lib/data';
import type { AIRecommendationResponse, ResolvedAIPreferences, Tour } from '@/lib/types';

interface RankedTour {
  tour: Tour;
  score: number;
}

interface OllamaEmbedResponse {
  embeddings?: number[][] | number[];
}

const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').replace(/\/+$/g, '');
const OLLAMA_EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text-v2-moe';

const categoryLabels: Record<Tour['category'], string> = {
  burning: 'горящий тур',
  weekend: 'тур выходного дня',
  kyrgyzstan: 'тур по Кыргызстану',
  trekking: 'треккинг',
  cultural: 'культурный тур'
};

const difficultyLabels: Record<Tour['difficulty'], string> = {
  easy: 'легкий уровень',
  medium: 'средний уровень',
  hard: 'сложный уровень'
};

let cachedTourEmbeddingsPromise: Promise<Map<string, number[]>> | null = null;

const dotProduct = (left: number[], right: number[]) =>
  left.reduce((sum, value, index) => sum + value * (right[index] ?? 0), 0);

const vectorNorm = (vector: number[]) => Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));

const cosineSimilarity = (left: number[], right: number[]) => {
  const leftNorm = vectorNorm(left);
  const rightNorm = vectorNorm(right);

  if (!leftNorm || !rightNorm) {
    return 0;
  }

  return dotProduct(left, right) / (leftNorm * rightNorm);
};

const buildTourEmbeddingText = (tour: Tour) =>
  [
    `search_document: ${tour.title}`,
    tour.location,
    categoryLabels[tour.category],
    `${tour.duration}, ${difficultyLabels[tour.difficulty]}`,
    tour.shortDescription,
    tour.tags.join(', '),
    tour.highlights.slice(0, 3).join(', ')
  ]
    .filter(Boolean)
    .join('. ');

const buildQueryEmbeddingText = (preferences: ResolvedAIPreferences) =>
  [
    `search_query: ${preferences.prompt}`,
    preferences.budget ? `бюджет до ${preferences.budget} сом` : null,
    preferences.days ? `${preferences.days} дней` : null,
    preferences.people ? `${preferences.people} человек` : null,
    preferences.category ? categoryLabels[preferences.category] : null,
    preferences.difficulty ? difficultyLabels[preferences.difficulty] : null,
    preferences.keywords.length ? preferences.keywords.join(', ') : null
  ]
    .filter(Boolean)
    .join('. ');

const requestEmbeddings = async (inputs: string[]) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/embed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: OLLAMA_EMBED_MODEL,
        input: inputs
      }),
      cache: 'no-store',
      signal: controller.signal
    });

    if (!response.ok) {
      const failureText = await response.text();
      throw new Error(`Ollama embed request failed with status ${response.status}: ${failureText}`);
    }

    const data = (await response.json()) as OllamaEmbedResponse;
    const embeddings = data.embeddings;

    if (!Array.isArray(embeddings)) {
      throw new Error('Ollama embed response did not include embeddings array');
    }

    if (!Array.isArray(embeddings[0])) {
      return [embeddings as number[]];
    }

    return embeddings as number[][];
  } finally {
    clearTimeout(timeout);
  }
};

const getTourEmbeddings = async () => {
  if (!cachedTourEmbeddingsPromise) {
    cachedTourEmbeddingsPromise = requestEmbeddings(tours.map(buildTourEmbeddingText))
      .then((embeddings) => {
        if (embeddings.length !== tours.length) {
          throw new Error('Ollama returned an unexpected number of tour embeddings');
        }

        return new Map(tours.map((tour, index) => [tour.id, embeddings[index]]));
      })
      .catch((error) => {
        cachedTourEmbeddingsPromise = null;
        throw error;
      });
  }

  return cachedTourEmbeddingsPromise;
};

const buildOllamaSummary = () =>
  'Локальный AI через Ollama сопоставил ваш запрос с базой Practicuma Travel по смыслу, затем доранжировал туры по бюджету, длительности, сложности и составу группы.';

export const generateOllamaAIResponse = async (
  preferences: ResolvedAIPreferences,
  rankedTours: RankedTour[]
): Promise<AIRecommendationResponse | null> => {
  try {
    const queryEmbeddings = await requestEmbeddings([buildQueryEmbeddingText(preferences)]);
    const queryEmbedding = queryEmbeddings[0];

    if (!queryEmbedding?.length) {
      return null;
    }

    const tourEmbeddings = await getTourEmbeddings();
    const localScoreMap = new Map(rankedTours.map((entry) => [entry.tour.id, entry.score]));

    const semanticRanking = tours
      .map((tour) => {
        const semanticSimilarity = cosineSimilarity(queryEmbedding, tourEmbeddings.get(tour.id) ?? []);
        const localScore = localScoreMap.get(tour.id) ?? 0;

        return {
          tour,
          score: localScore * 0.72 + semanticSimilarity * 58
        };
      })
      .sort((left, right) => right.score - left.score);

    const response = buildFallbackAIResponse(preferences, semanticRanking);

    return {
      ...response,
      summary: buildOllamaSummary(),
      source: 'ollama'
    };
  } catch (error) {
    console.error('Ollama embedding ranking failed', error);
    return null;
  }
};
