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

export const module6: Module = {
  id: 'module-6',
  order: 6,
  title: 'Git & GitHub',
  description: 'Maîtriser Git pour versionner son code, collaborer via GitHub et intégrer ces outils dans un workflow IA.',
  icon: 'GitBranch',
  color: '#EC4899',
  lessons: [
    {
      id: 'module-6-lesson-1',
      order: 1,
      title: 'Git : les fondamentaux (commit, branch, merge)',
      description: 'Les commandes Git essentielles et la logique du versioning.',
      estimatedMinutes: 25,
      ...placeholder('Git fondamentaux', 'module-6-lesson-1-ex'),
    },
    {
      id: 'module-6-lesson-2',
      order: 2,
      title: 'GitHub : remote, pull requests et code review',
      description: 'Travailler en équipe sur GitHub avec un workflow professionnel.',
      estimatedMinutes: 30,
      ...placeholder('GitHub et pull requests', 'module-6-lesson-2-ex'),
    },
    {
      id: 'module-6-lesson-3',
      order: 3,
      title: 'GitHub Actions : CI/CD basique',
      description: 'Automatiser tests et déploiements avec GitHub Actions.',
      estimatedMinutes: 35,
      ...placeholder('GitHub Actions CI/CD', 'module-6-lesson-3-ex'),
    },
    {
      id: 'module-6-lesson-4',
      order: 4,
      title: 'Git + Claude Code : workflow assisté par IA',
      description: 'Combiner Git et Claude Code pour un développement augmenté.',
      estimatedMinutes: 20,
      ...placeholder('Git + Claude Code workflow', 'module-6-lesson-4-ex'),
    },
  ],
};
