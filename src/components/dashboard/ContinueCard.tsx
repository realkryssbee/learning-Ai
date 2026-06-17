import { useNavigate } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { useProgressStore } from '@/store/useProgressStore';
import { ALL_MODULES } from '@/data/modules';

export function ContinueCard() {
  const { getLastActiveLesson, getModuleStatus, getLessonStatus } = useProgressStore();
  const navigate = useNavigate();

  // Find the next lesson to do
  const findNextLesson = () => {
    for (const module of ALL_MODULES) {
      const moduleStatus = getModuleStatus(module.id);
      if (moduleStatus === 'locked') continue;
      for (const lesson of module.lessons) {
        const ls = getLessonStatus(module.id, lesson.id);
        if (ls === 'available') {
          return { module, lesson };
        }
      }
    }
    return null;
  };

  const lastActive = getLastActiveLesson();
  const next = findNextLesson();

  if (!next && !lastActive) {
    return (
      <div className="bg-bg-secondary border border-bg-border rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-text-secondary text-sm">Tout est terminé !</p>
          <p className="text-success font-semibold mt-0.5">🎉 Félicitations, tu as tout complété.</p>
        </div>
      </div>
    );
  }

  const target = next ?? (() => {
    if (!lastActive) return null;
    const module = ALL_MODULES.find((m) => m.id === lastActive.moduleId);
    const lesson = module?.lessons.find((l) => l.id === lastActive.lessonId);
    return module && lesson ? { module, lesson } : null;
  })();

  if (!target) return null;

  return (
    <button
      onClick={() => navigate(`/module/${target.module.id}/lesson/${target.lesson.id}`)}
      className="w-full bg-bg-secondary border border-bg-border hover:border-accent/40 rounded-xl p-5 flex items-center justify-between text-left transition-all group"
    >
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${target.module.color}20` }}
        >
          <PlayCircle size={20} style={{ color: target.module.color }} />
        </div>
        <div>
          <p className="text-text-muted text-xs font-mono mb-1">
            {next ? 'Continuer' : 'Reprendre'} — Module {target.module.order}
          </p>
          <p className="text-text-primary font-semibold text-sm">{target.lesson.title}</p>
          <p className="text-text-secondary text-xs mt-0.5">{target.module.title}</p>
        </div>
      </div>
      <ArrowRight
        size={18}
        className="text-text-muted group-hover:text-accent transition-colors flex-shrink-0"
      />
    </button>
  );
}
