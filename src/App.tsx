import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { Dashboard } from '@/pages/Dashboard';
import { ModulePage } from '@/pages/ModulePage';
import { LessonPage } from '@/pages/LessonPage';
import { AuthPage } from '@/pages/AuthPage';
import { useAuthStore } from '@/store/useAuthStore';
import { useProgressStore } from '@/store/useProgressStore';

export function App() {
  const init = useAuthStore((s) => s.init);
  const user = useAuthStore((s) => s.user);
  const hydrate = useProgressStore((s) => s.hydrate);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (user?.id && user.id !== 'guest') {
      hydrate(user.id);
    }
  }, [user?.id, hydrate]);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/module/:moduleId" element={<ModulePage />} />
        <Route path="/module/:moduleId/lesson/:lessonId" element={<LessonPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
