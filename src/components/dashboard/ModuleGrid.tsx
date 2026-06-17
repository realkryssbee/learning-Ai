import { useNavigate } from 'react-router-dom';
import {
  Brain, Pencil, Terminal, Plug, Bot, GitBranch, Database, Rocket,
  Lock, CheckCircle, ChevronRight,
} from 'lucide-react';
import { useProgressStore } from '@/store/useProgressStore';
import { ALL_MODULES } from '@/data/modules';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { ModuleStatus } from '@/types';

const ICONS: Record<string, React.ElementType> = {
  Brain, Pencil, Terminal, Plug, Bot, GitBranch, Database, Rocket,
};

function StatusPill({ status }: { status: ModuleStatus }) {
  const config = {
    locked: { label: 'Verrouillé', class: 'text-text-muted bg-bg-border' },
    available: { label: 'Disponible', class: 'text-accent bg-accent-muted' },
    'in-progress': { label: 'En cours', class: 'text-warning bg-yellow-400/10' },
    completed: { label: 'Terminé', class: 'text-success bg-green-400/10' },
  }[status];

  return (
    <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${config.class}`}>
      {config.label}
    </span>
  );
}

export function ModuleGrid() {
  const { getModuleProgress, getModuleStatus } = useProgressStore();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {ALL_MODULES.map((module) => {
        const status = getModuleStatus(module.id);
        const mp = getModuleProgress(module.id);
        const pct = mp?.completionPercentage ?? 0;
        const Icon = ICONS[module.icon] ?? Brain;
        const isLocked = status === 'locked';

        return (
          <button
            key={module.id}
            disabled={isLocked}
            onClick={() => !isLocked && navigate(`/module/${module.id}`)}
            className={`text-left bg-bg-secondary border rounded-xl p-4 transition-all group ${
              isLocked
                ? 'border-bg-border cursor-not-allowed opacity-60'
                : 'border-bg-border hover:border-bg-elevated cursor-pointer'
            }`}
            style={!isLocked ? { '--hover-color': module.color } as React.CSSProperties : undefined}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: isLocked ? '#1C2028' : `${module.color}20` }}
                >
                  {isLocked ? (
                    <Lock size={16} className="text-text-muted" />
                  ) : status === 'completed' ? (
                    <CheckCircle size={16} className="text-success" />
                  ) : (
                    <Icon size={16} style={{ color: module.color }} />
                  )}
                </div>
                <div>
                  <p className="text-xs font-mono text-text-muted">Module {module.order}</p>
                  <p className="text-text-primary font-semibold text-sm leading-tight mt-0.5">
                    {module.title}
                  </p>
                </div>
              </div>
              {!isLocked && (
                <ChevronRight
                  size={16}
                  className="text-text-muted group-hover:text-text-secondary transition-colors mt-0.5 flex-shrink-0"
                />
              )}
            </div>

            <p className="text-text-secondary text-xs leading-relaxed mb-3 line-clamp-2">
              {module.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex-1 mr-3">
                <ProgressBar
                  value={pct}
                  color={isLocked ? '#2A2F3A' : module.color}
                  size="sm"
                />
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="font-mono text-xs text-text-muted">{pct}%</span>
                <StatusPill status={status} />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
