import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Lock, Clock, ChevronRight } from 'lucide-react';
import { ALL_MODULES } from '@/data/modules';
import { useProgressStore } from '@/store/useProgressStore';
import { ProgressBar } from '@/components/ui/ProgressBar';

export function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { getModuleProgress, getLessonStatus } = useProgressStore();

  const module = ALL_MODULES.find((m) => m.id === moduleId);
  if (!module) {
    return (
      <div className="p-6 text-center">
        <p className="text-text-secondary">Module introuvable.</p>
        <Link to="/" className="text-accent text-sm mt-2 inline-block">← Dashboard</Link>
      </div>
    );
  }

  const mp = getModuleProgress(module.id);
  const pct = mp?.completionPercentage ?? 0;

  return (
    <div className="p-6 max-w-2xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-text-muted text-xs font-mono mb-6">
        <Link to="/" className="hover:text-text-secondary transition-colors">Dashboard</Link>
        <ChevronRight size={12} />
        <span className="text-text-secondary">{module.title}</span>
      </div>

      {/* Module header */}
      <div className="bg-bg-secondary border border-bg-border rounded-xl p-5 mb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-text-muted text-xs font-mono mb-1">Module {module.order}</p>
            <h1 className="text-text-primary font-bold text-xl">{module.title}</h1>
          </div>
          <span
            className="font-mono text-lg font-bold"
            style={{ color: module.color }}
          >
            {pct}%
          </span>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">{module.description}</p>
        <ProgressBar value={pct} color={module.color} size="md" showLabel={false} />
        <div className="flex gap-4 mt-3 text-text-muted text-xs font-mono">
          <span>{module.lessons.length} leçons</span>
          <span>·</span>
          <span>~{module.lessons.reduce((s, l) => s + l.estimatedMinutes, 0)} min</span>
        </div>
      </div>

      {/* Lessons list */}
      <h2 className="text-text-primary font-semibold text-sm mb-3">Leçons</h2>
      <div className="space-y-2">
        {module.lessons.map((lesson) => {
          const status = getLessonStatus(module.id, lesson.id);
          const isLocked = status === 'locked';
          const isDone = status === 'completed';

          return (
            <button
              key={lesson.id}
              disabled={isLocked}
              onClick={() => !isLocked && navigate(`/module/${module.id}/lesson/${lesson.id}`)}
              className={`w-full text-left bg-bg-secondary border rounded-xl p-4 flex items-center gap-4 transition-all group ${
                isLocked
                  ? 'border-bg-border opacity-50 cursor-not-allowed'
                  : 'border-bg-border hover:border-bg-elevated cursor-pointer'
              }`}
            >
              {/* Status icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: isDone ? '#4ADE8020' : isLocked ? '#1C2028' : `${module.color}20` }}
              >
                {isDone ? (
                  <CheckCircle size={16} className="text-success" />
                ) : isLocked ? (
                  <Lock size={14} className="text-text-muted" />
                ) : (
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: module.color }}
                  >
                    {lesson.order}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${isLocked ? 'text-text-muted' : 'text-text-primary'}`}>
                  {lesson.title}
                </p>
                <p className="text-text-muted text-xs mt-0.5 truncate">{lesson.description}</p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex items-center gap-1 text-text-muted">
                  <Clock size={11} />
                  <span className="text-xs font-mono">{lesson.estimatedMinutes}min</span>
                </div>
                {!isLocked && (
                  <ChevronRight
                    size={14}
                    className="text-text-muted group-hover:text-text-secondary transition-colors"
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
