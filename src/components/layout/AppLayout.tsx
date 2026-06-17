import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SettingsModal } from '@/components/settings/SettingsModal';
import { useProgressStore } from '@/store/useProgressStore';
import { Presentation, X } from 'lucide-react';

export function AppLayout() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { isDemoMode, setDemoMode } = useProgressStore();

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar onOpenSettings={() => setSettingsOpen(true)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenSettings={() => setSettingsOpen(true)} />
        {isDemoMode && (
          <div className="flex items-center justify-between px-4 py-2 bg-accent/10 border-b border-accent/20 text-accent text-xs font-mono">
            <div className="flex items-center gap-2">
              <Presentation size={13} />
              <span>Mode démo actif — tous les modules sont débloqués</span>
            </div>
            <button
              onClick={() => setDemoMode(false)}
              className="hover:text-white transition-colors"
              title="Désactiver le mode démo"
            >
              <X size={13} />
            </button>
          </div>
        )}
        <main className="flex-1 overflow-y-auto">
          <Outlet context={{ onOpenSettings: () => setSettingsOpen(true) }} />
        </main>
      </div>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
