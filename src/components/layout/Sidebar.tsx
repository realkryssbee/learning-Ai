import { NavLink } from 'react-router-dom';
import {
  Brain, Pencil, Terminal, Plug, Bot, GitBranch, Database, Rocket,
  Lock, CheckCircle, Circle, ChevronRight, Settings,
} from 'lucide-react';
import { useProgressStore } from '@/store/useProgressStore';
import { ALL_MODULES } from '@/data/modules';
import { ProgressBar } from '@/components/ui/ProgressBar';

const ICONS: Record<string, React.ElementType> = {
  Brain, Pencil, Terminal, Plug, Bot, GitBranch, Database, Rocket,
};

interface Props {
  onOpenSettings: () => void;
}

export function Sidebar({ onOpenSettings }: Props) {
  const { getModuleProgress, getModuleStatus } = useProgressStore();

  return (
    <aside className="w-64 flex-shrink-0 bg-bg-secondary border-r border-bg-border flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-bg-border">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center flex-shrink-0">
            <span className="font-mono font-bold text-white text-xs">K</span>
          </div>
          <div>
            <p className="font-semibold text-text-primary text-sm leading-none">kryssbee</p>
            <p className="text-text-muted text-xs font-mono mt-0.5">Learning</p>
          </div>
        </NavLink>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3">
        <p className="text-text-muted text-xs font-mono uppercase tracking-widest px-2 mb-3">
          Modules
        </p>
        <ul className="space-y-0.5">
          {ALL_MODULES.map((module) => {
            const status = getModuleStatus(module.id);
            const mp = getModuleProgress(module.id);
            const Icon = ICONS[module.icon] ?? Circle;
            const pct = mp?.completionPercentage ?? 0;

            return (
              <li key={module.id}>
                {status === 'locked' ? (
                  <div className="flex items-center gap-3 px-2 py-2 rounded-lg text-text-muted cursor-not-allowed select-none">
                    <Lock size={14} className="flex-shrink-0" />
                    <span className="text-sm truncate flex-1">{module.title}</span>
                    <span className="font-mono text-xs">{module.order}</span>
                  </div>
                ) : (
                  <NavLink
                    to={`/module/${module.id}`}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors group ${
                        isActive
                          ? 'bg-accent-muted text-accent'
                          : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                      }`
                    }
                  >
                    {status === 'completed' ? (
                      <CheckCircle size={14} className="flex-shrink-0 text-success" />
                    ) : (
                      <Icon size={14} className="flex-shrink-0" style={{ color: module.color }} />
                    )}
                    <span className="truncate flex-1">{module.title}</span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {pct > 0 && (
                        <span className="font-mono text-xs text-text-muted">{pct}%</span>
                      )}
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </NavLink>
                )}
                {status !== 'locked' && pct > 0 && (
                  <div className="px-2 pb-1">
                    <ProgressBar value={pct} color={module.color} size="sm" />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-bg-border flex items-center justify-between">
        <NavLink
          to="/"
          className="text-text-muted hover:text-text-secondary text-xs font-mono transition-colors"
        >
          ← Dashboard
        </NavLink>
        <button
          onClick={onOpenSettings}
          className="p-1.5 text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors"
          title="Paramètres"
        >
          <Settings size={14} />
        </button>
      </div>
    </aside>
  );
}
