// ─── Content types ──────────────────────────────────────────────────────────

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Exercise {
  id: string;
  title: string;
  context: string;
  instructions: string;
  hint?: string;
  proposedSolution: string;
}

export interface Lesson {
  id: string;
  order: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  theory: string;       // markdown
  quiz: QuizQuestion[];
  exercise: Exercise;
}

export interface Module {
  id: string;
  order: number;
  title: string;
  description: string;
  icon: string;         // lucide icon name
  color: string;        // tailwind color class or hex
  lessons: Lesson[];
}

// ─── Progress types ──────────────────────────────────────────────────────────

export interface LessonProgress {
  lessonId: string;
  moduleId: string;
  quizScore: number;           // 0-100
  quizCompleted: boolean;
  exerciseAttempted: boolean;
  exerciseSolutionRevealed: boolean;
  validated: boolean;          // quizScore >= 70
  completedAt?: string;        // ISO 8601
  userExerciseAnswer?: string;
}

export interface ModuleProgress {
  moduleId: string;
  lessonsProgress: Record<string, LessonProgress>;
  completionPercentage: number;
  unlocked: boolean;
  startedAt?: string;
  completedAt?: string;
}

export interface UserProgress {
  userId: string;
  modulesProgress: Record<string, ModuleProgress>;
  globalPercentage: number;
  streak: number;
  lastActivityAt?: string;
  badges: string[];
}

// ─── UI types ────────────────────────────────────────────────────────────────

export type LessonSection = 'theory' | 'quiz' | 'exercise';

export interface BadgeDefinition {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export type ModuleStatus = 'locked' | 'available' | 'in-progress' | 'completed';
export type LessonStatus = 'locked' | 'available' | 'completed';
