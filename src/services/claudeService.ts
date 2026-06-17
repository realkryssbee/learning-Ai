import { createAnthropicClient } from '@/lib/anthropic';

export interface StreamChunk {
  type: 'text' | 'done' | 'error';
  content: string;
}

// ─── Live test : stream une réponse Claude ───────────────────────────────────

export async function* streamPrompt(
  userPrompt: string,
  systemPrompt?: string,
  model = 'claude-haiku-4-5-20251001',
): AsyncGenerator<StreamChunk> {
  const client = createAnthropicClient();

  try {
    const stream = await client.messages.stream({
      model,
      max_tokens: 1024,
      system: systemPrompt || undefined,
      messages: [{ role: 'user', content: userPrompt }],
    });

    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        yield { type: 'text', content: chunk.delta.text };
      }
    }

    yield { type: 'done', content: '' };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Erreur inconnue';
    yield { type: 'error', content: msg };
  }
}

// ─── Évaluation IA d'une réponse d'exercice ──────────────────────────────────

export interface EvaluationResult {
  score: number; // 1-10
  strengths: string[];
  improvements: string[];
  verdict: string;
  tip: string;
}

export async function evaluateExercise(
  exerciseTitle: string,
  exerciseInstructions: string,
  proposedSolution: string,
  userAnswer: string,
): Promise<EvaluationResult> {
  const client = createAnthropicClient();

  const systemPrompt = `Tu es un expert en IA et en formation professionnelle. Tu évalues les réponses d'apprenants sur des exercices de prompt engineering et d'IA.

Sois encourageant mais honnête. Tu évalues la compréhension et l'effort, pas la perfection.

Tu DOIS répondre UNIQUEMENT avec un objet JSON valide, sans texte avant ou après, dans ce format exact :
{
  "score": <nombre 1-10>,
  "strengths": ["<point fort 1>", "<point fort 2>"],
  "improvements": ["<amélioration 1>", "<amélioration 2>"],
  "verdict": "<phrase de synthèse en 1-2 phrases>",
  "tip": "<conseil actionnable pour progresser>"
}`;

  const userMessage = `Évalue cette réponse d'exercice.

TITRE DE L'EXERCICE : ${exerciseTitle}

INSTRUCTIONS DE L'EXERCICE :
${exerciseInstructions}

SOLUTION DE RÉFÉRENCE :
${proposedSolution}

RÉPONSE DE L'APPRENANT :
${userAnswer || '(aucune réponse soumise)'}

Évalue la compréhension démontrée, la pertinence par rapport à l'exercice, et la qualité de la réflexion. Un score de 10 n'est pas réservé aux réponses identiques à la solution de référence — une approche différente mais pertinente mérite aussi un bon score.`;

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  });

  const raw = response.content[0].type === 'text' ? response.content[0].text : '{}';

  // Extract JSON even if wrapped in markdown code blocks
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Réponse invalide du modèle');

  return JSON.parse(jsonMatch[0]) as EvaluationResult;
}
