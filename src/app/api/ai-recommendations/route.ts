import { NextResponse } from 'next/server';

import { buildFallbackAIResponse, rankToursForAI, resolveAIPreferences } from '@/lib/ai';
import { tours } from '@/lib/data';
import type { AIRecommendationRequest, Tour } from '@/lib/types';

const HF_EMBEDDING_MODEL = 'intfloat/multilingual-e5-large';
const HF_EMBEDDING_URL = `https://router.huggingface.co/hf-inference/models/${HF_EMBEDDING_MODEL}`;

const categoryLabels: Record<Tour['category'], string> = {
  burning: 'горящий тур',
  weekend: 'тур выходного дня',
  kyrgyzstan: 'тур по Кыргызстану',
  trekking: 'треккинг',
  cultural: 'культурный тур'
};

const difficultyLabels: Record<Tour['difficulty'], string> = {
  easy: 'легкий',
  medium: 'средний',
  hard: 'сложный'
};

const dotProduct = (left: number[], right: number[]) =>
  left.reduce((sum, value, index) => sum + value * (right[index] ?? 0), 0);

const buildTourEmbeddingText = (tour: Tour) =>
  [
    `passage: ${tour.title}`,
    tour.location,
    categoryLabels[tour.category],
    `${tour.duration}, ${difficultyLabels[tour.difficulty]} уровень`,
    tour.shortDescription,
    tour.tags.join(', '),
    tour.highlights.slice(0, 3).join(', ')
  ]
    .filter(Boolean)
    .join('. ');

const fetchEmbeddings = async (token: string, inputs: string[]) => {
  const response = await fetch(HF_EMBEDDING_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      inputs,
      normalize: true
    }),
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`HF embedding request failed with status ${response.status}`);
  }

  return (await response.json()) as number[][];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AIRecommendationRequest;

    if (!body.prompt?.trim()) {
      return NextResponse.json({ error: 'Опишите, какой формат поездки вы ищете.' }, { status: 400 });
    }

    const preferences = resolveAIPreferences(body);
    const localRanking = rankToursForAI(tours, preferences);
    const fallbackResponse = buildFallbackAIResponse(preferences, localRanking);
    const token = process.env.HF_TOKEN;

    if (!token) {
      return NextResponse.json(fallbackResponse);
    }

    try {
      const queryText = [
        `query: ${preferences.prompt}`,
        preferences.budget ? `бюджет до ${preferences.budget} сом` : null,
        preferences.days ? `${preferences.days} дней` : null,
        preferences.people ? `${preferences.people} человек` : null,
        preferences.category ? categoryLabels[preferences.category] : null,
        preferences.difficulty ? `${difficultyLabels[preferences.difficulty]} уровень` : null
      ]
        .filter(Boolean)
        .join('. ');

      const embeddingInputs = [queryText, ...tours.map(buildTourEmbeddingText)];
      const embeddings = await fetchEmbeddings(token, embeddingInputs);

      if (embeddings.length !== tours.length + 1) {
        return NextResponse.json(fallbackResponse);
      }

      const queryEmbedding = embeddings[0];
      const localScoreMap = new Map(localRanking.map((entry) => [entry.tour.id, entry.score]));

      const semanticRanking = tours
        .map((tour, index) => {
          const semanticSimilarity = dotProduct(queryEmbedding, embeddings[index + 1]);
          const localScore = localScoreMap.get(tour.id) ?? 0;
          const combinedScore = localScore * 0.6 + semanticSimilarity * 55;

          return {
            tour,
            score: combinedScore
          };
        })
        .sort((left, right) => right.score - left.score);

      const aiResponse = buildFallbackAIResponse(preferences, semanticRanking);

      return NextResponse.json({
        ...aiResponse,
        summary:
          'AI сопоставил ваш запрос с описаниями туров через Hugging Face embeddings, затем отранжировал результаты с учетом бюджета, длительности, сложности и состава группы. Ниже только туры из базы Practicuma Travel.',
        source: 'hf'
      });
    } catch (error) {
      console.error('AI embedding ranking failed', error);
      return NextResponse.json(fallbackResponse);
    }
  } catch (error) {
    console.error('AI recommendations failed', error);
    return NextResponse.json({ error: 'Не удалось подготовить AI-подбор. Попробуйте еще раз.' }, { status: 500 });
  }
}
