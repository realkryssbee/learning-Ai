import type { UserProgress, ModuleProgress, LessonProgress } from '@/types';
import { ALL_MODULES } from '@/data/modules';

const STORAGE_KEY = 'kryssbee_progress_v1';
const USER_ID = 'local-user';

// ─── Default factories ────────────────────────────────────────────────────────

function createDefaultLessonProgress(moduleId: string, lessonId: string): LessonProgress {
  return {
    lessonId,
    moduleId,
    quizScore: 0,
    quizCompleted: false,
    exerciseAttempted: false,
    exerciseSolutionRevealed: false,
    validated: false,
  };
}

function createDefaultModuleProgress(moduleId: string, unlocked: boolean): ModuleProgress {
  const module = ALL_MODULES.find((m) => m.id === moduleId);
  const lessonsProgress: Record<string, LessonProgress> = {};

  module?.lessons.forEach((lesson) => {
    lessonsProgress[lesson.id] = createDefaultLessonProgress(moduleId, lesson.id);
  });

  return {
    moduleId,
    lessonsProgress,
    completionPercentage: 0,
    unlocked,
  };
}

function createDefaultUserProgress(): UserProgress {
  const modulesProgress: Record<string, ModuleProgress> = {};

  ALL_MODULES.forEach((module, index) => {
    modulesProgress[module.id] = createDefaultModuleProgress(
      module.id,
      index === 0, // only first module unlocked initially
    );
  });

  return {
    userId: USER_ID,
    modulesProgress,
    globalPercentage: 0,
    streak: 0,
    badges: [],
  };
}

// ─── Calculation helpers ──────────────────────────────────────────────────────

function calculateModulePercentage(moduleProgress: ModuleProgress): number {
  const lessons = Object.values(moduleProgress.lessonsProgress);
  if (lessons.length === 0) return 0;
  const validated = lessons.filter((l) => l.validated).length;
  return Math.round((validated / lessons.length) * 100);
}

function calculateGlobalPercentage(progress: UserProgress): number {
  const modules = Object.values(progress.modulesProgress);
  if (modules.length === 0) return 0;
  const total = modules.reduce((sum, m) => sum + m.completionPercentage, 0);
  return Math.round(total / modules.length);
}

// ─── Public API — swap this for Supabase calls to migrate ────────────────────

export const progressService = {
  load(): UserProgress {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createDefaultUserProgress();
      const parsed = JSON.parse(raw) as UserProgress;
      // Ensure any new modules/lessons added since last save are present
      ALL_MODULES.forEach((module, index) => {
        if (!parsed.modulesProgress[module.id]) {
          parsed.modulesProgress[module.id] = createDefaultModuleProgress(
            module.id,
            index === 0,
          );
        }
        module.lessons.forEach((lesson) => {
          if (!parsed.modulesProgress[module.id].lessonsProgress[lesson.id]) {
            parsed.modulesProgress[module.id].lessonsProgress[lesson.id] =
              createDefaultLessonProgress(module.id, lesson.id);
          }
        });
      });
      return parsed;
    } catch {
      return createDefaultUserProgress();
    }
  },

  save(progress: UserProgress): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },

  updateLessonProgress(
    progress: UserProgress,
    moduleId: string,
    lessonId: string,
    patch: Partial<LessonProgress>,
  ): UserProgress {
    const updated = structuredClone(progress);
    const lessonProg = updated.modulesProgress[moduleId]?.lessonsProgress[lessonId];
    if (!lessonProg) return progress;

    Object.assign(lessonProg, patch);

    // Recompute module %
    const moduleProg = updated.modulesProgress[moduleId];
    moduleProg.completionPercentage = calculateModulePercentage(moduleProg);

    // Unlock next module if this one >= 70%
    const currentModule = ALL_MODULES.find((m) => m.id === moduleId);
    if (currentModule) {
      const nextModule = ALL_MODULES.find((m) => m.order === currentModule.order + 1);
      if (nextModule && moduleProg.completionPercentage >= 70) {
        updated.modulesProgress[nextModule.id].unlocked = true;
      }
    }

    // Recompute global %
    updated.globalPercentage = calculateGlobalPercentage(updated);
    updated.lastActivityAt = new Date().toISOString();

    // Streak: count consecutive days with activity
    updated.streak = computeStreak(updated);

    // Check badges
    updated.badges = computeBadges(updated);

    return updated;
  },

  reset(): UserProgress {
    const fresh = createDefaultUserProgress();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  },
};

// ─── Streak & badges ──────────────────────────────────────────────────────────

function computeStreak(progress: UserProgress): number {
  if (!progress.lastActivityAt) return 0;
  const last = new Date(progress.lastActivityAt);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays > 1) return 0;
  return progress.streak + (diffDays === 0 ? 0 : 1);
}

function computeBadges(progress: UserProgress): string[] {
  const badges = new Set(progress.badges);
  const modules = Object.values(progress.modulesProgress);

  const completedModules = modules.filter((m) => m.completionPercentage === 100);
  const perfectModules = modules.filter((m) => {
    const lessons = Object.values(m.lessonsProgress);
    return lessons.length > 0 && lessons.every((l) => l.quizScore === 100);
  });

  if (completedModules.length >= 1) badges.add('first-module');
  if (completedModules.length >= 4) badges.add('halfway');
  if (completedModules.length >= 8) badges.add('graduate');
  if (perfectModules.length >= 1) badges.add('perfectionist');
  if (progress.streak >= 7) badges.add('week-streak');
  if (progress.globalPercentage >= 50) badges.add('halfway-global');

  const allLessons = modules.flatMap((m) => Object.values(m.lessonsProgress));
  if (allLessons.some((l) => l.exerciseSolutionRevealed === false && l.exerciseAttempted))
    badges.add('no-peek');

  return Array.from(badges);
}
