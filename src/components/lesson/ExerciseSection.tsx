import { useState } from 'react';
import { Eye, EyeOff, CheckCircle, Lightbulb, Zap, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Exercise } from '@/types';
import { useProgressStore } from '@/store/useProgressStore';
import { LiveTestPanel } from './LiveTestPanel';
import { EvaluationPanel } from './EvaluationPanel';

interface Props {
  exercise: Exercise;
  moduleId: string;
  lessonId: string;
  quizScore: number;
  onValidate: () => void;
  onBack: () => void;
  onOpenSettings: () => void;
}

type ActivePanel = 'none' | 'live' | 'eval';

export function ExerciseSection({ exercise, moduleId, lessonId, quizScore, onValidate, onBack, onOpenSettings }: Props) {
  const { getLessonProgress, attemptExercise, revealSolution, validateLesson } = useProgressStore();
  const lp = getLessonProgress(moduleId, lessonId);

  const [answer, setAnswer] = useState(lp?.userExerciseAnswer ?? '');
  const [showSolution, setShowSolution] = useState(lp?.exerciseSolutionRevealed ?? false);
  const [showHint, setShowHint] = useState(false);
  const [validated, setValidated] = useState(lp?.validated ?? false);
  const [activePanel, setActivePanel] = useState<ActivePanel>('none');

  const canValidate = quizScore >= 70;

  const handleAttempt = () => {
    if (answer.trim()) attemptExercise(moduleId, lessonId, answer);
  };

  const handleReveal = () => {
    setShowSolution(true);
    revealSolution(moduleId, lessonId);
  };

  const handleValidate = () => {
    validateLesson(moduleId, lessonId);
    setValidated(true);
    onValidate();
  };

  const togglePanel = (panel: ActivePanel) => {
    setActivePanel((p) => (p === panel ? 'none' : panel));
  };

  if (validated) {
    return (
      <div className="animate-fade-in text-center py-12">
        <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-success" />
        </div>
        <h3 className="text-text-primary font-bold text-lg mb-2">Leçon validée !</h3>
        <p className="text-text-secondary text-sm mb-6">
          Score QCM : <span className="font-mono text-accent">{quizScore}%</span> — la leçon suivante est débloquée.
        </p>
        <button
          onClick={onValidate}
          className="bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
        >
          Continuer →
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-5">
      {/* Section header */}
      <div>
        <p className="text-text-muted text-xs font-mono mb-1">Section 3/3 — Exercice pratique</p>
        <h2 className="text-text-primary font-semibold text-lg">{exercise.title}</h2>
      </div>

      {/* Context */}
      {exercise.context && (
        <div className="bg-bg-tertiary border border-bg-border rounded-xl p-4">
          <p className="text-text-muted text-xs font-mono mb-2">Contexte</p>
          <p className="text-text-secondary text-sm leading-relaxed">{exercise.context}</p>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-bg-secondary border border-bg-border rounded-xl p-5">
        <p className="text-text-muted text-xs font-mono mb-3">Instructions</p>
        <div className="text-text-secondary text-sm leading-relaxed space-y-2">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="text-text-secondary text-sm leading-relaxed mb-2">{children}</p>,
              strong: ({ children }) => <strong className="text-text-primary font-semibold">{children}</strong>,
              ul: ({ children }) => <ul className="space-y-1.5 mt-2 mb-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside space-y-1.5 mt-2 mb-2 text-text-secondary text-sm">{children}</ol>,
              li: ({ children }) => (
                <li className="text-text-secondary text-sm flex gap-2">
                  <span className="text-accent flex-shrink-0">›</span>
                  <span>{children}</span>
                </li>
              ),
              code: ({ inline, children, ...props }: { inline?: boolean; children?: React.ReactNode }) =>
                inline ? (
                  <code className="font-mono text-accent bg-accent-muted px-1.5 py-0.5 rounded text-xs" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="block font-mono text-text-primary bg-bg-primary border border-bg-border rounded-lg p-3 text-xs leading-relaxed overflow-x-auto my-2" {...props}>
                    {children}
                  </code>
                ),
              pre: ({ children }) => <div>{children}</div>,
            }}
          >
            {exercise.instructions}
          </ReactMarkdown>
        </div>
      </div>

      {/* Hint */}
      {exercise.hint && (
        <div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 text-text-muted hover:text-warning text-xs font-mono transition-colors"
          >
            <Lightbulb size={13} />
            {showHint ? "Masquer l'indice" : 'Afficher un indice'}
          </button>
          {showHint && (
            <div className="mt-2 border border-yellow-400/20 bg-yellow-400/5 rounded-lg p-3 animate-slide-up">
              <p className="text-warning text-xs leading-relaxed">{exercise.hint}</p>
            </div>
          )}
        </div>
      )}

      {/* Answer area */}
      <div>
        <label className="block text-text-muted text-xs font-mono mb-2">Votre réponse</label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onBlur={handleAttempt}
          rows={8}
          placeholder="Écrivez votre prompt, analyse ou réponse ici…"
          className="w-full bg-bg-primary border border-bg-border focus:border-accent/50 rounded-lg p-4 text-text-primary text-sm font-mono leading-relaxed resize-none outline-none transition-colors placeholder:text-text-muted"
        />
      </div>

      {/* Claude panels toggle buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => togglePanel('live')}
          className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${
            activePanel === 'live'
              ? 'bg-accent/10 border-accent/30 text-accent'
              : 'bg-bg-secondary border-bg-border text-text-secondary hover:border-accent/20 hover:text-accent'
          }`}
        >
          <Zap size={13} />
          Tester avec Claude
        </button>
        <button
          onClick={() => togglePanel('eval')}
          className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${
            activePanel === 'eval'
              ? 'bg-accent/10 border-accent/30 text-accent'
              : 'bg-bg-secondary border-bg-border text-text-secondary hover:border-accent/20 hover:text-accent'
          }`}
        >
          <Sparkles size={13} />
          Évaluation IA
        </button>
      </div>

      {/* Live test panel */}
      {activePanel === 'live' && (
        <div className="animate-slide-up">
          <LiveTestPanel
            defaultPrompt={answer}
            onOpenSettings={onOpenSettings}
          />
        </div>
      )}

      {/* Evaluation panel */}
      {activePanel === 'eval' && (
        <div className="animate-slide-up">
          <EvaluationPanel
            exercise={exercise}
            userAnswer={answer}
            onOpenSettings={onOpenSettings}
          />
        </div>
      )}

      {/* Solution */}
      {!showSolution ? (
        <button
          onClick={handleReveal}
          className="flex items-center gap-2 text-text-muted hover:text-text-secondary text-xs font-mono transition-colors"
        >
          <Eye size={13} />
          Révéler la solution proposée
        </button>
      ) : (
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <EyeOff size={13} className="text-text-muted" />
            <p className="text-text-muted text-xs font-mono">Solution proposée</p>
          </div>
          <div className="bg-bg-primary border border-bg-border rounded-xl p-5">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="text-text-secondary text-sm leading-relaxed mb-2">{children}</p>,
                code: ({ inline, children, ...props }: { inline?: boolean; children?: React.ReactNode }) =>
                  inline ? (
                    <code className="font-mono text-accent bg-accent-muted px-1.5 py-0.5 rounded text-xs" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className="block font-mono text-text-primary bg-bg-secondary border border-bg-border rounded-lg p-4 text-xs leading-relaxed overflow-x-auto mt-2 mb-3" {...props}>
                      {children}
                    </code>
                  ),
                pre: ({ children }) => <div>{children}</div>,
                strong: ({ children }) => <strong className="text-text-primary font-semibold">{children}</strong>,
                ul: ({ children }) => <ul className="space-y-1 mt-1 mb-2">{children}</ul>,
                li: ({ children }) => (
                  <li className="text-text-secondary text-sm flex gap-2">
                    <span className="text-accent flex-shrink-0">›</span>
                    <span>{children}</span>
                  </li>
                ),
                hr: () => <hr className="border-bg-border my-4" />,
              }}
            >
              {exercise.proposedSolution}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Validate */}
      <div className="flex items-center justify-between border-t border-bg-border pt-5">
        <button
          onClick={onBack}
          className="text-text-muted hover:text-text-secondary text-sm transition-colors"
        >
          ← QCM
        </button>
        <div className="flex items-center gap-3">
          {!canValidate && (
            <p className="text-text-muted text-xs font-mono">Score QCM insuffisant ({quizScore}% &lt; 70%)</p>
          )}
          <button
            disabled={!canValidate}
            onClick={handleValidate}
            className={`font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors ${
              canValidate
                ? 'bg-success/80 hover:bg-success text-white cursor-pointer'
                : 'bg-bg-tertiary text-text-muted cursor-not-allowed'
            }`}
          >
            ✓ Valider la leçon
          </button>
        </div>
      </div>
    </div>
  );
}
