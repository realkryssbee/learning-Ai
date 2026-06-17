import { Flame, BookOpen, Trophy } from 'lucide-react';
import { useProgressStore } from '@/store/useProgressStore';
import { CommitGraph } from '@/components/dashboard/CommitGraph';
import { ContinueCard } from '@/components/dashboard/ContinueCard';
import { ModuleGrid } from '@/components/dashboard/ModuleGrid';
import { BadgeGrid } from '@/components/ui/Badge';
import { ALL_MODULES } from '@/data/modules';

export function Dashboard() {
  const { userProgress } = useProgressStore();
  const { globalPercentage, streak, badges } = userProgress;

  const totalLessons = ALL_MODULES.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = Object.values(userProgress.modulesProgress).reduce(
    (s, mp) => s + Object.values(mp.lessonsProgress).filter((l) => l.validated).length,
    0,
  );
  const completedModules = Object.values(userProgress.modulesProgress).filter(
    (mp) => mp.completionPercentage === 100,
  ).length;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-text-primary font-bold text-2xl mb-1">Dashboard</h1>
        <p className="text-text-secondary text-sm">
          Bienvenue sur <span className="text-accent font-semibold">kryssbee Learning</span> — ta plateforme pour maîtriser l'IA.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-bg-secondary border border-bg-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={14} className="text-accent" />
            <p className="text-text-muted text-xs font-mono">Progression</p>
          </div>
          <p className="font-mono text-2xl font-bold text-text-primary">{globalPercentage}%</p>
          <p className="text-text-muted text-xs mt-1">{completedModules} / {ALL_MODULES.length} modules</p>
        </div>
        <div className="bg-bg-secondary border border-bg-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={14} className="text-accent" />
            <p className="text-text-muted text-xs font-mono">Leçons</p>
          </div>
          <p className="font-mono text-2xl font-bold text-text-primary">{completedLessons}</p>
          <p className="text-text-muted text-xs mt-1">sur {totalLessons} au total</p>
        </div>
        <div className="bg-bg-secondary border border-bg-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={14} className="text-accent" />
            <p className="text-text-muted text-xs font-mono">Streak</p>
          </div>
          <p className="font-mono text-2xl font-bold text-text-primary">{streak}</p>
          <p className="text-text-muted text-xs mt-1">jours consécutifs</p>
        </div>
      </div>

      {/* Continue card */}
      <ContinueCard />

      {/* Commit graph */}
      <CommitGraph />

      {/* Module grid */}
      <div>
        <h2 className="text-text-primary font-semibold text-sm mb-3">Tous les modules</h2>
        <ModuleGrid />
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div>
          <h2 className="text-text-primary font-semibold text-sm mb-3">Badges obtenus</h2>
          <BadgeGrid badgeIds={badges} />
        </div>
      )}
    </div>
  );
}
