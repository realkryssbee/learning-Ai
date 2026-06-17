import { useState } from 'react';
import { Sparkles, Loader2, CheckCircle, TrendingUp, Lightbulb, AlertCircle } from 'lucide-react';
import { evaluateExercise, type EvaluationResult } from '@/services/claudeService';
import { isApiKeyConfigured } from '@/lib/anthropic';
import type { Exercise } from '@/types';

interface Props {
  exercise: Exercise;
  userAnswer: string;
  onOpenSettings: () => void;
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 8 ? '#4ADE80' : score >= 6 ? '#FACC15' : '#F87171';
  return (
    <div
      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: `${color}20`, border: `2px solid ${color}40` }}
    >
      <span className="font-mono font-bold text-2xl" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

export function EvaluationPanel({ exercise, userAnswer, onOpenSettings }: Props) {
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const configured = isApiKeyConfigured();

  const handleEvaluate = async () => {
    if (!userAnswer.trim()) {
      setError("Écris d'abord une réponse dans la zone de texte avant de l'évaluer.");
      return;
    }
    if (!configured) {
      setError('Clé API Claude requise. Configure-la dans les Paramètres.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const evaluation = await evaluateExercise(
        exercise.title,
        exercise.instructions,
        exercise.proposedSolution,
        userAnswer,
      );
      setResult(evaluation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'évaluation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-bg-border rounded-xl overflow-hidden bg-bg-primary">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-bg-secondary border-b border-bg-border">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-accent" />
          <span className="text-text-primary text-sm font-semibold">Évaluation par Claude</span>
        </div>
        {result && (
          <button
            onClick={() => setResult(null)}
            className="text-xs font-mono text-text-muted hover:text-text-secondary transition-colors"
          >
            Réessayer
          </button>
        )}
      </div>

      {/* No API key */}
      {!configured && (
        <div className="px-4 py-3 bg-yellow-400/5 border-b border-yellow-400/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle size={14} className="text-warning flex-shrink-0" />
            <p className="text-warning text-xs">Clé API Claude requise pour l'évaluation IA.</p>
          </div>
          <button
            onClick={onOpenSettings}
            className="text-xs font-mono text-accent hover:text-accent-hover transition-colors flex-shrink-0"
          >
            Configurer →
          </button>
        </div>
      )}

      <div className="p-4">
        {!result && !loading && (
          <>
            <p className="text-text-secondary text-sm mb-4">
              Claude va analyser ta réponse par rapport aux objectifs de l'exercice et te donner un feedback personnalisé avec un score et des conseils pour progresser.
            </p>
            <button
              onClick={handleEvaluate}
              disabled={loading || !configured}
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
            >
              <Sparkles size={15} />
              Évaluer ma réponse avec Claude
            </button>
          </>
        )}

        {loading && (
          <div className="flex items-center gap-3 py-4">
            <Loader2 size={18} className="text-accent animate-spin flex-shrink-0" />
            <div>
              <p className="text-text-primary text-sm font-medium">Évaluation en cours…</p>
              <p className="text-text-muted text-xs font-mono">Claude analyse ta réponse</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-400/5 border border-red-400/20 rounded-lg">
            <AlertCircle size={14} className="text-error flex-shrink-0 mt-0.5" />
            <p className="text-error text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4 animate-slide-up">
            {/* Score + verdict */}
            <div className="flex items-start gap-4">
              <ScoreBadge score={result.score} />
              <div>
                <p className="text-text-muted text-xs font-mono mb-1">Score /10</p>
                <p className="text-text-primary text-sm leading-relaxed">{result.verdict}</p>
              </div>
            </div>

            {/* Strengths */}
            {result.strengths.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={13} className="text-success" />
                  <p className="text-success text-xs font-semibold uppercase tracking-wider">Points forts</p>
                </div>
                <ul className="space-y-1.5 pl-2">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="text-text-secondary text-sm flex gap-2">
                      <span className="text-success flex-shrink-0">›</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvements */}
            {result.improvements.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={13} className="text-warning" />
                  <p className="text-warning text-xs font-semibold uppercase tracking-wider">À améliorer</p>
                </div>
                <ul className="space-y-1.5 pl-2">
                  {result.improvements.map((s, i) => (
                    <li key={i} className="text-text-secondary text-sm flex gap-2">
                      <span className="text-warning flex-shrink-0">›</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tip */}
            <div className="flex items-start gap-3 p-3 bg-accent-muted border border-accent/20 rounded-lg">
              <Lightbulb size={14} className="text-accent flex-shrink-0 mt-0.5" />
              <p className="text-text-secondary text-sm">{result.tip}</p>
            </div>

            <button
              onClick={handleEvaluate}
              className="text-xs font-mono text-text-muted hover:text-text-secondary transition-colors"
            >
              Réévaluer après modification →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
