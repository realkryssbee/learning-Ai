import type { Module } from '@/types';

export const module3: Module = {
  id: 'module-3',
  order: 3,
  title: 'Claude Code',
  description: 'Maîtriser Claude Code comme outil de développement : CLI, commandes, hooks, MCP et workflows avancés.',
  icon: 'Terminal',
  color: '#34D399',
  lessons: [
    // ─── Leçon 1 ────────────────────────────────────────────────────────────
    {
      id: 'module-3-lesson-1',
      order: 1,
      title: 'Installation et premiers pas avec Claude Code',
      description: 'Installer Claude Code, comprendre la CLI et ses capacités fondamentales.',
      estimatedMinutes: 20,
      theory: `# Installation et premiers pas avec Claude Code

## Qu'est-ce que Claude Code ?

Claude Code est un **agent de développement en ligne de commande** créé par Anthropic. Contrairement aux assistants IA dans un navigateur, Claude Code s'intègre directement dans ton terminal et ton éditeur. Il peut :

- Lire et modifier des fichiers dans ton projet
- Exécuter des commandes shell (git, npm, tests…)
- Naviguer dans une codebase entière pour comprendre l'architecture
- Créer, refactorer, déboguer du code en contexte réel

**La différence fondamentale avec un chatbot :**
Un chatbot reçoit du texte et répond du texte. Claude Code a des *outils* — il lit vraiment tes fichiers, exécute vraiment tes tests, voit vraiment les erreurs du compilateur.

---

## Installation

**Prérequis :** Node.js 18+ installé sur ta machine.

\`\`\`bash
# Installation globale
npm install -g @anthropic-ai/claude-code

# Vérifier l'installation
claude --version
\`\`\`

**Première connexion :**
\`\`\`bash
claude
\`\`\`

Au premier lancement, Claude Code te demande de te connecter avec ton compte Anthropic (claude.ai). Une fois connecté, tu as accès à Claude Sonnet inclus dans l'abonnement Claude Pro, ou tu peux brancher une clé API pour accéder à des modèles plus puissants.

---

## Lancer Claude Code

**Dans un projet :**
\`\`\`bash
cd mon-projet
claude
\`\`\`

Claude Code lit automatiquement le contexte : arborescence de fichiers, \`package.json\`, \`README\`, et surtout le fichier \`CLAUDE.md\` si présent (on y reviendra en leçon 3).

**En one-shot (sans session interactive) :**
\`\`\`bash
claude -p "Explique l'architecture de ce projet en 5 lignes"
claude -p "Ajoute des tests pour le fichier src/utils.ts"
\`\`\`

Le flag \`-p\` (prompt) exécute une tâche et quitte. Utile pour les scripts et la CI.

---

## Interface et navigation

Une fois dans Claude Code, tu es dans une **session interactive** :

\`\`\`
> Quel est le bug dans src/auth.ts ?
\`\`\`

Claude Code :
1. Lit \`src/auth.ts\`
2. Analyse le code
3. Identifie le problème
4. Propose une correction
5. Applique la correction si tu acceptes

**Commandes slash importantes :**

| Commande | Action |
|---------|--------|
| \`/help\` | Liste toutes les commandes disponibles |
| \`/clear\` | Efface la conversation (garde le contexte fichiers) |
| \`/exit\` | Quitte Claude Code |
| \`/model\` | Change le modèle utilisé |
| \`/cost\` | Affiche le coût de la session en cours |
| \`/compact\` | Compresse l'historique pour libérer du contexte |

---

## Les modes de permission

Claude Code te demande confirmation avant toute **action irréversible** :

- **Lecture de fichiers** → automatique, pas de confirmation
- **Modification de fichiers** → confirmation par défaut
- **Exécution de commandes** → confirmation, sauf whitelist
- **git push, rm -rf** → toujours confirmation explicite

**Mode auto-approve (\`--dangerously-skip-permissions\`) :** Ne jamais utiliser en production ou sur des projets critiques. Réservé aux environnements sandboxés.

---

## Ce que Claude Code voit

Claude Code n'est pas magique — il utilise des **outils** concrets :

| Outil | Ce qu'il fait |
|-------|--------------|
| \`Read\` | Lit un fichier et son contenu |
| \`Edit\` | Remplace une portion exacte d'un fichier |
| \`Write\` | Crée ou réécrit un fichier |
| \`Glob\` | Cherche des fichiers par pattern (\`**/*.ts\`) |
| \`Grep\` | Cherche du texte dans les fichiers (ripgrep) |
| \`Bash\` | Exécute une commande shell |
| \`Agent\` | Lance un sous-agent pour une tâche isolée |

Comprendre ces outils t'aide à formuler de meilleures demandes. Si tu veux que Claude Code trouve une fonction, dis "cherche la fonction \`handleAuth\`" plutôt que "regarde dans le code".`,

      quiz: [
        {
          id: 'm3-l1-q1',
          question: "Quelle est la différence fondamentale entre Claude Code et un chatbot IA classique ?",
          options: [
            "Claude Code est plus intelligent car il utilise un modèle plus puissant",
            "Claude Code a des outils qui lui permettent de lire, modifier et exécuter du code réellement",
            "Claude Code fonctionne hors ligne sans connexion internet",
            "Claude Code ne peut travailler que sur des projets JavaScript",
          ],
          correctIndex: 1,
          explanation: "La différence clé n'est pas l'intelligence du modèle mais les *outils* : Claude Code peut lire tes fichiers (Read), les modifier (Edit), exécuter des commandes (Bash), chercher dans la codebase (Grep/Glob). Un chatbot reçoit du texte et répond du texte. Claude Code agit dans ton environnement réel.",
        },
        {
          id: 'm3-l1-q2',
          question: "Que fait la commande `claude -p \"Ajoute des logs dans auth.ts\"` ?",
          options: [
            "Lance une session interactive en mode développeur",
            "Exécute la tâche en one-shot et quitte sans session interactive",
            "Affiche un aperçu des modifications sans les appliquer",
            "Lance Claude Code en mode silencieux sans output",
          ],
          correctIndex: 1,
          explanation: "Le flag `-p` (prompt) est le mode one-shot : Claude Code exécute la tâche demandée puis quitte. Très utile dans les scripts d'automatisation et les pipelines CI/CD. Sans `-p`, Claude Code ouvre une session interactive continue.",
        },
        {
          id: 'm3-l1-q3',
          question: "Quelle commande slash affiche le coût en tokens de la session en cours ?",
          options: [
            "/tokens",
            "/usage",
            "/cost",
            "/stats",
          ],
          correctIndex: 2,
          explanation: "La commande `/cost` affiche le coût estimé de la session en cours (tokens input/output et leur coût selon le modèle utilisé). Utile pour monitorer l'usage, surtout avec une clé API facturée à la consommation.",
        },
        {
          id: 'm3-l1-q4',
          question: "Pour quelle raison Claude Code lit-il automatiquement le fichier CLAUDE.md au démarrage ?",
          options: [
            "Pour vérifier la licence du projet",
            "Pour charger des instructions persistantes sur le projet, les conventions et le contexte",
            "Pour détecter les vulnérabilités de sécurité du projet",
            "Pour synchroniser la configuration avec les serveurs Anthropic",
          ],
          correctIndex: 1,
          explanation: "CLAUDE.md est le fichier d'instructions persistantes de ton projet. Il contient ce que Claude Code doit savoir à chaque session : architecture, conventions de code, commandes utiles, ce qu'il faut éviter. C'est ton moyen de donner du contexte sans le répéter à chaque conversation.",
        },
      ],

      exercise: {
        id: 'm3-l1-ex',
        title: "Installer Claude Code et explorer son interface",
        context: "Tu vas installer Claude Code et faire tes premières interactions pour comprendre ses capacités fondamentales.",
        instructions: `Si tu as Claude Code installé, utilise-le directement. Sinon, utilise le panel "Tester avec Claude" pour simuler les scénarios suivants :

**Étape 1 — Comprendre les outils disponibles**
Demande à Claude : *"Liste les outils que Claude Code a à disposition et explique brièvement ce que chacun fait."*

**Étape 2 — Simuler une exploration de projet**
Demande : *"Si j'avais un projet React avec TypeScript et que je te disais 'trouve tous les composants qui utilisent useState', quel outil utiliserais-tu et quelle commande exactement ?"*

**Étape 3 — Comprendre les permissions**
Demande : *"Dans Claude Code, quelle est la différence entre lire un fichier et le modifier en termes de permissions ? Pourquoi cette distinction existe-t-elle ?"*

Documente les réponses et note ce qui t'a surpris sur le fonctionnement de Claude Code.`,
        hint: "Claude Code utilise des outils spécifiques : Glob pour trouver des fichiers par pattern (ex: **/*.tsx), Grep pour chercher du texte dans les fichiers, Read pour lire le contenu. La distinction permission lecture/écriture est une mesure de sécurité — lire est inoffensif, modifier peut avoir des conséquences irréversibles.",
        proposedSolution: `**Réponses types attendues :**

**Étape 1 — Les outils de Claude Code :**
- \`Read\` : Lit le contenu d'un fichier
- \`Edit\` : Remplace une portion exacte d'un fichier (exige de lire d'abord)
- \`Write\` : Crée ou réécrit un fichier entier
- \`Glob\` : Trouve des fichiers par pattern glob (**/*.ts, src/components/*.tsx)
- \`Grep\` : Cherche du texte/regex dans les fichiers (basé sur ripgrep)
- \`Bash\` : Exécute une commande shell
- \`Agent\` : Délègue à un sous-agent

**Étape 2 — Pour trouver les composants avec useState :**
Claude Code utiliserait \`Grep\` avec le pattern \`useState\` dans les fichiers \`*.tsx\` ou \`*.ts\`. La commande serait équivalente à \`rg "useState" --glob "*.tsx"\`.

**Étape 3 — Permissions :**
La lecture est non-destructive → automatique. La modification est irréversible (un fichier écrasé peut faire perdre du travail) → confirmation demandée. Cette asymétrie reflète le principe de moindre surprise : Claude Code préfère interrompre plutôt que de détruire accidentellement du travail.`,
      },
    },

    // ─── Leçon 2 ────────────────────────────────────────────────────────────
    {
      id: 'module-3-lesson-2',
      order: 2,
      title: 'Lire, éditer et naviguer dans une codebase',
      description: 'Utiliser Claude Code pour explorer et modifier un projet existant de façon efficace et sécurisée.',
      estimatedMinutes: 25,
      theory: `# Lire, éditer et naviguer dans une codebase

## La stratégie de lecture de Claude Code

Quand tu donnes une tâche à Claude Code dans un projet existant, il ne lit pas tous les fichiers — ce serait trop coûteux. Il suit une stratégie intelligente :

1. **Glob** pour trouver les fichiers pertinents (\`**/*.ts\`, \`src/components/**\`)
2. **Grep** pour localiser le symbole ou le pattern recherché
3. **Read** sur les fichiers identifiés pour comprendre le contexte local
4. **Read** sur les fichiers liés (imports, types) si nécessaire

**Ce que ça implique pour toi :**
Plus ta demande est précise, plus Claude Code est efficace. "Corrige le bug dans handleAuth" → Claude lit \`src/auth.ts\`. "Corrige le bug" → Claude doit explorer pour trouver où est le bug.

---

## Formuler des demandes efficaces

**Mauvais :**
> "Améliore mon code"

Claude Code ne sait pas quoi améliorer. Il va lire des fichiers au hasard et proposer des changements non sollicités.

**Bon :**
> "Dans src/components/UserCard.tsx, le re-render se déclenche trop souvent. Identifie pourquoi et propose une optimisation avec useMemo ou useCallback."

Claude Code sait exactement où regarder et quel type de solution apporter.

**Patterns efficaces :**

| Objectif | Formulation |
|---------|-------------|
| Débogage | "Le test X échoue avec cette erreur [coller l'erreur]. Trouve la cause." |
| Refactoring | "Refactorise \`src/utils/date.ts\` pour éliminer la duplication. Ne change pas l'API publique." |
| Exploration | "Explique comment les données circulent de l'API vers le composant Dashboard." |
| Ajout feature | "Ajoute une pagination au composant \`UserList\`. Utilise le même pattern que \`ProductList\`." |

---

## Le cycle Edit : Lire avant d'écrire

L'outil \`Edit\` de Claude Code fonctionne par **remplacement de chaîne exacte**. Claude Code :
1. Lit le fichier (\`Read\`)
2. Identifie le bloc exact à modifier
3. Propose un \`Edit\` avec l'ancien texte et le nouveau

**Pourquoi c'est important :** Si Claude Code essaie de modifier un fichier qu'il n'a pas lu, l'outil échoue. C'est une protection — impossible de modifier à l'aveugle.

\`\`\`
Exemple de cycle Edit :
─────────────────────────────────────
1. Toi : "Ajoute un loading state dans UserCard"
2. CC : [lit src/components/UserCard.tsx]
3. CC : [voit le code actuel]
4. CC : [propose Edit: remplace "const [data..." par "const [data...\nconst [loading..."]
5. Toi : [accepte ou refuse]
\`\`\`

---

## Gérer les fichiers volumineux

Claude Code a une fenêtre de contexte limitée. Sur un grand projet, il ne peut pas tout lire en même temps.

**Stratégies quand le projet est grand :**

**1. Guider la navigation**
> "Regarde uniquement \`src/services/\` et \`src/store/\`. Ignore \`node_modules\` et \`dist\`."

**2. Utiliser /compact**
La commande \`/compact\` compresse l'historique de conversation pour libérer de l'espace dans le contexte, tout en gardant l'essentiel.

**3. Décomposer en sous-tâches**
Plutôt que "Refactorise toute l'authentification", faire :
- Session 1 : "Analyse l'auth actuelle et documente les problèmes"
- Session 2 : "Refactorise auth.ts"
- Session 3 : "Mets à jour les composants qui utilisent l'auth"

---

## Multi-fichiers et cohérence

Claude Code est particulièrement fort pour les changements qui **traversent plusieurs fichiers** — là où un simple copier-coller dans un éditeur devient laborieux.

**Exemple réel :**
> "Renomme le type \`UserProfile\` en \`Profile\` dans toute la codebase. Mets à jour les imports."

Claude Code va :
1. Grep pour trouver toutes les occurrences
2. Lire chaque fichier concerné
3. Éditer chaque fichier avec le nouveau nom
4. Vérifier les imports

Sans Claude Code, ce refactoring prend 20 minutes. Avec, 30 secondes.

---

## Vérification : toujours relire les diffs

Claude Code affiche ses modifications avant de les appliquer. **Relis toujours** — Claude Code peut :

- Supprimer du code utile qu'il juge "inutilisé"
- Changer le comportement en voulant "améliorer"
- Introduire des dépendances non souhaitées

La règle : **accepter = tu es responsable**. Claude Code est un outil, pas un oracle.`,

      quiz: [
        {
          id: 'm3-l2-q1',
          question: "Pourquoi Claude Code utilise-t-il Grep avant Read lors de l'exploration d'une codebase ?",
          options: [
            "Grep est plus rapide que Read pour afficher du contenu",
            "Pour trouver les fichiers pertinents sans lire tous les fichiers, ce qui serait trop coûteux en tokens",
            "Grep vérifie les permissions avant que Read puisse accéder aux fichiers",
            "C'est une limitation technique — Read ne peut pas chercher dans plusieurs fichiers",
          ],
          correctIndex: 1,
          explanation: "Claude Code a une fenêtre de contexte limitée et chaque lecture coûte des tokens. Grep permet de localiser rapidement les fichiers ou symboles pertinents (ex: toutes les occurrences de 'handleAuth') avant de lire uniquement les fichiers utiles. C'est une stratégie d'efficacité, pas une limitation technique.",
        },
        {
          id: 'm3-l2-q2',
          question: "Pourquoi l'outil Edit de Claude Code nécessite-t-il de lire le fichier avant de le modifier ?",
          options: [
            "Pour des raisons de performance — caching du fichier en mémoire",
            "Edit fonctionne par remplacement de chaîne exacte, il doit connaître le texte exact à remplacer",
            "Pour calculer le diff Git avant d'appliquer les modifications",
            "C'est une règle de sécurité imposée par le système de fichiers",
          ],
          correctIndex: 1,
          explanation: "L'outil Edit remplace une chaîne exacte par une autre. Sans avoir lu le fichier, Claude Code ne connaît pas le texte exact qu'il doit cibler. Si la chaîne qu'il cherche à remplacer n'existe pas exactement (même indentation, même ponctuation), l'Edit échoue. C'est aussi une protection contre les modifications à l'aveugle.",
        },
        {
          id: 'm3-l2-q3',
          question: "Quelle est la meilleure formulation pour demander un refactoring à Claude Code ?",
          options: [
            "'Améliore la qualité du code dans ce projet'",
            "'Refactorise src/utils/date.ts pour éliminer la duplication. Ne change pas l'API publique.'",
            "'Regarde le code et dis-moi ce qui peut être amélioré'",
            "'Refactorise tout le projet en suivant les meilleures pratiques'",
          ],
          correctIndex: 1,
          explanation: "Une bonne demande a 3 composantes : (1) fichier ou scope précis, (2) objectif concret, (3) contraintes explicites. 'Refactorise src/utils/date.ts, élimine la duplication, ne change pas l'API publique' est précis sur les trois dimensions. Les formulations vagues poussent Claude Code à faire des choix arbitraires qui peuvent ne pas correspondre à tes attentes.",
        },
        {
          id: 'm3-l2-q4',
          question: "Tu demandes à Claude Code de renommer un type dans toute la codebase. Que dois-tu impérativement faire avant d'accepter les modifications ?",
          options: [
            "Exécuter les tests pour voir si les modifications compilent",
            "Relire le diff proposé pour vérifier que Claude Code n'a pas supprimé ou changé du code non prévu",
            "Faire un git stash pour sauvegarder l'état actuel",
            "Vérifier le coût de la session avec /cost",
          ],
          correctIndex: 1,
          explanation: "Claude Code peut supprimer du code qu'il juge 'inutilisé', changer un comportement en 'améliorant', ou introduire des dépendances non souhaitées. Relire le diff avant d'accepter est non-négociable — une fois accepté, tu en es responsable. Les tests viennent après, pour valider, pas à la place de la relecture.",
        },
      ],

      exercise: {
        id: 'm3-l2-ex',
        title: "Simuler un workflow d'exploration et de refactoring",
        context: "Tu vas pratiquer les patterns de demandes efficaces à Claude Code via le panel de test live.",
        instructions: `Utilise le panel "Tester avec Claude" pour pratiquer les formulations efficaces :

**Exercice 1 — Transformer une mauvaise demande en bonne**
Prends cette demande vague et reformule-la correctement :
*"Améliore la gestion des erreurs dans mon app React"*

Puis teste ta reformulation avec Claude en lui demandant : *"Si j'avais ce projet [décris un projet fictif], comment aborderais-tu cette tâche ?"*

**Exercice 2 — Décomposer une tâche complexe**
La tâche : *"Migrer toute l'authentification de localStorage vers Supabase dans une app React"*

Demande à Claude de décomposer cette tâche en 4-5 sous-tâches ordonnées que tu pourrais donner à Claude Code une à une. Compare sa décomposition avec ta propre intuition.

**Exercice 3 — Comprendre le cycle Edit**
Demande à Claude : *"Explique-moi pourquoi dans Claude Code, Edit nécessite que le fichier ait été lu d'abord. Donne un exemple concret de ce qui se passe si l'indentation ou un espace diffère."*`,
        hint: "Pour reformuler une demande vague : (1) identifie le fichier ou composant précis, (2) décris le problème observable ou l'objectif mesurable, (3) ajoute les contraintes (ne pas casser l'API existante, utiliser le même pattern que X, etc.).",
        proposedSolution: `**Exercice 1 — Reformulation :**

*Avant (vague) :* "Améliore la gestion des erreurs dans mon app React"

*Après (précis) :* "Dans src/components/UserList.tsx, la fonction fetchUsers() n'a pas de gestion d'erreur. Si l'API retourne une erreur HTTP, l'app crashe silencieusement. Ajoute un état d'erreur local avec un message affiché à l'utilisateur, et un bouton 'Réessayer'. Utilise le même pattern que src/components/ProductList.tsx qui a déjà cette logique."

**Exercice 2 — Décomposition migration Supabase :**
1. Analyser auth.ts actuel — documenter toutes les fonctions et leur contrat d'API
2. Créer le client Supabase et les types correspondants
3. Migrer les fonctions auth une par une en gardant l'API publique identique
4. Mettre à jour les composants qui appellent les fonctions auth
5. Tester chaque chemin (login, logout, session persistante) et supprimer localStorage

**Exercice 3 — Cycle Edit :**
Edit remplace une chaîne de caractères exacte. Si le fichier a \`  const x = 1\` (2 espaces) mais que Claude Code cherche \`    const x = 1\` (4 espaces), le remplacement échoue. Lire le fichier d'abord garantit que la chaîne cible est exactement celle présente dans le fichier — même indentation, mêmes espaces, même ponctuation.`,
      },
    },

    // ─── Leçon 3 ────────────────────────────────────────────────────────────
    {
      id: 'module-3-lesson-3',
      order: 3,
      title: 'CLAUDE.md, mémoire et configuration',
      description: 'Configurer Claude Code avec un CLAUDE.md structuré, la mémoire persistante et les hooks.',
      estimatedMinutes: 22,
      theory: `# CLAUDE.md, mémoire et configuration

## CLAUDE.md : ton contrat avec Claude Code

\`CLAUDE.md\` est le fichier le plus important pour travailler efficacement avec Claude Code. Placé à la racine du projet, il est automatiquement chargé au démarrage de chaque session.

**Ce que tu peux y mettre :**

\`\`\`markdown
# Mon Projet — Instructions Claude Code

## Architecture
- Backend : Express + TypeScript sur le port 3001
- Frontend : React + Vite + Tailwind sur le port 5173
- Base de données : PostgreSQL via Prisma

## Conventions
- Imports avec alias @ pour src/
- Named exports uniquement (pas de default exports)
- Pas de commentaires descriptifs — le code se documente seul

## Commandes utiles
- npm run dev : lance frontend + backend en parallèle
- npm test : tests Jest en mode watch
- npm run migrate : applique les migrations Prisma

## Ce qu'il ne faut PAS faire
- Ne jamais modifier schema.prisma directement — passer par migrations/
- Ne pas installer de packages sans demander confirmation
- Ne pas committer sur main directement
\`\`\`

---

## Les 3 niveaux de CLAUDE.md

Claude Code reconnaît une hiérarchie de fichiers CLAUDE.md :

| Niveau | Fichier | Portée |
|--------|---------|--------|
| Global | \`~/.claude/CLAUDE.md\` | S'applique à TOUS les projets |
| Projet | \`./CLAUDE.md\` | S'applique à ce projet |
| Sous-dossier | \`src/CLAUDE.md\` | Contexte spécifique à ce dossier |

**Cas d'usage du CLAUDE.md global :**
- Ton nom/email pour les commits git
- Tes préférences de style de code générales
- Les outils que tu utilises systématiquement (pnpm vs npm, etc.)

---

## La mémoire persistante

Au-delà de CLAUDE.md, Claude Code a un système de **mémoire** — des notes qu'il peut créer et consulter d'une session à l'autre.

\`\`\`
# Dans Claude Code :
> /memory

# Claude Code affiche ses notes persistantes sur ce projet
\`\`\`

**Ce que Claude Code mémorise (si tu lui demandes) :**
- Les décisions d'architecture qu'on a prises ensemble
- Les bugs récurrents à éviter
- Les patterns spécifiques à ce projet
- Les préférences de revue de code

**Pour ajouter une note mémoire :**
> "Mémorise que dans ce projet, on utilise RTK Query pour tous les appels API, jamais fetch directement."

Claude Code va créer une note dans son système de mémoire, accessible aux prochaines sessions.

---

## Les hooks : automatiser des vérifications

Les **hooks** permettent d'exécuter des commandes shell automatiquement en réponse aux actions de Claude Code.

**Exemple de hook utile — lancer les tests après chaque Edit :**

\`\`\`json
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npm test -- --passWithNoTests"
          }
        ]
      }
    ]
  }
}
\`\`\`

Après chaque modification de fichier par Claude Code, les tests se lancent automatiquement. Si un test échoue, Claude Code le voit et peut corriger.

**Types de hooks disponibles :**

| Hook | Déclencheur |
|------|-------------|
| \`PreToolUse\` | Avant qu'un outil soit exécuté |
| \`PostToolUse\` | Après qu'un outil a été exécuté |
| \`Notification\` | Quand Claude Code envoie une notification |
| \`Stop\` | Quand Claude Code termine une réponse |

---

## Configuration \`.claude/settings.json\`

\`\`\`json
{
  "model": "claude-opus-4-8",
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git status)",
      "Bash(git diff *)"
    ],
    "deny": [
      "Bash(git push *)",
      "Bash(rm -rf *)"
    ]
  }
}
\`\`\`

**\`permissions.allow\`** : commandes autorisées sans confirmation (whitelist)
**\`permissions.deny\`** : commandes toujours bloquées même si Claude Code les demande

---

## Bonnes pratiques CLAUDE.md

**À inclure :**
- Architecture et stack technique (ce que Claude Code ne peut pas deviner)
- Conventions non-standard (si tu n'utilises pas les conventions par défaut)
- Commandes à lancer pour dev/test/build
- Les zones interdites (fichiers à ne jamais modifier)
- Les patterns que tu veux voir reproduits

**À éviter :**
- Ce qui est évident du code (Claude Code peut lire)
- Des règles trop génériques ("écrire du bon code")
- L'historique du projet (c'est pour git log)
- Des informations qui changent souvent (versions de dépendances)`,

      quiz: [
        {
          id: 'm3-l3-q1',
          question: "Quelle est la différence entre ~/.claude/CLAUDE.md et ./CLAUDE.md ?",
          options: [
            "~/.claude/CLAUDE.md est prioritaire et écrase ./CLAUDE.md quand les deux existent",
            "~/.claude/CLAUDE.md s'applique à tous les projets, ./CLAUDE.md s'applique uniquement au projet courant",
            "~/.claude/CLAUDE.md contient la configuration technique, ./CLAUDE.md contient le contenu éducatif",
            "Il n'y a pas de différence — Claude Code lit uniquement le premier trouvé",
          ],
          correctIndex: 1,
          explanation: "La hiérarchie CLAUDE.md a 3 niveaux : global (~/.claude/CLAUDE.md) pour les préférences personnelles qui s'appliquent partout, projet (./CLAUDE.md) pour les conventions de ce projet précis, et sous-dossier (src/CLAUDE.md) pour du contexte très local. Tous les niveaux sont lus et combinés.",
        },
        {
          id: 'm3-l3-q2',
          question: "Un hook PostToolUse sur 'Edit' qui lance `npm test` après chaque modification — quel est le bénéfice principal ?",
          options: [
            "Accélérer l'exécution des tests en les parallelisant",
            "Permettre à Claude Code de voir les erreurs de tests et de les corriger automatiquement dans la même session",
            "Empêcher Claude Code de modifier des fichiers en production",
            "Sauvegarder automatiquement les modifications dans git",
          ],
          correctIndex: 1,
          explanation: "Quand les tests se lancent après chaque Edit, Claude Code voit le résultat dans son contexte. S'il a introduit une régression, il peut la détecter immédiatement et la corriger dans la même session, sans que tu aies à intervenir. C'est une boucle de feedback automatique qui rend Claude Code plus fiable.",
        },
        {
          id: 'm3-l3-q3',
          question: "Quelle information NE devrait PAS être dans un CLAUDE.md ?",
          options: [
            "Les conventions d'import spécifiques au projet (alias, named exports)",
            "Les commandes pour lancer les tests et le serveur de dev",
            "L'historique des décisions d'architecture des 2 dernières années",
            "Les zones du code que Claude Code ne doit pas modifier",
          ],
          correctIndex: 2,
          explanation: "L'historique d'architecture appartient à git log et aux ADR (Architecture Decision Records), pas à CLAUDE.md. CLAUDE.md doit contenir ce qui est vrai *maintenant* et que Claude Code ne peut pas deviner en lisant le code : conventions, commandes, zones interdites. Un historique long encombre le contexte avec des informations obsolètes.",
        },
        {
          id: 'm3-l3-q4',
          question: "Dans settings.json, tu as `\"deny\": [\"Bash(git push *)\"]`. Que se passe-t-il si Claude Code essaie de faire `git push origin main` ?",
          options: [
            "Claude Code contourne la restriction en utilisant un autre outil",
            "La commande est bloquée, même si Claude Code la demande explicitement",
            "Claude Code reçoit un avertissement mais peut quand même exécuter la commande",
            "Le deny s'applique uniquement en mode automatique, pas en mode interactif",
          ],
          correctIndex: 1,
          explanation: "La liste `deny` dans settings.json est une protection absolue — la commande est bloquée systématiquement, quelle que soit la demande de Claude Code ou de l'utilisateur. C'est exactement pour ça qu'elle existe : empêcher des actions destructrices même accidentelles (push forcé, suppression de branche, etc.).",
        },
      ],

      exercise: {
        id: 'm3-l3-ex',
        title: "Écrire un CLAUDE.md pour ce projet kryssbee Learning",
        context: "Tu vas rédiger un CLAUDE.md complet pour le projet kryssbee Learning que tu es en train de construire.",
        instructions: `Rédige un CLAUDE.md complet pour le projet kryssbee Learning en utilisant les informations que tu connais sur cette plateforme.

**Contraintes :**
- Maximum 80 lignes
- Doit inclure : architecture, conventions de code, commandes utiles, zones interdites
- Doit être actionnable (Claude Code doit pouvoir le lire et comprendre sans ambiguïté)
- Pas d'historique — uniquement ce qui est vrai maintenant

**Pour t'aider :** Utilise le panel "Tester avec Claude" avec ce prompt système :
\`\`\`
Tu es Claude Code. Tu lis un CLAUDE.md et tu identifies ce qui est utile, redondant ou manquant. Sois critique et précis.
\`\`\`

Puis soumets ton CLAUDE.md draft pour que Claude l'évalue.

Compare ensuite avec le CLAUDE.md réel de ce projet (visible dans le repository).`,
        hint: "Un bon CLAUDE.md répond à ces questions : Quel est le stack ? Comment lancer le projet ? Quelles sont les conventions non-standard ? Quelles zones du code sont sensibles ? Quel pattern dois-je reproduire si j'ajoute une feature ? Évite tout ce que Claude Code peut déduire lui-même en lisant le code.",
        proposedSolution: `**Exemple de CLAUDE.md pour kryssbee Learning :**

\`\`\`markdown
# kryssbee Learning — Instructions Claude Code

## Stack
- Vite + React 18 + TypeScript
- Tailwind CSS avec design tokens custom (bg-bg-primary, text-accent, etc.)
- Zustand pour l'état global
- React Router v6 avec Outlet context
- localStorage (V1), Supabase en option via .env.local

## Alias d'import
\`@/\` → \`src/\` (configuré dans tsconfig + vite.config)

## Conventions
- Named exports uniquement — pas de default exports
- Types dans src/types/index.ts, importés avec \`import type\`
- Pas de commentaires sur le "quoi" — le code se documente
- Couleurs : utiliser les tokens Tailwind custom, jamais de hex directs
- Icônes : Lucide uniquement, importées depuis lucide-react

## Contenu des modules
- src/data/modules/index.ts : export centralisé ALL_MODULES[]
- Structure d'une leçon : theory (markdown), quiz (4 questions), exercise
- Les backticks dans theory DOIVENT être échappés : \\\`\\\`\\\` (pas \`\`\`)
- Modules 1 et 2 : complets. Modules 3-8 : en cours.

## Commandes
\`\`\`bash
npm run dev    # port 5173 (ou 5174 si occupé)
npx tsc --noEmit  # vérification TypeScript
\`\`\`

## Ne jamais modifier
- src/types/index.ts sans vérifier tous les composants impactés
- tailwind.config.js tokens sans mettre à jour CLAUDE.md

## Pattern à reproduire
Pour ajouter un module : copier la structure de module1-fondamentaux.ts
\`\`\``,
      },
    },

    // ─── Leçon 4 ────────────────────────────────────────────────────────────
    {
      id: 'module-3-lesson-4',
      order: 4,
      title: 'Workflows professionnels avec Claude Code',
      description: 'Intégrer Claude Code dans un workflow TDD, refactoring large-scale et revue de code.',
      estimatedMinutes: 30,
      theory: `# Workflows professionnels avec Claude Code

## Le workflow TDD avec Claude Code

Le **Test-Driven Development** (développement guidé par les tests) se marie particulièrement bien avec Claude Code. Le cycle classique Red/Green/Refactor devient :

\`\`\`
1. Toi     → "Écris les tests pour une fonction validateEmail()"
2. CC      → crée validateEmail.test.ts avec des cas couvrants
3. Tests   → FAIL (normal, la fonction n'existe pas)
4. Toi     → "Maintenant implémente validateEmail() pour passer ces tests"
5. CC      → implémente la fonction
6. Tests   → PASS
7. Toi     → "Refactorise si nécessaire, les tests doivent toujours passer"
\`\`\`

**Avantage :** Claude Code voit les messages d'erreur des tests en temps réel (avec un hook PostToolUse) et peut corriger sa propre implémentation sans que tu aies à copier-coller les erreurs.

**Prompt d'amorce TDD :**
> "Je veux développer en TDD. Commence par écrire des tests exhaustifs pour [fonctionnalité], sans implémenter. Teste les cas normaux, les cas limites (null, undefined, chaîne vide, valeurs max) et les cas d'erreur."

---

## Refactoring large-scale

Pour un refactoring qui touche de nombreux fichiers, une approche en phases évite les désastres :

### Phase 1 : Analyse sans toucher au code
> "Analyse l'usage de \`fetchData()\` dans tout le projet. Liste tous les appels, leurs paramètres, et identifie les inconsistances. Ne modifie rien."

Claude Code produit un rapport. Tu valides avant de continuer.

### Phase 2 : Migrer fichier par fichier
> "Migre src/services/userService.ts vers la nouvelle API. Vérifie que les tests passent avant de continuer au fichier suivant."

Plutôt que "migre tout", fichier par fichier permet de détecter les problèmes tôt.

### Phase 3 : Nettoyage
> "Supprime l'ancienne implémentation de \`fetchData()\` maintenant que tous les appels ont été migrés. Vérifie qu'il n'y a plus aucune référence."

---

## La revue de code assistée

Claude Code peut analyser du code qu'il n'a pas écrit et produire une revue structurée.

**Prompt de code review :**
> "Fais une revue de la PR en cours (git diff main). Identifie : (1) les bugs potentiels, (2) les problèmes de performance, (3) les violations des conventions du projet, (4) ce qui manque en termes de tests. Sois concis et direct."

**Ce que Claude Code voit dans une revue :**
- Le diff (git diff)
- Le contexte (les fichiers modifiés en entier)
- Les tests existants
- Les conventions du CLAUDE.md

**Ce qu'il ne peut pas évaluer :**
- Si la feature répond au vrai besoin métier
- La clarté pour les futurs développeurs (biais de disponibilité)
- Les problèmes de performance à l'échelle (sans profiling)

---

## Déboguer avec Claude Code

Le débogage est là où Claude Code brille le plus — il peut lire l'erreur, trouver la source, et proposer un fix en quelques secondes.

**Pattern optimal pour le debugging :**

\`\`\`
1. Coller l'erreur exacte (stack trace complet)
2. Préciser dans quel contexte elle apparaît
3. Mentionner ce qui a changé récemment (si connu)
\`\`\`

**Exemple :**
> "TypeError: Cannot read properties of undefined (reading 'map')
> [stack trace]
> Cette erreur apparaît dans UserList quand on navigue directement vers /users sans passer par le Dashboard. Elle n'existait pas avant qu'on ajoute le lazy loading hier."

Avec ces informations, Claude Code va directement au bon endroit.

---

## Les sub-agents et tâches parallèles

Pour des tâches complexes, Claude Code peut lancer des **agents fils** qui travaillent en parallèle :

> "Analyse ces 3 composants en parallèle et identifie les patterns communs qu'on pourrait extraire dans un hook réutilisable."

Claude Code lance 3 sous-agents simultanés qui lisent chacun un composant, puis consolide leurs résultats. Beaucoup plus rapide qu'une analyse séquentielle.

**Quand utiliser des agents en parallèle :**
- Analyse de plusieurs fichiers indépendants
- Générer plusieurs variantes d'une solution
- Vérifier plusieurs cas de test en simultané

---

## Limites à connaître

**Ce que Claude Code fait moins bien :**

| Tâche | Problème | Alternative |
|-------|---------|-------------|
| Architecturer from scratch | Manque de vision long terme | Planifier ensemble d'abord |
| Estimer la complexité | Optimiste par nature | Décomposer et estimer soi-même |
| Décisions UX | Pas d'intuition utilisateur | Tester avec de vrais utilisateurs |
| Sécurité avancée | Peut manquer des vecteurs | Audit de sécurité dédié |
| Performance système | Sans profiling réel | Mesurer avant d'optimiser |

**La règle d'or :** Claude Code est excellent pour l'exécution. La stratégie reste chez toi.`,

      quiz: [
        {
          id: 'm3-l4-q1',
          question: "Dans un workflow TDD avec Claude Code, pourquoi est-il recommandé d'écrire les tests AVANT l'implémentation ?",
          options: [
            "Pour réduire le coût en tokens — les tests sont plus courts que l'implémentation",
            "Pour que Claude Code puisse voir les erreurs de tests et corriger son implémentation dans la même session",
            "Parce que Claude Code ne peut pas écrire des tests pour du code qu'il a lui-même créé",
            "Pour respecter les bonnes pratiques TDD qui exigent cet ordre pour des raisons historiques",
          ],
          correctIndex: 1,
          explanation: "Avec un hook PostToolUse qui lance les tests après chaque Edit, Claude Code voit les résultats en temps réel. Si ses tests sont écrits d'abord (Red), puis l'implémentation (Green), il peut itérer automatiquement : voir un test fail, ajuster l'implémentation, voir le test pass. Cette boucle de feedback est beaucoup plus efficace que de lui demander de corriger après coup.",
        },
        {
          id: 'm3-l4-q2',
          question: "Lors d'un refactoring large-scale, pourquoi commencer par une phase d'analyse sans modifier le code ?",
          options: [
            "Pour respecter la règle des 3 phases obligatoires dans Claude Code",
            "Pour valider la compréhension du problème avant d'agir, et détecter des cas inattendus avant de tout casser",
            "Parce que Claude Code ne peut pas analyser et modifier en même temps",
            "Pour générer automatiquement un rapport de refactoring pour l'équipe",
          ],
          correctIndex: 1,
          explanation: "Analyser d'abord (sans modifier) permet de valider que Claude Code a bien compris le scope, d'identifier des cas edge qu'on n'avait pas anticipés, et de s'assurer qu'on est d'accord sur la stratégie avant d'engager des modifications difficiles à défaire. C'est la même logique que le code review : comprendre avant d'agir.",
        },
        {
          id: 'm3-l4-q3',
          question: "Quelle information est la PLUS importante à fournir quand on débogue avec Claude Code ?",
          options: [
            "La version de Node.js et du système d'exploitation",
            "Le stack trace complet, le contexte d'apparition, et ce qui a changé récemment",
            "Le fichier package.json pour que Claude Code connaisse les dépendances",
            "Un screenshot de l'erreur dans la console du navigateur",
          ],
          correctIndex: 1,
          explanation: "Le stack trace donne l'origine exacte de l'erreur. Le contexte d'apparition (quand ? sous quelle condition ?) réduit l'espace de recherche. Ce qui a changé récemment oriente vers la cause probable. Ces 3 éléments permettent à Claude Code d'aller directement au bon endroit plutôt que d'explorer à l'aveugle.",
        },
        {
          id: 'm3-l4-q4',
          question: "Pour quelle tâche Claude Code est-il le MOINS fiable, selon les limites documentées ?",
          options: [
            "Renommer un type TypeScript dans toute la codebase",
            "Écrire des tests unitaires pour une fonction pure",
            "Estimer la complexité d'une nouvelle feature et le temps de développement",
            "Identifier les causes d'une NullPointerException dans un stack trace",
          ],
          correctIndex: 2,
          explanation: "Claude Code est 'optimiste par nature' pour les estimations de complexité — il a tendance à sous-estimer les difficultés, les cas edge et les régressions potentielles. La stratégie, la planification et les estimations restent des responsabilités humaines. Claude Code excelle dans l'exécution tactique, pas dans la vision stratégique.",
        },
      ],

      exercise: {
        id: 'm3-l4-ex',
        title: "Concevoir un workflow Claude Code pour un bug difficile",
        context: "Tu vas pratiquer la formulation de prompts pour un scénario de debugging réaliste.",
        instructions: `Voici un scénario de bug réaliste :

**Le bug :**
Dans l'app kryssbee Learning, la progression d'un utilisateur disparaît parfois au rechargement de la page. Ça arrive de façon aléatoire, pas à chaque fois. Le bug est apparu après qu'on a ajouté la fonctionnalité de reset de la progression il y a 2 jours.

**Ton objectif :**
Écris la séquence de prompts que tu donnerais à Claude Code pour diagnostiquer et corriger ce bug. Utilise les patterns vus dans cette leçon :
1. Un prompt d'analyse initiale
2. Un prompt de reproduction
3. Un prompt de correction

Teste tes prompts dans le panel "Tester avec Claude" avec ce contexte système :
\`Tu es Claude Code. Tu travailles sur une app React avec localStorage. Réponds en décrivant ce que tu ferais concrètement (quels fichiers tu lirais, quelles hypothèses tu testeras).\``,
        hint: "Pour un bug intermittent lié à une modification récente, commence par : (1) lire le code du système incriminé (progressService.ts et le reset), (2) identifier les race conditions ou mutations d'état possibles, (3) regarder si le reset nettoie correctement sans laisser de state corrompu. Un bug 'aléatoire' est souvent une race condition ou un problème de timing.",
        proposedSolution: `**Séquence de prompts optimale :**

**Prompt 1 — Analyse ciblée :**
"Un bug apparu il y a 2 jours : la progression localStorage disparaît aléatoirement au rechargement. Le bug coïncide avec l'ajout du reset de progression. Lis src/services/progressService.ts (fonctions reset(), save(), load()) et src/store/useProgressStore.ts (resetProgress()). Identifie les mutations d'état potentiellement dangereuses et les cas où save() pourrait être appelé avec des données vides ou corrompues."

**Prompt 2 — Reproduction hypothétique :**
"D'après ton analyse, dans quel scénario exact la progression pourrait-elle être écrasée par des données vides ? Décris le séquencement d'appels qui mènerait au bug (ex: reset() puis navigation rapide puis rechargement)."

**Prompt 3 — Correction :**
"Propose un fix dans progressService.ts qui :
1. Protège save() contre l'écriture de données invalides (null, objet vide)
2. Ajoute une validation dans load() pour détecter des données corrompues
3. Ne change pas l'API publique (les autres fichiers n'ont pas à changer)
Montre le diff exact."

**Analyse du bug réel :** La cause probable est que resetProgress() appelle progressService.reset() qui retourne un état vide, et si la page se recharge pendant un render, useProgressStore peut appeler save() avec cet état vide avant que l'état initial soit correctement chargé. La protection : ne jamais sauvegarder si modules est vide.`,
      },
    },
  ],
};
