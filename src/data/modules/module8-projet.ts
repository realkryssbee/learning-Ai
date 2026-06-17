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

export const module8: Module = {
  id: 'module-8',
  order: 8,
  title: 'Projet fil rouge',
  description: 'Construire de A à Z une application IA complète en combinant toutes les compétences acquises.',
  icon: 'Rocket',
  color: '#FF6B47',
  lessons: [
    {
      id: 'module-8-lesson-1',
      order: 1,
      title: 'Spécifications et architecture du projet',
      description: 'Définir les specs et l\'architecture d\'une app IA complète.',
      estimatedMinutes: 30,
      ...placeholder('Specs et architecture', 'module-8-lesson-1-ex'),
    },
    {
      id: 'module-8-lesson-2',
      order: 2,
      title: 'Backend : API IA + Supabase',
      description: 'Construire le backend avec des endpoints IA et Supabase comme BDD.',
      estimatedMinutes: 60,
      ...placeholder('Backend IA + Supabase', 'module-8-lesson-2-ex'),
    },
    {
      id: 'module-8-lesson-3',
      order: 3,
      title: 'Frontend : interface React connectée',
      description: 'Développer l\'interface utilisateur avec React et l\'API backend.',
      estimatedMinutes: 60,
      ...placeholder('Frontend React', 'module-8-lesson-3-ex'),
    },
    {
      id: 'module-8-lesson-4',
      order: 4,
      title: 'Déploiement et présentation finale',
      description: 'Déployer l\'app et documenter le projet pour votre portfolio.',
      estimatedMinutes: 45,
      ...placeholder('Déploiement et portfolio', 'module-8-lesson-4-ex'),
    },
  ],
};
