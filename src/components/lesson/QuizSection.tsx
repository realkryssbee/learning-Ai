import { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import type { QuizQuestion } from '@/types';

interface Props {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface AnswerState {
  selectedIndex: number;
  revealed: boolean;
}

export function QuizSection({ questions, onComplete, onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  if (questions.length === 0) {
    return (
      <div className="animate-fade-in text-center py-12">
        <p className="text-text-secondary">Pas de QCM pour cette leçon.</p>
        <button
          onClick={() => onComplete(100)}
          className="mt-4 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
        >
          Continuer →
        </button>
      </div>
    );
  }

  const current = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isAnswered = currentAnswer?.revealed;
  const isCorrect = isAnswered && currentAnswer.selectedIndex === current.correctIndex;

  const handleSelect = (optionIndex: number) => {
    if (isAnswered) return;
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: { selectedIndex: optionIndex, revealed: true },
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      const correct = questions.filter(
        (_, i) => answers[i]?.selectedIndex === questions[i].correctIndex,
      ).length;
      const finalScore = Math.round((correct / questions.length) * 100);
      setScore(finalScore);
      setCompleted(true);
      onComplete(finalScore);
    }
  };

  if (completed) {
    const passed = score >= 70;
    return (
      <div className="animate-fade-in">
        <div className={`border rounded-xl p-8 text-center mb-6 ${
          passed ? 'bg-green-400/5 border-green-400/20' : 'bg-red-400/5 border-red-400/20'
        }`}>
          <p className="font-mono text-4xl font-bold mb-2" style={{ color: passed ? '#4ADE80' : '#F87171' }}>
            {score}%
          </p>
          <p className="text-text-primary font-semibold mb-1">
            {passed ? '✓ QCM validé !' : '✗ Score insuffisant'}
          </p>
          <p className="text-text-secondary text-sm">
            {passed
              ? 'Tu peux maintenant faire l\'exercice pratique.'
              : 'Il faut au moins 70% pour valider. Révise la théorie et réessaie.'}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {questions.map((q, i) => {
            const ans = answers[i];
            const ok = ans?.selectedIndex === q.correctIndex;
            return (
              <div key={q.id} className="bg-bg-secondary border border-bg-border rounded-lg p-3 flex gap-3">
                {ok ? (
                  <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={16} className="text-error flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-text-secondary text-sm">{q.question}</p>
                  {!ok && (
                    <p className="text-text-muted text-xs mt-1">
                      Bonne réponse : {q.options[q.correctIndex]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="text-text-secondary hover:text-text-primary text-sm transition-colors"
          >
            ← Revoir la théorie
          </button>
          {passed && (
            <button
              onClick={() => onComplete(score)}
              className="bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
            >
              Exercice pratique →
            </button>
          )}
          {!passed && (
            <button
              onClick={() => {
                setAnswers({});
                setCurrentIndex(0);
                setCompleted(false);
              }}
              className="bg-bg-tertiary hover:bg-bg-elevated text-text-primary font-semibold text-sm px-6 py-2.5 rounded-lg border border-bg-border transition-colors"
            >
              Réessayer
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-text-muted text-xs font-mono mb-1">Section 2/3 — QCM</p>
          <p className="text-text-primary font-semibold">
            Question {currentIndex + 1} / {questions.length}
          </p>
        </div>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className="w-6 h-1 rounded-full transition-colors"
              style={{
                backgroundColor:
                  i < currentIndex
                    ? answers[i]?.selectedIndex === questions[i].correctIndex
                      ? '#4ADE80'
                      : '#F87171'
                    : i === currentIndex
                    ? '#FF6B47'
                    : '#2A2F3A',
              }}
            />
          ))}
        </div>
      </div>

      <div className="bg-bg-secondary border border-bg-border rounded-xl p-6 mb-4">
        <p className="text-text-primary font-medium text-sm leading-relaxed mb-5">
          {current.question}
        </p>

        <div className="space-y-2.5">
          {current.options.map((option, i) => {
            const selected = currentAnswer?.selectedIndex === i;
            const correct = i === current.correctIndex;
            let cls = 'border-bg-border hover:border-bg-elevated bg-bg-primary cursor-pointer';

            if (isAnswered) {
              if (correct) cls = 'border-success/40 bg-green-400/5 cursor-default';
              else if (selected && !correct) cls = 'border-error/40 bg-red-400/5 cursor-default';
              else cls = 'border-bg-border bg-bg-primary cursor-default opacity-50';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full text-left border rounded-lg px-4 py-3 flex items-start gap-3 transition-all ${cls}`}
              >
                <span className="font-mono text-xs text-text-muted flex-shrink-0 mt-0.5">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-text-secondary text-sm flex-1">{option}</span>
                {isAnswered && correct && <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" />}
                {isAnswered && selected && !correct && <XCircle size={16} className="text-error flex-shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div className={`border rounded-lg p-4 mb-4 animate-slide-up ${
          isCorrect ? 'border-success/30 bg-green-400/5' : 'border-error/30 bg-red-400/5'
        }`}>
          <p className={`text-xs font-semibold mb-1 ${isCorrect ? 'text-success' : 'text-error'}`}>
            {isCorrect ? '✓ Bonne réponse !' : '✗ Pas tout à fait'}
          </p>
          <p className="text-text-secondary text-sm">{current.explanation}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-text-muted hover:text-text-secondary text-sm transition-colors"
        >
          ← Théorie
        </button>
        {isAnswered && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-2 rounded-lg transition-colors"
          >
            {currentIndex < questions.length - 1 ? 'Suivant' : 'Voir les résultats'}
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
