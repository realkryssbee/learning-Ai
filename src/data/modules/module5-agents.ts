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

export const module5: Module = {
  id: 'module-5',
  order: 5,
  title: 'Agents IA',
  description: 'Concevoir et déployer des agents IA autonomes : architectures, boucles d\'action, multi-agent et patterns de production.',
  icon: 'Bot',
  color: '#F59E0B',
  lessons: [
    {
      id: 'module-5-lesson-1',
      order: 1,
      title: 'Anatomie d\'un agent IA',
      description: 'Comprendre la boucle perception → raisonnement → action qui définit un agent.',
      estimatedMinutes: 20,
      ...placeholder('Anatomie d\'un agent IA', 'module-5-lesson-1-ex'),
    },
    {
      id: 'module-5-lesson-2',
      order: 2,
      title: 'Tool use et function calling',
      description: 'Donner des outils à un LLM et gérer les appels de fonctions.',
      estimatedMinutes: 30,
      ...placeholder('Tool use et function calling', 'module-5-lesson-2-ex'),
    },
    {
      id: 'module-5-lesson-3',
      order: 3,
      title: 'Architectures multi-agents',
      description: 'Orchestrer plusieurs agents spécialisés pour des tâches complexes.',
      estimatedMinutes: 35,
      ...placeholder('Architectures multi-agents', 'module-5-lesson-3-ex'),
    },
    {
      id: 'module-5-lesson-4',
      order: 4,
      title: 'Guardrails, fiabilité et agents en production',
      description: 'Rendre les agents fiables et sûrs dans des environnements réels.',
      estimatedMinutes: 25,
      ...placeholder('Guardrails et agents en production', 'module-5-lesson-4-ex'),
    },
  ],
};
