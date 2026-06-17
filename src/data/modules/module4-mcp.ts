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

export const module4: Module = {
  id: 'module-4',
  order: 4,
  title: 'MCP — Model Context Protocol',
  description: 'Comprendre et implémenter le protocole MCP pour connecter les LLM à des outils et sources de données externes.',
  icon: 'Plug',
  color: '#A78BFA',
  lessons: [
    {
      id: 'module-4-lesson-1',
      order: 1,
      title: 'Qu\'est-ce que MCP et pourquoi ça change tout',
      description: 'Comprendre l\'architecture MCP et pourquoi il est devenu le standard de l\'industrie.',
      estimatedMinutes: 18,
      ...placeholder('Qu\'est-ce que MCP', 'module-4-lesson-1-ex'),
    },
    {
      id: 'module-4-lesson-2',
      order: 2,
      title: 'Installer et configurer des serveurs MCP existants',
      description: 'Utiliser des serveurs MCP open-source pour étendre les capacités de Claude.',
      estimatedMinutes: 25,
      ...placeholder('Installer des serveurs MCP', 'module-4-lesson-2-ex'),
    },
    {
      id: 'module-4-lesson-3',
      order: 3,
      title: 'Créer son propre serveur MCP',
      description: 'Implémenter un serveur MCP custom en TypeScript ou Python.',
      estimatedMinutes: 40,
      ...placeholder('Créer un serveur MCP custom', 'module-4-lesson-3-ex'),
    },
    {
      id: 'module-4-lesson-4',
      order: 4,
      title: 'MCP en production : sécurité et bonnes pratiques',
      description: 'Déployer des serveurs MCP de façon sécurisée dans un contexte professionnel.',
      estimatedMinutes: 20,
      ...placeholder('MCP en production', 'module-4-lesson-4-ex'),
    },
  ],
};
