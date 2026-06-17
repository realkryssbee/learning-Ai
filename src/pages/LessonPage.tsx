import { useState } from 'react';
import { useParams, useNavigate, Link, useOutletContext } from 'react-router-dom';
import { ChevronRight, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { ALL_MODULES } from '@/data/modules';
import { useProgressStore } from '@/store/useProgressStore';
import { TheorySection } from '@/components/lesson/TheorySection';
import { QuizSection } from '@/components/lesson/QuizSection';
import { ExerciseSection } from '@/components/lesson/ExerciseSection';
import type { LessonSection } from '@/types';

const isPlaceholder = (theory: string) => theory.includes('à venir') || theory.includes('prochainement');

export function LessonPage() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { onOpenSettings } = useOutletContext<{ onOpenSettings: () => void }>();
  const { getLessonProgress, submitQuiz, attemptExercise, validateLesson } = useProgressStore();

  const module = ALL_MODULES.find((m) => m.id === moduleId);
  const lesson = module?.lessons.find((l) => l.id === lessonId);

  const [section, setSection] = useState<LessonSection>('theory');
  const [quizScore, setQuizScore] = useState(getLessonProgress(moduleId!, lessonId!)?.quizScore ?? 0);

  if (!module || !lesson) {
    return (
      <div className="p-6 text-center">
        <p className="text-text-secondary">Leçon introuvable.</p>
        <Link to="/" className="text-accent text-sm mt-2 inline-block">← Dashboard</Link>
      </div>
    );
  }

  const lp = getLessonProgress(module.id, lesson.id);
  const placeholder = isPlaceholder(lesson.theory);

  const handleValidated = () => {
    const currentIndex = module.lessons.findIndex((l) => l.id === lesson.id);
    const nextLesson = module.lessons[currentIndex + 1];
    if (nextLesson) {
      navigate(`/module/${module.id}/lesson/${nextLesson.id}`);
    } else {
      navigate(`/module/${module.id}`);
    }
  };

  const skipPlaceholder = () => {
    submitQuiz(module.id, lesson.id, 100);
    attemptExercise(module.id, lesson.id, '');
    validateLesson(module.id, lesson.id);
    handleValidated();
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    submitQuiz(module.id, lesson.id, score);
    if (score >= 70) {
      setSection('exercise');
    }
  };

  const steps: { key: LessonSection; label: string }[] = [
    { key: 'theory', label: 'Théorie' },
    { key: 'quiz', label: 'QCM' },
    { key: 'exercise', label: 'Exercice' },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-text-muted text-xs font-mono mb-6 flex-wrap">
        <Link to="/" className="hover:text-text-secondary transition-colors">Dashboard</Link>
        <ChevronRight size={12} />
        <Link to={`/module/${module.id}`} className="hover:text-text-secondary transition-colors">
          {module.title}
        </Link>
        <ChevronRight size={12} />
        <span className="text-text-secondary">{lesson.title}</span>
      </div>

      {/* Section stepper — hidden for placeholder lessons */}
      {!placeholder && <div className="flex items-center gap-2 mb-8">
        {steps.map((step, i) => {
          const isActive = section === step.key;
          const isDone =
            (step.key === 'theory' && (section === 'quiz' || section === 'exercise')) ||
            (step.key === 'quiz' && section === 'exercise' && quizScore >= 70) ||
            (step.key === 'exercise' && lp?.validated);

          return (
            <div key={step.key} className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (step.key === 'theory') setSection('theory');
                  if (step.key === 'quiz' && (section === 'exercise' || section === 'quiz')) setSection('quiz');
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-accent text-white'
                    : isDone
                    ? 'bg-success/10 text-success'
                    : 'bg-bg-tertiary text-text-muted'
                }`}
              >
                {isDone ? <CheckCircle size={11} /> : <span>{i + 1}</span>}
                {step.label}
              </button>
              {i < steps.length - 1 && (
                <div className="w-6 h-px bg-bg-border" />
              )}
            </div>
          );
        })}
      </div>}

      {/* Placeholder lesson — skip directly */}
      {placeholder && (
        <div className="bg-bg-secondary border border-bg-border rounded-xl p-8 text-center animate-fade-in">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${module.color}20` }}
          >
            <Clock size={24} style={{ color: module.color }} />
          </div>
          <h2 className="text-text-primary font-bold text-lg mb-2">Contenu en cours de rédaction</h2>
          <p className="text-text-secondary text-sm mb-1 max-w-md mx-auto">
            Cette leçon fait partie du module <span className="text-text-primary font-medium">{module.title}</span> qui sera publié prochainement.
          </p>
          <p className="text-text-muted text-xs font-mono mb-6">
            Tu peux marquer cette leçon comme vue pour continuer ta progression.
          </p>
          <button
            onClick={skipPlaceholder}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
          >
            Marquer comme vue et continuer
            <ArrowRight size={16} />
          </button>
          <div className="mt-6 pt-5 border-t border-bg-border">
            <Link
              to={`/module/${module.id}`}
              className="text-text-muted hover:text-text-secondary text-xs font-mono transition-colors"
            >
              ← Retour au module
            </Link>
          </div>
        </div>
      )}

      {/* Content */}
      {!placeholder && section === 'theory' && (
        <TheorySection lesson={lesson} onNext={() => setSection('quiz')} />
      )}

      {!placeholder && section === 'quiz' && (
        <QuizSection
          questions={lesson.quiz}
          onComplete={handleQuizComplete}
          onBack={() => setSection('theory')}
        />
      )}

      {!placeholder && section === 'exercise' && (
        <ExerciseSection
          exercise={lesson.exercise}
          moduleId={module.id}
          lessonId={lesson.id}
          quizScore={quizScore}
          onValidate={handleValidated}
          onBack={() => setSection('quiz')}
          onOpenSettings={onOpenSettings}
        />
      )}
    </div>
  );
}
