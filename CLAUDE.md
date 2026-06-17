# kryssbee Learning — Documentation projet

Plateforme d'apprentissage de l'IA type Udemy, construite avec Vite + React + TypeScript + Tailwind + Zustand.

## Architecture

```
src/
├── types/index.ts              ← Tous les types TypeScript (Module, Lesson, QuizQuestion, Progress...)
├── data/modules/               ← Contenu éducatif, séparé de la logique applicative
│   ├── index.ts                ← Export centralisé ALL_MODULES[]
│   ├── module1-fondamentaux.ts
│   ├── module2-prompt-engineering.ts  ← COMPLET (4 leçons avec theorie, QCM, exercices)
│   └── module3-8*.ts           ← Structure en place, contenu "à venir"
├── services/progressService.ts ← COUCHE D'ABSTRACTION localStorage (à swapper pour Supabase)
├── store/useProgressStore.ts   ← Zustand store, s'appuie sur progressService
├── components/
│   ├── layout/                 ← AppLayout, Sidebar, Header
│   ├── ui/                     ← ProgressBar, Badge (composants génériques)
│   ├── dashboard/              ← CommitGraph, ContinueCard, ModuleGrid
│   └── lesson/                 ← TheorySection, QuizSection, ExerciseSection
└── pages/
    ├── Dashboard.tsx
    ├── ModulePage.tsx
    └── LessonPage.tsx
```

## Conventions de code

- **Imports** : alias `@/` pour `src/` (configuré dans tsconfig + vite.config)
- **Composants** : PascalCase, named exports (pas de default exports)
- **Types** : définis dans `src/types/index.ts`, importés avec `import type`
- **Pas de commentaires** sur le "quoi" — le code se documente lui-même
- **Pas de default exports** — tous les composants sont exportés nommément
- **Tailwind** : couleurs custom dans `tailwind.config.js` (`bg-bg-primary`, `text-accent`, etc.)
- **Lucide** : icônes importées directement depuis `lucide-react`

## Système de progression

### Structure localStorage
```
kryssbee_progress_v1 → UserProgress {
  userId: 'local-user',
  modulesProgress: Record<moduleId, ModuleProgress>,
  globalPercentage: number,
  streak: number,
  badges: string[],
  lastActivityAt?: ISO string
}
```

### Règles métier
- Module 1 débloqué par défaut, les suivants se débloquent quand le précédent atteint ≥ 70%
- Leçon validée quand QCM ≥ 70%
- Leçon N+1 se débloque quand leçon N est validée
- Score = nb de bonnes réponses / nb de questions × 100

### Badges
| ID | Condition |
|----|-----------|
| `first-module` | 1 module à 100% |
| `halfway` | 4 modules à 100% |
| `graduate` | 8 modules à 100% |
| `perfectionist` | 1 module avec score QCM 100% partout |
| `week-streak` | streak ≥ 7 jours |
| `halfway-global` | progression globale ≥ 50% |
| `no-peek` | exercice tenté sans révéler la solution |

## Migration localStorage → Supabase

La couche d'abstraction est dans `src/services/progressService.ts`.

Pour migrer :
1. Remplacer les implémentations de `load()`, `save()`, `updateLessonProgress()` par des appels Supabase
2. Le store Zustand (`useProgressStore.ts`) n'a pas besoin de changer
3. Les composants n'ont pas besoin de changer

Tables Supabase à créer (Module 7, Leçon 4) :
```sql
-- user_progress(user_id, global_percentage, streak, last_activity_at, badges)
-- module_progress(user_id, module_id, completion_percentage, unlocked)
-- lesson_progress(user_id, module_id, lesson_id, quiz_score, quiz_completed,
--                 exercise_attempted, solution_revealed, validated, completed_at,
--                 user_exercise_answer)
```

## Design system

| Token | Valeur |
|-------|--------|
| `bg-bg-primary` | `#0B0D10` |
| `bg-bg-secondary` | `#13161C` |
| `bg-bg-tertiary` | `#1C2028` |
| `bg-bg-border` | `#2A2F3A` |
| `text-text-primary` | `#E8E6E3` |
| `text-text-secondary` | `#9B9892` |
| `text-text-muted` | `#5C5A57` |
| `accent` | `#FF6B47` (corail-orange) |
| `success` | `#4ADE80` |
| `warning` | `#FACC15` |
| `error` | `#F87171` |

Police display : **Inter** | Police mono : **JetBrains Mono** (classe `font-mono`)

## Roadmap modules restants

Pour remplir un module, créer des leçons avec cette structure dans le fichier data correspondant :
```typescript
{
  id: 'module-X-lesson-Y',
  order: Y,
  title: '...',
  description: '...',
  estimatedMinutes: N,
  theory: `# Titre\n\n...contenu markdown complet...`,
  quiz: [/* 4 QuizQuestion */],
  exercise: { id, title, context, instructions, hint, proposedSolution }
}
```

### Statut des modules
- [x] **Module 2 — Prompt Engineering** : 4 leçons complètes
- [ ] Module 1 — Fondamentaux IA & LLM (4 leçons)
- [ ] Module 3 — Claude Code (4 leçons)
- [ ] Module 4 — MCP (4 leçons)
- [ ] Module 5 — Agents IA (4 leçons)
- [ ] Module 6 — Git & GitHub (4 leçons)
- [ ] Module 7 — Supabase (4 leçons, inclut la migration de cette app)
- [ ] Module 8 — Projet fil rouge (4 leçons)

## Commandes

```bash
npm install   # installer les dépendances
npm run dev   # démarrer le serveur de développement (port 5173)
npm run build # build de production
```
