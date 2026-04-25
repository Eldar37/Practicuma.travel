import { NextResponse } from 'next/server';

import { buildFallbackAIResponse, rankToursForAI, resolveAIPreferences } from '@/lib/ai';
import { tours } from '@/lib/data';
import { generateOllamaAIResponse } from '@/lib/ollama';
import type { AIRecommendationRequest } from '@/lib/types';

export const runtime = 'nodejs';

const buildUnavailableSummary = (fallbackSummary: string) =>
  `Локальная модель Ollama сейчас недоступна, поэтому показываю резервный подбор по базе Practicuma Travel. ${fallbackSummary}`;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AIRecommendationRequest;

    if (!body.prompt?.trim()) {
      return NextResponse.json({ error: 'Опишите, какой формат поездки вы ищете.' }, { status: 400 });
    }

    const preferences = resolveAIPreferences(body);
    const localRanking = rankToursForAI(tours, preferences);
    const fallbackResponse = buildFallbackAIResponse(preferences, localRanking);
    const ollamaResponse = await generateOllamaAIResponse(preferences, localRanking);

    if (ollamaResponse) {
      return NextResponse.json(ollamaResponse);
    }

    return NextResponse.json({
      ...fallbackResponse,
      summary: buildUnavailableSummary(fallbackResponse.summary)
    });
  } catch (error) {
    console.error('AI recommendations failed', error);
    return NextResponse.json(
      { error: 'Не удалось подготовить AI-подбор. Попробуйте еще раз.' },
      { status: 500 }
    );
  }
}
