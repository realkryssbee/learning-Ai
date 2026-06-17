import { Flame, Settings, LogOut, User } from 'lucide-react';
import { useProgressStore } from '@/store/useProgressStore';
import { useAuthStore } from '@/store/useAuthStore';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface Props {
  title?: string;
  onOpenSettings: () => void;
}

export function Header({ title, onOpenSettings }: Props) {
  const { userProgress } = useProgressStore();
  const { user, signOut } = useAuthStore();
  const { globalPercentage, streak } = userProgress;

  const displayName = user?.user_metadata?.display_name as string | undefined
    ?? user?.email?.split('@')[0]
    ?? 'Apprenant';

  return (
    <header className="h-14 border-b border-bg-border bg-bg-primary flex items-center px-5 gap-4 sticky top-0 z-10">
      {title && (
        <h1 className="text-text-primary font-semibold text-sm flex-1 truncate">{title}</h1>
      )}
      {!title && <div className="flex-1" />}

      <div className="flex items-center gap-4">
        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center gap-1.5 text-text-secondary">
            <Flame size={13} className="text-accent" />
            <span className="font-mono text-xs">{streak}j</span>
          </div>
        )}

        {/* Global progress */}
        <div className="flex items-center gap-2">
          <div className="w-24">
            <ProgressBar value={globalPercentage} size="sm" />
          </div>
          <span className="font-mono text-xs text-text-secondary w-8">{globalPercentage}%</span>
        </div>

        {/* User menu */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-bg-secondary">
            <User size={12} className="text-text-muted" />
            <span className="text-text-secondary text-xs font-mono max-w-[80px] truncate">{displayName}</span>
          </div>
          <button
            onClick={onOpenSettings}
            title="Paramètres"
            className="p-1.5 text-text-muted hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors"
          >
            <Settings size={15} />
          </button>
          <button
            onClick={() => signOut()}
            title="Déconnexion"
            className="p-1.5 text-text-muted hover:text-error hover:bg-bg-secondary rounded-lg transition-colors"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
