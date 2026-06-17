import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SettingsModal } from '@/components/settings/SettingsModal';

export function AppLayout() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar onOpenSettings={() => setSettingsOpen(true)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenSettings={() => setSettingsOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <Outlet context={{ onOpenSettings: () => setSettingsOpen(true) }} />
        </main>
      </div>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
