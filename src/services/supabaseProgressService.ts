import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ALL_MODULES } from '@/data/modules';
import type { UserProgress, LessonProgress } from '@/types';

function canSync(userId: string) {
  return isSupabaseConfigured && userId && userId !== 'guest';
}

// ─── Upsert une leçon ─────────────────────────────────────────────────────────

export async function upsertLesson(
  userId: string,
  moduleId: string,
  lessonId: string,
  lp: LessonProgress,
): Promise<void> {
  if (!canSync(userId)) return;

  await supabase.from('lesson_progress').upsert(
    {
      user_id: userId,
      module_id: moduleId,
      lesson_id: lessonId,
      quiz_score: lp.quizScore,
      quiz_completed: lp.quizCompleted,
      exercise_attempted: lp.exerciseAttempted,
      solution_revealed: lp.exerciseSolutionRevealed,
      validated: lp.validated,
      user_exercise_answer: lp.userExerciseAnswer ?? null,
      completed_at: lp.completedAt ?? null,
    },
    { onConflict: 'user_id,module_id,lesson_id' },
  );
}

// ─── Charger depuis Supabase et hydrater le UserProgress ─────────────────────

export async function loadFromSupabase(
  userId: string,
  base: UserProgress,
): Promise<UserProgress | null> {
  if (!canSync(userId)) return null;

  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId);

  if (error || !data || data.length === 0) return null;

  const updated = structuredClone(base);
  updated.userId = userId;

  // Injecter les données Supabase dans la structure en mémoire
  data.forEach((row) => {
    const mp = updated.modulesProgress[row.module_id];
    if (!mp) return;
    if (!mp.lessonsProgress[row.lesson_id]) return;

    mp.lessonsProgress[row.lesson_id] = {
      lessonId: row.lesson_id,
      moduleId: row.module_id,
      quizScore: row.quiz_score ?? 0,
      quizCompleted: row.quiz_completed ?? false,
      exerciseAttempted: row.exercise_attempted ?? false,
      exerciseSolutionRevealed: row.solution_revealed ?? false,
      validated: row.validated ?? false,
      userExerciseAnswer: row.user_exercise_answer ?? undefined,
      completedAt: row.completed_at ?? undefined,
    };
  });

  // Recalculer les pourcentages et déblocages
  let globalTotal = 0;
  ALL_MODULES.forEach((module, index) => {
    const mp = updated.modulesProgress[module.id];
    if (!mp) return;

    const lessons = Object.values(mp.lessonsProgress);
    const validated = lessons.filter((l) => l.validated).length;
    mp.completionPercentage =
      lessons.length > 0 ? Math.round((validated / lessons.length) * 100) : 0;

    if (index === 0) {
      mp.unlocked = true;
    } else {
      const prevModule = ALL_MODULES[index - 1];
      const prevMp = updated.modulesProgress[prevModule.id];
      mp.unlocked = (prevMp?.completionPercentage ?? 0) >= 70;
    }

    globalTotal += mp.completionPercentage;
  });

  updated.globalPercentage = Math.round(globalTotal / ALL_MODULES.length);

  return updated;
}

// ─── Supprimer toute la progression (reset) ───────────────────────────────────

export async function deleteAllProgress(userId: string): Promise<void> {
  if (!canSync(userId)) return;
  await supabase.from('lesson_progress').delete().eq('user_id', userId);
}
