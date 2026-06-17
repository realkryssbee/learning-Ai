import type { Module } from '@/types';

const placeholder = (title: string, id: string) => ({
  theory: `# ${title}\n\nCette leçon sera disponible prochainement.`,
  quiz: [] as never[],
  exercise: {
    id,
    title: 'Exercice à venir',
    context: '',
    instructions: 'Cette leçon sera disponible prochainement.',
    proposedSolution: '',
  },
});

export const module7: Module = {
  id: 'module-7',
  order: 7,
  title: 'Supabase',
  description: 'Construire des backends modernes avec Supabase : PostgreSQL, auth, realtime et storage pour vos apps IA.',
  icon: 'Database',
  color: '#06B6D4',
  lessons: [
    {
      id: 'module-7-lesson-1',
      order: 1,
      title: 'Supabase : la Firebase open-source',
      description: 'Comprendre l\'architecture Supabase et créer son premier projet.',
      estimatedMinutes: 20,
      ...placeholder('Introduction à Supabase', 'module-7-lesson-1-ex'),
    },
    {
      id: 'module-7-lesson-2',
      order: 2,
      title: 'Base de données et Row Level Security',
      description: 'Modéliser des données et sécuriser l\'accès avec RLS.',
      estimatedMinutes: 35,
      ...placeholder('PostgreSQL et RLS', 'module-7-lesson-2-ex'),
    },
    {
      id: 'module-7-lesson-3',
      order: 3,
      title: 'Authentification et gestion des utilisateurs',
      description: 'Implémenter l\'auth (email, OAuth) avec le SDK Supabase.',
      estimatedMinutes: 30,
      ...placeholder('Auth Supabase', 'module-7-lesson-3-ex'),
    },
    {
      id: 'module-7-lesson-4',
      order: 4,
      title: 'Migrer une app localStorage vers Supabase',
      description: 'Remplacer le stockage local par Supabase — cas pratique avec cette plateforme.',
      estimatedMinutes: 40,
      ...placeholder('Migration localStorage → Supabase', 'module-7-lesson-4-ex'),
    },
  ],
};
