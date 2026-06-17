import { create } from 'zustand';
import { progressService } from '@/services/progressService';
import { upsertLesson, loadFromSupabase, deleteAllProgress } from '@/services/supabaseProgressService';
import { ALL_MODULES } from '@/data/modules';
import type { UserProgress, ModuleProgress, LessonProgress, ModuleStatus, LessonStatus } from '@/types';

interface ProgressStore {
  userProgress: UserProgress;

  // Read
  getModuleProgress: (moduleId: string) => ModuleProgress | undefined;
  getLessonProgress: (moduleId: string, lessonId: string) => LessonProgress | undefined;
  getModuleStatus: (moduleId: string) => ModuleStatus;
  getLessonStatus: (moduleId: string, lessonId: string) => LessonStatus;
  getLastActiveLesson: () => { moduleId: string; lessonId: string } | null;

  // Write
  submitQuiz: (moduleId: string, lessonId: string, score: number) => void;
  attemptExercise: (moduleId: string, lessonId: string, answer: string) => void;
  revealSolution: (moduleId: string, lessonId: string) => void;
  validateLesson: (moduleId: string, lessonId: string) => void;

  // Admin
  resetProgress: () => void;
  hydrate: (userId: string) => Promise<void>;
}

export const useProgressStore = create<ProgressStore>((set, get) => {
  const initial = progressService.load();

  return {
    userProgress: initial,

    getModuleProgress(moduleId) {
      return get().userProgress.modulesProgress[moduleId];
    },

    getLessonProgress(moduleId, lessonId) {
      return get().userProgress.modulesProgress[moduleId]?.lessonsProgress[lessonId];
    },

    getModuleStatus(moduleId): ModuleStatus {
      const mp = get().userProgress.modulesProgress[moduleId];
      if (!mp) return 'locked';
      if (!mp.unlocked) return 'locked';
      if (mp.completionPercentage === 100) return 'completed';
      const hasStarted = Object.values(mp.lessonsProgress).some(
        (l) => l.quizCompleted || l.exerciseAttempted,
      );
      return hasStarted ? 'in-progress' : 'available';
    },

    getLessonStatus(moduleId, lessonId): LessonStatus {
      const mp = get().userProgress.modulesProgress[moduleId];
      if (!mp || !mp.unlocked) return 'locked';

      const module = ALL_MODULES.find((m) => m.id === moduleId);
      if (!module) return 'locked';

      const lesson = module.lessons.find((l) => l.id === lessonId);
      if (!lesson) return 'locked';

      // First lesson of an unlocked module is always available
      if (lesson.order === 1) {
        const lp = mp.lessonsProgress[lessonId];
        return lp?.validated ? 'completed' : 'available';
      }

      // Subsequent lessons: previous lesson must be validated
      const prevLesson = module.lessons.find((l) => l.order === lesson.order - 1);
      if (!prevLesson) return 'locked';
      const prevProgress = mp.lessonsProgress[prevLesson.id];
      if (!prevProgress?.validated) return 'locked';

      const lp = mp.lessonsProgress[lessonId];
      return lp?.validated ? 'completed' : 'available';
    },

    getLastActiveLesson() {
      const { userProgress } = get();
      let last: { moduleId: string; lessonId: string; completedAt: string } | null = null as { moduleId: string; lessonId: string; completedAt: string } | null;

      Object.entries(userProgress.modulesProgress).forEach(([moduleId, mp]) => {
        Object.entries(mp.lessonsProgress).forEach(([lessonId, lp]) => {
          if (lp.completedAt) {
            if (!last || lp.completedAt > last.completedAt) {
              last = { moduleId, lessonId, completedAt: lp.completedAt };
            }
          }
        });
      });

      return last ? { moduleId: last.moduleId, lessonId: last.lessonId } : null;
    },

    submitQuiz(moduleId, lessonId, score) {
      const updated = progressService.updateLessonProgress(
        get().userProgress,
        moduleId,
        lessonId,
        { quizScore: score, quizCompleted: true },
      );
      progressService.save(updated);
      set({ userProgress: updated });
      upsertLesson(updated.userId, moduleId, lessonId, updated.modulesProgress[moduleId].lessonsProgress[lessonId]);
    },

    attemptExercise(moduleId, lessonId, answer) {
      const updated = progressService.updateLessonProgress(
        get().userProgress,
        moduleId,
        lessonId,
        { exerciseAttempted: true, userExerciseAnswer: answer },
      );
      progressService.save(updated);
      set({ userProgress: updated });
      upsertLesson(updated.userId, moduleId, lessonId, updated.modulesProgress[moduleId].lessonsProgress[lessonId]);
    },

    revealSolution(moduleId, lessonId) {
      const updated = progressService.updateLessonProgress(
        get().userProgress,
        moduleId,
        lessonId,
        { exerciseSolutionRevealed: true },
      );
      progressService.save(updated);
      set({ userProgress: updated });
      upsertLesson(updated.userId, moduleId, lessonId, updated.modulesProgress[moduleId].lessonsProgress[lessonId]);
    },

    validateLesson(moduleId, lessonId) {
      const lp = get().getLessonProgress(moduleId, lessonId);
      if (!lp || !lp.quizCompleted || lp.quizScore < 70) return;

      const updated = progressService.updateLessonProgress(
        get().userProgress,
        moduleId,
        lessonId,
        { validated: true, completedAt: new Date().toISOString() },
      );
      progressService.save(updated);
      set({ userProgress: updated });
      upsertLesson(updated.userId, moduleId, lessonId, updated.modulesProgress[moduleId].lessonsProgress[lessonId]);
    },

    resetProgress() {
      const fresh = progressService.reset();
      deleteAllProgress(get().userProgress.userId);
      set({ userProgress: fresh });
    },

    async hydrate(userId) {
      const hydrated = await loadFromSupabase(userId, get().userProgress);
      if (!hydrated) return;
      progressService.save(hydrated);
      set({ userProgress: hydrated });
    },
  };
});
