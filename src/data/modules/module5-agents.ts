import type { Module } from '@/types';

export const module5: Module = {
  id: 'module-5',
  order: 5,
  title: 'Agents IA',
  description: "Concevoir et déployer des agents IA autonomes : architectures, boucles d'action, multi-agent et patterns de production.",
  icon: 'Bot',
  color: '#F59E0B',
  lessons: [
    // ─── Leçon 1 ────────────────────────────────────────────────────────────
    {
      id: 'module-5-lesson-1',
      order: 1,
      title: "Anatomie d'un agent IA",
      description: "Comprendre la boucle perception → raisonnement → action qui définit un agent autonome.",
      estimatedMinutes: 20,
      theory: `# Anatomie d'un agent IA

## Qu'est-ce qu'un agent IA ?

Un **agent IA** est un système qui perçoit son environnement, raisonne sur ce qu'il observe, prend des décisions, et agit — en boucle, de façon autonome, jusqu'à atteindre un objectif.

La différence avec un simple LLM :

| LLM seul | Agent IA |
|----------|----------|
| Reçoit un prompt, génère une réponse | Perçoit, raisonne, agit en boucle |
| Interaction unique | Plusieurs étapes autonomes |
| Pas d'accès aux outils | Peut appeler des outils, lire des fichiers, naviguer |
| Déterministe sur une entrée | Adaptatif selon les résultats intermédiaires |

---

## La boucle agent : Perceive → Reason → Act

\`\`\`
         ┌──────────────────────────────────┐
         │                                  │
         ▼                                  │
┌─────────────────┐                         │
│    PERCEIVE     │  ← environnement,       │
│  (observer)     │    résultats d'outils,  │
└────────┬────────┘    messages utilisateur │
         │                                  │
         ▼                                  │
┌─────────────────┐                         │
│     REASON      │  ← le LLM réfléchit,   │
│  (raisonner)    │    planifie l'étape     │
└────────┬────────┘    suivante             │
         │                                  │
         ▼                                  │
┌─────────────────┐                         │
│      ACT        │  → appelle un outil,   │
│  (agir)         │    écrit un fichier,   │
└─────────────────┘    retourne un résultat │
         │                                  │
         └──────────────────────────────────┘
              (jusqu'à l'objectif atteint)
\`\`\`

---

## Les composants d'un agent

**1. Le modèle (le cerveau)**
Le LLM qui raisonne — Claude, GPT-4, Gemini. Il reçoit le contexte et décide quoi faire.

**2. Les outils (les mains)**
Ce que l'agent peut faire : recherche web, lecture de fichiers, appels API, exécution de code. Sans outils, un agent ne peut que parler.

**3. La mémoire**
- **Mémoire de travail** : la fenêtre de contexte actuelle (conversation + résultats des outils)
- **Mémoire externe** : base de données, fichiers, vector store — ce qui dépasse la fenêtre

**4. Le système de planification**
Certains agents planifient explicitement avant d'agir (ReAct, Chain-of-Thought), d'autres agissent et s'adaptent à la volée.

---

## Les types d'agents

### Agent réactif (simple)
Répond aux stimuli sans planification. Reçoit une instruction, exécute, termine.

\`\`\`
Utilisateur : "Cherche le prix de l'action Apple"
Agent : [appelle search_tool("Apple stock price")] → retourne le résultat
\`\`\`

### Agent planificateur (ReAct)
**Re**asoning + **Act**ing — le pattern le plus courant. L'agent alterne entre réflexion et action.

\`\`\`
Thought: Je dois trouver le prix AAPL, puis comparer avec hier.
Action: search("AAPL stock price today")
Observation: $189.50
Thought: Maintenant je cherche le prix d'hier.
Action: search("AAPL stock price yesterday")
Observation: $185.20
Thought: J'ai les deux valeurs. Je calcule la variation.
Answer: AAPL a augmenté de +2.3% aujourd'hui ($189.50 vs $185.20 hier)
\`\`\`

### Agent à mémoire longue
Stocke et récupère des informations entre les sessions. Utilisé pour les assistants personnels qui "se souviennent" de toi.

### Multi-agent
Plusieurs agents spécialisés qui collaborent. On y reviendra en leçon 3.

---

## Le contexte : la fenêtre de travail de l'agent

Tout ce que l'agent "voit" à un instant T est dans sa fenêtre de contexte :

\`\`\`
System prompt (rôle, instructions, outils disponibles)
├── Conversation history (ce qui s'est passé avant)
├── Tool results (résultats des outils appelés)
├── Current observations (l'état actuel)
└── Current step (ce que l'agent doit faire maintenant)
\`\`\`

Gérer cette fenêtre efficacement est un des défis centraux des systèmes agents : trop d'informations = tokens gaspillés + performance dégradée.

---

## Quand utiliser un agent vs un simple LLM ?

**Un simple LLM suffit si :**
- La tâche est une seule étape (résumer, traduire, reformuler)
- Tu connais exactement les informations nécessaires à l'avance
- La réponse ne dépend pas de résultats intermédiaires

**Un agent est nécessaire si :**
- La tâche nécessite plusieurs étapes avec des décisions entre elles
- L'agent doit chercher des informations pendant l'exécution
- Le résultat d'une étape détermine les étapes suivantes
- La tâche peut prendre du temps et nécessite de l'autonomie`,

      quiz: [
        {
          id: 'm5-l1-q1',
          question: "Quelle est la différence fondamentale entre un LLM seul et un agent IA ?",
          options: [
            "Un agent utilise un modèle plus puissant qu'un LLM standard",
            "Un agent boucle entre perception, raisonnement et action de façon autonome avec des outils, un LLM génère une seule réponse",
            "Un agent peut fonctionner hors ligne, un LLM nécessite une connexion internet",
            "Un agent mémorise toutes les conversations précédentes automatiquement",
          ],
          correctIndex: 1,
          explanation: "La distinction clé est la boucle autonome : un LLM reçoit un prompt et génère une réponse (une étape). Un agent perçoit son environnement, raisonne, agit (appelle des outils, lit des fichiers), observe les résultats, et recommence — jusqu'à atteindre l'objectif. L'autonomie multi-étapes avec des outils est ce qui définit un agent.",
        },
        {
          id: 'm5-l1-q2',
          question: "Dans le pattern ReAct, qu'est-ce qu'une 'Observation' ?",
          options: [
            "Une note que l'agent écrit pour lui-même sur ce qu'il a appris",
            "Le résultat retourné par un outil après qu'il a été appelé",
            "Une instruction de l'utilisateur qui modifie le comportement de l'agent",
            "Une erreur détectée par l'agent dans son raisonnement",
          ],
          correctIndex: 1,
          explanation: "Dans ReAct, le cycle est : Thought (raisonnement) → Action (appel d'outil) → Observation (résultat de l'outil). L'Observation est ce que l'outil retourne — le résultat d'une recherche web, le contenu d'un fichier, la réponse d'une API. L'agent intègre cette observation dans son contexte pour décider de l'étape suivante.",
        },
        {
          id: 'm5-l1-q3',
          question: "Quelle est la différence entre la mémoire de travail et la mémoire externe d'un agent ?",
          options: [
            "La mémoire de travail est rapide, la mémoire externe est persistante entre les redémarrages",
            "La mémoire de travail est la fenêtre de contexte actuelle, la mémoire externe est une base de données ou fichier au-delà de la fenêtre",
            "La mémoire de travail contient les outils, la mémoire externe contient les conversations",
            "Il n'y a pas de différence — ce sont deux termes pour le même concept",
          ],
          correctIndex: 1,
          explanation: "La mémoire de travail = ce qui est dans la fenêtre de contexte active (conversation, résultats d'outils). Elle est limitée et perdue à la fin de la session. La mémoire externe = base de données, fichiers, vector stores — persistante et non limitée par la fenêtre de contexte. Les agents avancés récupèrent de la mémoire externe et l'injectent dans la fenêtre au moment voulu.",
        },
        {
          id: 'm5-l1-q4',
          question: "Pour quelle tâche un agent IA est-il le plus adapté ?",
          options: [
            "Traduire un paragraphe de français en anglais",
            "Résumer un document de 5 pages",
            "Analyser les ventes du mois, identifier les anomalies, les comparer à l'année précédente, et rédiger un rapport",
            "Reformuler un email pour le rendre plus formel",
          ],
          correctIndex: 2,
          explanation: "L'analyse des ventes est parfaite pour un agent : elle nécessite plusieurs étapes (récupérer les données, analyser, comparer, rédiger), des décisions intermédiaires (quelles anomalies sont significatives ?), et potentiellement des appels à plusieurs outils (base de données, calculs, génération de rapport). Les 3 autres tâches sont des transformations simples en une étape — un LLM direct suffit.",
        },
      ],

      exercise: {
        id: 'm5-l1-ex',
        title: "Simuler le raisonnement ReAct d'un agent",
        context: "Tu vas pratiquer le pattern de raisonnement ReAct en simulant le travail d'un agent.",
        instructions: `Utilise le panel "Tester avec Claude" avec ce system prompt :

\`\`\`
Tu es un agent IA qui utilise le pattern ReAct (Reasoning + Acting).
Pour chaque tâche, tu dois structurer ta réponse ainsi :
Thought: [ton raisonnement]
Action: [l'outil que tu appellerais et ses paramètres]
Observation: [simule le résultat probable]
... (répète jusqu'à avoir la réponse)
Answer: [la réponse finale]

Outils disponibles : search(query), calculate(expression), read_file(path)
\`\`\`

**Tâche à donner à l'agent :**
*"Je veux savoir si investir 1000€ dans Bitcoin aujourd'hui est rentable si le prix remonte à son ATH (All-Time High). Calcule le gain potentiel."*

Observe comment l'agent décompose la tâche, identifie les informations manquantes, et planifie ses actions. Compare le nombre d'étapes que ça prend vs une simple question directe.`,
        hint: "L'agent devrait identifier qu'il a besoin de 2 informations : le prix actuel du Bitcoin ET son ATH historique. Il fera 2 recherches séparées, puis un calcul. Observe comment chaque Observation influence le Thought suivant — c'est la boucle agent en action.",
        proposedSolution: `**Exemple de raisonnement ReAct attendu :**

\`\`\`
Thought: Je dois trouver le prix actuel du Bitcoin et son ATH pour calculer le gain potentiel.
Action: search("Bitcoin price today USD")
Observation: Bitcoin (BTC) price: ~$67,000 USD (juin 2025)

Thought: J'ai le prix actuel. Maintenant je cherche l'ATH de Bitcoin.
Action: search("Bitcoin all time high price USD")
Observation: Bitcoin ATH: $108,786 USD (janvier 2025)

Thought: J'ai les deux valeurs. Je peux calculer :
- Investissement : 1000€ ≈ 1080$ au taux actuel
- BTC achetable : 1080 / 67000 ≈ 0.01612 BTC
- Valeur à l'ATH : 0.01612 × 108786 ≈ 1754$
- Gain : 1754 - 1080 = +674$ (+62%)
Action: calculate("(1000 * 1.08 / 67000) * 108786")
Observation: 1754.2

Answer: Avec 1000€ investis au prix actuel (~67,000$), tu achètes ~0.016 BTC.
Si Bitcoin remonte à son ATH de 108,786$, ton investissement vaudrait ~1754$,
soit un gain de +62%. Note : ceci n'est pas un conseil financier.
\`\`\`

**Ce que ça illustre :**
- L'agent identifie les informations manquantes avant d'agir
- Chaque Observation influence le Thought suivant
- L'agent combine plusieurs sources pour construire sa réponse finale`,
      },
    },

    // ─── Leçon 2 ────────────────────────────────────────────────────────────
    {
      id: 'module-5-lesson-2',
      order: 2,
      title: 'Tool use et function calling',
      description: "Donner des outils à un LLM avec l'API Anthropic et gérer les cycles d'appel de fonctions.",
      estimatedMinutes: 30,
      theory: `# Tool use et function calling

## Le concept : donner des mains au LLM

Par défaut, un LLM ne peut que générer du texte. Le **tool use** (ou function calling) lui donne la capacité de demander l'exécution de fonctions définies par ton code.

Le LLM ne *exécute* pas le code — il *demande* l'exécution. C'est ton programme qui exécute et retourne le résultat.

\`\`\`
Ton code        LLM
   │    ──── définition des outils ────►  │
   │                                       │  (réfléchit)
   │    ◄─── "appelle get_weather(Paris)" ─  │
   │  (exécute)                            │
   │    ──── résultat: "18°C, nuageux" ──► │
   │                                       │  (génère la réponse)
   │    ◄─── "À Paris il fait 18°C..."  ─  │
\`\`\`

---

## Définir des outils avec l'API Anthropic

\`\`\`typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const tools: Anthropic.Tool[] = [
  {
    name: 'get_weather',
    description: 'Retourne la météo actuelle pour une ville. Utilise cet outil quand l\\'utilisateur demande la météo.',
    input_schema: {
      type: 'object' as const,
      properties: {
        city: {
          type: 'string',
          description: 'Nom de la ville (ex: "Paris", "Tokyo")',
        },
        unit: {
          type: 'string',
          enum: ['celsius', 'fahrenheit'],
          description: 'Unité de température',
        },
      },
      required: ['city'],
    },
  },
];

const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  tools,
  messages: [{ role: 'user', content: 'Quel temps fait-il à Paris ?' }],
});
\`\`\`

---

## Le cycle complet tool use

\`\`\`typescript
async function agentLoop(userMessage: string) {
  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: userMessage }
  ];

  while (true) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      tools,
      messages,
    });

    // Fin : le modèle a sa réponse finale
    if (response.stop_reason === 'end_turn') {
      const text = response.content.find(b => b.type === 'text');
      return text?.text ?? '';
    }

    // Le modèle veut appeler des outils
    if (response.stop_reason === 'tool_use') {
      // Ajouter la réponse du modèle à l'historique
      messages.push({ role: 'assistant', content: response.content });

      // Traiter chaque appel d'outil
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const block of response.content) {
        if (block.type !== 'tool_use') continue;

        // Exécuter l'outil
        const result = await executeTool(block.name, block.input);

        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: JSON.stringify(result),
        });
      }

      // Renvoyer les résultats au modèle
      messages.push({ role: 'user', content: toolResults });
      // → recommence la boucle
    }
  }
}
\`\`\`

---

## Exécuter les outils

\`\`\`typescript
async function executeTool(name: string, input: Record<string, unknown>) {
  switch (name) {
    case 'get_weather':
      return await fetchWeather(input.city as string, input.unit as string);

    case 'search_web':
      return await searchBrave(input.query as string);

    case 'read_file':
      return await fs.readFile(input.path as string, 'utf-8');

    default:
      throw new Error(\`Outil inconnu : \${name}\`);
  }
}
\`\`\`

---

## Tool choice : contrôler quand les outils sont utilisés

\`\`\`typescript
// Laisser le modèle décider (défaut)
tool_choice: { type: 'auto' }

// Forcer l'utilisation d'un outil spécifique
tool_choice: { type: 'tool', name: 'get_weather' }

// Interdire les outils — réponse texte uniquement
tool_choice: { type: 'none' }

// Forcer l'utilisation d'au moins un outil
tool_choice: { type: 'any' }
\`\`\`

---

## Les appels parallèles

Claude peut appeler plusieurs outils en **parallèle** dans la même réponse :

\`\`\`
User: "Compare la météo à Paris, Londres et Tokyo"

Claude: [
  tool_use: get_weather("Paris"),
  tool_use: get_weather("Londres"),
  tool_use: get_weather("Tokyo"),
]
\`\`\`

Ton code doit gérer tous les \`tool_use\` blocs et retourner tous les \`tool_result\` dans un seul message \`user\`.

---

## Bonnes pratiques

**Descriptions orientées usage :**
\`\`\`typescript
// ❌
description: "Cherche des informations"

// ✅
description: "Cherche sur le web des informations récentes. Utilise cet outil quand la question porte sur des événements récents, des prix actuels, ou des données qui changent fréquemment."
\`\`\`

**Limiter le nombre d'outils :**
Trop d'outils = le modèle hésite. 5-7 outils bien définis valent mieux que 20 outils vagues.

**Timeout sur les appels :**
\`\`\`typescript
const result = await Promise.race([
  executeTool(name, input),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), 10000)
  ),
]);
\`\`\``,

      quiz: [
        {
          id: 'm5-l2-q1',
          question: "Dans le tool use Anthropic, qui exécute réellement le code de l'outil ?",
          options: [
            "Le modèle Claude exécute le code directement dans un sandbox",
            "Les serveurs Anthropic exécutent le code et retournent le résultat",
            "Ton programme client — le modèle demande l'exécution, ton code l'effectue et retourne le résultat",
            "L'outil est exécuté automatiquement par le SDK sans intervention du développeur",
          ],
          correctIndex: 2,
          explanation: "Le LLM ne peut pas exécuter de code — il génère une demande structurée (quel outil appeler, avec quels arguments). C'est ton programme qui intercepte cette demande, exécute réellement la fonction, et retourne le résultat au LLM. Le LLM intègre alors ce résultat dans son contexte pour continuer.",
        },
        {
          id: 'm5-l2-q2',
          question: "Que signifie `stop_reason: 'tool_use'` dans une réponse de l'API Anthropic ?",
          options: [
            "Le modèle a terminé et n'a pas besoin d'utiliser d'outils",
            "Le modèle veut appeler un ou plusieurs outils avant de continuer",
            "Une erreur s'est produite lors de l'exécution d'un outil",
            "Le modèle a dépassé la limite de tokens allouée aux outils",
          ],
          correctIndex: 1,
          explanation: "stop_reason: 'tool_use' signifie que le modèle s'est arrêté parce qu'il veut appeler des outils. La réponse contient des blocs de type 'tool_use' avec le nom et les arguments. Ton code doit exécuter ces outils et renvoyer les résultats au modèle dans un nouveau message 'user' contenant des blocs 'tool_result'.",
        },
        {
          id: 'm5-l2-q3',
          question: "Comment gérer le cas où Claude appelle get_weather pour Paris, Londres et Tokyo simultanément ?",
          options: [
            "Retourner uniquement le résultat de Paris — Claude rappellera pour les autres",
            "Exécuter les 3 appels et retourner les 3 tool_results dans un seul message user",
            "Refuser les appels parallèles avec tool_choice: { type: 'none' }",
            "Exécuter séquentiellement et envoyer 3 messages user séparés",
          ],
          correctIndex: 1,
          explanation: "Quand Claude génère plusieurs blocs tool_use dans une même réponse, tu dois tous les exécuter (idéalement en parallèle avec Promise.all pour la performance) et retourner tous les tool_results dans un seul message user. Chaque tool_result référence son tool_use via le tool_use_id.",
        },
        {
          id: 'm5-l2-q4',
          question: "Pourquoi limiter le nombre d'outils exposés à un agent à 5-7 maximum ?",
          options: [
            "L'API Anthropic limite techniquement à 7 outils par requête",
            "Trop d'outils augmentent le coût de chaque appel de façon exponentielle",
            "Trop d'outils font hésiter le modèle sur lequel choisir, dégradant la précision",
            "Chaque outil supplémentaire réduit la fenêtre de contexte disponible de 1000 tokens",
          ],
          correctIndex: 2,
          explanation: "Le modèle doit choisir parmi les outils disponibles basé sur leurs descriptions. Avec 20 outils similaires, il peut faire des choix sous-optimaux ou confondre des outils proches. 5-7 outils bien définis et distincts permettent une sélection claire. Si tu as besoin de plus d'outils, regroupe-les par domaine dans des agents spécialisés.",
        },
      ],

      exercise: {
        id: 'm5-l2-ex',
        title: "Implémenter un mini-agent avec tool use",
        context: "Tu vas construire un agent capable de répondre à des questions en utilisant des outils simulés.",
        instructions: `Utilise le panel "Tester avec Claude" pour explorer le tool use en profondeur.

**Partie 1 — Comprendre le format**
Demande à Claude de générer le code TypeScript complet d'un agent simple avec 2 outils :
- \`search_web(query: string)\` — simule une recherche web
- \`calculate(expression: string)\` — évalue une expression mathématique

Le code doit inclure : définition des outils, la boucle agentLoop, et la fonction executeTool.

**Partie 2 — Simuler un cycle complet**
Donne à Claude ce scénario :
*"Simule un cycle complet de tool use pour la question : 'Combien de secondes dans une année bissextile ?'. Montre les messages échangés entre le programme et le modèle (messages[], tool_use, tool_result) au format JSON."*

**Partie 3 — Gestion d'erreur**
Que se passe-t-il si un outil retourne une erreur ? Demande à Claude comment gérer proprement le cas où \`executeTool\` lance une exception, et comment le signaler au modèle via \`tool_result\`.`,
        hint: "Pour la partie 3, un tool_result peut contenir un champ `is_error: true` pour signaler une erreur à Claude. Le modèle peut alors décider de réessayer avec des paramètres différents, d'utiliser un autre outil, ou d'informer l'utilisateur de l'échec. C'est plus propre que de laisser l'exception planter la boucle.",
        proposedSolution: `**Partie 1 — Agent complet :**
\`\`\`typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const tools: Anthropic.Tool[] = [
  {
    name: 'search_web',
    description: 'Cherche des informations récentes sur le web.',
    input_schema: {
      type: 'object' as const,
      properties: { query: { type: 'string', description: 'La requête de recherche' } },
      required: ['query'],
    },
  },
  {
    name: 'calculate',
    description: 'Évalue une expression mathématique et retourne le résultat numérique.',
    input_schema: {
      type: 'object' as const,
      properties: { expression: { type: 'string', description: 'Expression à calculer (ex: "365 * 24 * 3600")' } },
      required: ['expression'],
    },
  },
];

async function executeTool(name: string, input: Record<string, unknown>) {
  if (name === 'calculate') {
    try {
      return { result: eval(input.expression as string) };
    } catch {
      throw new Error('Expression invalide');
    }
  }
  if (name === 'search_web') {
    return { results: [\`Résultats simulés pour: \${input.query}\`] };
  }
  throw new Error(\`Outil inconnu: \${name}\`);
}

async function agentLoop(userMessage: string) {
  const messages: Anthropic.MessageParam[] = [{ role: 'user', content: userMessage }];

  while (true) {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      tools,
      messages,
    });

    if (response.stop_reason === 'end_turn') {
      return response.content.find(b => b.type === 'text')?.text ?? '';
    }

    messages.push({ role: 'assistant', content: response.content });
    const results: Anthropic.ToolResultBlockParam[] = [];

    for (const block of response.content) {
      if (block.type !== 'tool_use') continue;
      try {
        const result = await executeTool(block.name, block.input as Record<string, unknown>);
        results.push({ type: 'tool_result', tool_use_id: block.id, content: JSON.stringify(result) });
      } catch (err) {
        results.push({ type: 'tool_result', tool_use_id: block.id, content: String(err), is_error: true });
      }
    }
    messages.push({ role: 'user', content: results });
  }
}
\`\`\`

**Partie 3 — Gestion d'erreur :**
\`is_error: true\` dans le tool_result signale à Claude que l'outil a échoué. Claude peut alors réessayer avec d'autres paramètres, utiliser un outil alternatif, ou expliquer à l'utilisateur pourquoi il ne peut pas répondre.`,
      },
    },

    // ─── Leçon 3 ────────────────────────────────────────────────────────────
    {
      id: 'module-5-lesson-3',
      order: 3,
      title: 'Architectures multi-agents',
      description: 'Orchestrer plusieurs agents spécialisés pour résoudre des tâches complexes.',
      estimatedMinutes: 35,
      theory: `# Architectures multi-agents

## Pourquoi plusieurs agents ?

Un seul agent avec beaucoup d'outils et un long contexte devient lent, coûteux, et moins précis. Les systèmes multi-agents décomposent le problème :

**Spécialisation :** Chaque agent est expert dans un domaine (recherche, code, analyse, rédaction)

**Parallélisme :** Plusieurs agents travaillent simultanément sur des sous-tâches indépendantes

**Contexte isolé :** Chaque agent a sa propre fenêtre propre — pas de pollution entre les tâches

---

## Les patterns d'architecture multi-agents

### 1. Orchestrateur → Sous-agents (le plus courant)

\`\`\`
                 ┌─────────────────┐
    Utilisateur → │  Orchestrateur  │
                 │  (planifie,     │
                 │   délègue)      │
                 └────────┬────────┘
                          │
           ┌──────────────┼──────────────┐
           ▼              ▼              ▼
    ┌────────────┐ ┌────────────┐ ┌────────────┐
    │  Agent     │ │  Agent     │ │  Agent     │
    │  Recherche │ │  Code      │ │  Rédaction │
    └────────────┘ └────────────┘ └────────────┘
\`\`\`

L'orchestrateur reçoit l'objectif, planifie, délègue des sous-tâches aux agents spécialisés, et agrège les résultats.

**En pratique avec Claude :**
\`\`\`typescript
// L'orchestrateur a un outil "run_agent"
const orchestratorTools = [{
  name: 'run_agent',
  description: 'Lance un agent spécialisé sur une sous-tâche',
  input_schema: {
    type: 'object' as const,
    properties: {
      agent: { type: 'string', enum: ['research', 'code', 'writer'] },
      task: { type: 'string' },
    },
    required: ['agent', 'task'],
  },
}];
\`\`\`

### 2. Pipeline séquentiel

\`\`\`
Input → Agent A → Agent B → Agent C → Output
        (collecte)  (analyse)  (rédige)
\`\`\`

La sortie de chaque agent devient l'entrée du suivant. Simple à implémenter, facile à déboguer.

### 3. Réseau pair-à-pair (avancé)

Les agents peuvent se contacter directement. Moins courant, utilisé pour les systèmes de simulation ou les débats contradictoires.

---

## Implémentation : orchestrateur + sous-agents

\`\`\`typescript
// Sous-agent spécialisé
async function researchAgent(task: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001', // modèle rapide pour les sous-tâches
    max_tokens: 2048,
    system: 'Tu es un expert en recherche d\\'informations. Sois factuel et concis.',
    tools: [searchTool],
    messages: [{ role: 'user', content: task }],
  });
  // ... boucle tool use
  return result;
}

// Orchestrateur
async function orchestrator(goal: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6', // modèle puissant pour planifier
    max_tokens: 4096,
    system: 'Tu orchestres des agents spécialisés pour atteindre des objectifs complexes.',
    tools: [runAgentTool],
    messages: [{ role: 'user', content: goal }],
  });

  // Quand l'orchestrateur appelle run_agent...
  if (block.name === 'run_agent') {
    const { agent, task } = block.input;
    if (agent === 'research') return await researchAgent(task);
    if (agent === 'code') return await codeAgent(task);
    if (agent === 'writer') return await writerAgent(task);
  }
}
\`\`\`

---

## Paralléliser les sous-agents

\`\`\`typescript
// L'orchestrateur peut lancer plusieurs agents en parallèle
const [researchResult, codeResult] = await Promise.all([
  researchAgent('Trouver les meilleures pratiques React 2025'),
  codeAgent('Analyser le composant UserCard pour les optimisations'),
]);
\`\`\`

C'est exactement ce que Claude Code fait avec le tool \`Agent\` — il lance des sous-agents pour des tâches indépendantes.

---

## Choisir le bon modèle par rôle

\`\`\`
Orchestrateur  → claude-sonnet-4-6  (raisonnement complexe, planification)
Sous-agents    → claude-haiku-4-5   (rapidité, coût, tâches simples)
Tâches créatives → claude-opus-4-8  (qualité maximale si nécessaire)
\`\`\`

Utiliser le modèle le plus puissant pour tout est coûteux et lent. L'orchestrateur a besoin de raisonnement, les sous-agents ont besoin de vitesse.

---

## Communication entre agents

**Via le contexte (simple) :**
L'output d'un agent devient l'input du suivant — passé comme string dans le prompt.

**Via une base de données (robust) :**
Les agents partagent un état dans une DB. Chaque agent lit et écrit dans un espace commun.

\`\`\`typescript
// Agent A écrit ses résultats
await supabase.from('agent_results').insert({
  task_id,
  agent: 'research',
  result: JSON.stringify(findings),
});

// Agent B lit les résultats d'Agent A
const { data } = await supabase
  .from('agent_results')
  .select('result')
  .eq('task_id', task_id)
  .eq('agent', 'research');
\`\`\`

---

## Limites des systèmes multi-agents

- **Debugging difficile** : quand ça échoue, difficile de savoir quel agent a failli
- **Coût cumulatif** : N agents = N fois plus de tokens
- **Cohérence** : les agents peuvent se contredire sans coordination explicite
- **Latence** : une chaîne d'agents prend du temps

**Règle :** Commence avec un seul agent bien conçu. N'ajoute la complexité multi-agents que quand c'est nécessaire.`,

      quiz: [
        {
          id: 'm5-l3-q1',
          question: "Quel est le principal avantage d'une architecture multi-agents par rapport à un seul agent avec beaucoup d'outils ?",
          options: [
            "Les systèmes multi-agents ne nécessitent pas de modèle LLM — ils peuvent utiliser des règles statiques",
            "Spécialisation, parallélisme et isolation du contexte — chaque agent est expert et travaille avec un contexte propre",
            "Les systèmes multi-agents sont toujours moins coûteux en tokens",
            "Un seul agent ne peut appeler que 5 outils maximum",
          ],
          correctIndex: 1,
          explanation: "La vraie valeur du multi-agent est triple : (1) Spécialisation — un agent dédié à la recherche est meilleur qu'un agent généraliste, (2) Parallélisme — plusieurs sous-tâches indépendantes s'exécutent simultanément, (3) Isolation du contexte — chaque agent a une fenêtre propre et ne pollue pas le contexte des autres.",
        },
        {
          id: 'm5-l3-q2',
          question: "Dans le pattern Orchestrateur → Sous-agents, quel modèle doit-on utiliser pour l'orchestrateur ?",
          options: [
            "Le modèle le plus rapide (Haiku) pour minimiser la latence globale",
            "Le modèle le moins cher pour réduire les coûts de l'étape de planification",
            "Le modèle le plus puissant (Sonnet/Opus) car la planification est la tâche la plus critique",
            "Le même modèle pour tous les agents pour garantir la cohérence",
          ],
          correctIndex: 2,
          explanation: "L'orchestrateur planifie, décompose l'objectif, et décide quelle sous-tâche donner à quel agent. C'est la décision la plus complexe — une mauvaise planification fait échouer tout le système. Les sous-agents, eux, exécutent des tâches bien définies et peuvent utiliser Haiku pour la rapidité et le coût.",
        },
        {
          id: 'm5-l3-q3',
          question: "Comment deux agents peuvent-ils partager de l'état de façon robuste dans un pipeline de production ?",
          options: [
            "Via des variables globales JavaScript partagées en mémoire",
            "En passant l'output de l'un comme input de l'autre uniquement via des strings",
            "Via une base de données partagée où chaque agent lit et écrit ses résultats",
            "Les agents ne peuvent pas partager d'état — ils doivent être complètement indépendants",
          ],
          correctIndex: 2,
          explanation: "Passer des strings entre agents (pipeline séquentiel) fonctionne pour les cas simples mais est fragile : perte de données structurées, pas de retry possible, couplage fort. Une DB partagée permet la persistance (retry possible), la lisibilité (tu peux inspecter l'état), et le découplage (les agents n'ont pas besoin de se connaître directement).",
        },
        {
          id: 'm5-l3-q4',
          question: "Quand NE PAS utiliser une architecture multi-agents ?",
          options: [
            "Quand la tâche prend plus de 30 secondes à exécuter",
            "Quand tu commences à développer — commence toujours simple et ajoute la complexité si nécessaire",
            "Quand tu utilises Claude — multi-agents n'est supporté qu'avec GPT-4",
            "Quand le budget de tokens dépasse 10 000 tokens par requête",
          ],
          correctIndex: 1,
          explanation: "Le multi-agent ajoute de la complexité : debugging difficile, coût cumulatif, risques d'incohérence. La règle est de commencer avec un seul agent bien conçu. Si tu te heurtes à des limites réelles (fenêtre de contexte, vitesse, précision), alors tu migres vers le multi-agent. Débuter avec un système complexe est une sur-ingénierie prématurée.",
        },
      ],

      exercise: {
        id: 'm5-l3-ex',
        title: "Concevoir un système multi-agents pour kryssbee Learning",
        context: "Tu vas concevoir un système multi-agents qui pourrait automatiser la création de contenu pour cette plateforme.",
        instructions: `Imagine un système qui génère automatiquement une nouvelle leçon complète pour kryssbee Learning.

**Objectif :** Générer une leçon sur "Les embeddings et la recherche sémantique" avec theory, 4 quiz, et un exercice.

**Partie 1 — Architecture**
Dessine (en texte) l'architecture multi-agents que tu utiliserais. Identifie :
- Le rôle de l'orchestrateur
- Les 3-4 sous-agents nécessaires
- L'ordre d'exécution et les dépendances

**Partie 2 — Implémentation partielle**
Utilise le panel "Tester avec Claude" pour générer :
1. Le system prompt de l'orchestrateur
2. Le system prompt de l'agent "Concepteur de QCM" (qui génère les 4 questions)

**Partie 3 — Test**
Utilise l'agent QCM que tu viens de créer : donne-lui le sujet "Les embeddings et la recherche sémantique" et vérifie que ses questions respectent le format attendu (4 options, correctIndex, explanation).`,
        hint: "Pour un système de génération de leçon : (1) Agent Recherche — collecte les informations sur le sujet, (2) Agent Théorie — rédige la section markdown, (3) Agent QCM — génère les 4 questions (peut travailler en parallèle avec le précédent une fois le plan défini), (4) Agent Exercice — crée l'exercice pratique. L'orchestrateur planifie et assemble.",
        proposedSolution: `**Partie 1 — Architecture :**
\`\`\`
Utilisateur: "Génère une leçon sur les embeddings"
     │
     ▼
┌─────────────────────────────────┐
│  Orchestrateur (Sonnet)         │
│  → Planifie la structure        │
│  → Délègue en parallèle         │
└──────┬──────────────────────────┘
       │
   ┌───┴───────────────────┐
   ▼                       ▼
┌────────────┐    ┌──────────────┐
│  Recherche │    │  Planificateur│
│  (Haiku)   │    │  de contenu  │
│  → Collecte│    │  → Outline   │
└─────┬──────┘    └──────┬───────┘
      │                  │
      └────────┬──────────┘
               ▼
     ┌──────────────────┐
     │  Agent Théorie   │ (parallèle avec Agent QCM)
     │  → Section theory│
     └────────┬─────────┘
              │    ┌──────────────┐
              │    │  Agent QCM   │
              │    │  → 4 questions│
              │    └──────┬───────┘
              │           │
              └─────┬─────┘
                    ▼
             ┌────────────┐
             │Agent Exercice│
             │  → Exercice │
             └─────┬───────┘
                   ▼
             Assemblage final
\`\`\`

**Partie 2 — System prompt Agent QCM :**
\`\`\`
Tu es un expert en conception pédagogique. Tu crées des QCM pour une plateforme d'apprentissage IA.

Pour chaque question :
- Elle doit tester la compréhension, pas la mémorisation
- 4 options, une seule correcte
- Les distracteurs doivent être plausibles
- L'explication doit justifier POURQUOI la bonne réponse est correcte

Retourne TOUJOURS un tableau JSON avec exactement 4 objets :
{ id, question, options: [4 strings], correctIndex: 0-3, explanation }
\`\`\``,
      },
    },

    // ─── Leçon 4 ────────────────────────────────────────────────────────────
    {
      id: 'module-5-lesson-4',
      order: 4,
      title: 'Guardrails, fiabilité et agents en production',
      description: 'Rendre les agents fiables, prévisibles et sûrs dans des environnements réels.',
      estimatedMinutes: 25,
      theory: `# Guardrails, fiabilité et agents en production

## Le défi de la fiabilité des agents

Un agent autonome peut faire beaucoup — y compris des choses non prévues. En production, les risques principaux sont :

- **Boucles infinies** : l'agent boucle sans atteindre son objectif
- **Actions irréversibles** : supprimer un fichier, envoyer un email, payer une commande
- **Coût incontrôlé** : une boucle sur un modèle coûteux explose la facture
- **Hallucination d'outils** : l'agent appelle un outil qui n'existe pas ou avec de mauvais paramètres
- **Prompt injection** : des données malveillantes détournent le comportement de l'agent

---

## Guardrail 1 : Limiter les itérations

\`\`\`typescript
async function agentLoop(userMessage: string, maxSteps = 10) {
  let steps = 0;

  while (steps < maxSteps) {
    steps++;
    const response = await client.messages.create({ ... });

    if (response.stop_reason === 'end_turn') return extractText(response);
    if (response.stop_reason === 'tool_use') {
      // ... exécuter les outils
    }

    if (steps === maxSteps) {
      return "L'agent a atteint la limite d'étapes sans conclure. Reformule ta demande.";
    }
  }
}
\`\`\`

---

## Guardrail 2 : Human-in-the-loop pour les actions critiques

\`\`\`typescript
async function executeTool(name: string, input: unknown) {
  // Actions destructives → demander confirmation
  const destructiveTools = ['delete_file', 'send_email', 'charge_card'];

  if (destructiveTools.includes(name)) {
    const confirmed = await askUserConfirmation(
      \`L'agent veut exécuter \${name} avec : \${JSON.stringify(input)}\`
    );
    if (!confirmed) {
      return { error: 'Action annulée par l\\'utilisateur' };
    }
  }

  return await executeToolInternal(name, input);
}
\`\`\`

---

## Guardrail 3 : Budget de tokens

\`\`\`typescript
let totalTokens = 0;
const TOKEN_BUDGET = 50000; // ~0.15$ avec Sonnet

while (true) {
  const response = await client.messages.create({ ... });

  totalTokens += response.usage.input_tokens + response.usage.output_tokens;

  if (totalTokens > TOKEN_BUDGET) {
    return \`Budget de tokens atteint (\${totalTokens} tokens utilisés). Tâche interrompue.\`;
  }

  // ... suite de la boucle
}
\`\`\`

---

## Guardrail 4 : Timeouts et retry

\`\`\`typescript
async function executeToolWithRetry(
  name: string,
  input: unknown,
  maxRetries = 3,
  timeoutMs = 10000,
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await Promise.race([
        executeTool(name, input),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), timeoutMs)
        ),
      ]);
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise(r => setTimeout(r, 1000 * attempt)); // backoff
    }
  }
}
\`\`\`

---

## Observer et déboguer un agent

**Logger chaque étape :**
\`\`\`typescript
function logStep(step: number, type: string, data: unknown) {
  console.error(JSON.stringify({
    timestamp: new Date().toISOString(),
    step,
    type, // 'llm_call', 'tool_use', 'tool_result', 'final'
    data,
  }));
}
\`\`\`

**Stocker les traces en DB :**
Pour les agents en production, chaque run doit être traçable :
- Quel objectif ?
- Quels outils ont été appelés, dans quel ordre ?
- Combien de tokens ?
- Résultat final ?

---

## Le principe de moindre autonomie

**L'autonomie est un spectre — choisis le bon niveau :**

\`\`\`
Faible autonomie          Haute autonomie
      │                        │
      ▼                        ▼
Confirmation sur        Exécution complète
chaque action           sans interruption

← Plus sûr              Plus rapide →
← Plus lent             Plus risqué →
\`\`\`

En pratique :
- **Exploration / lecture** → autonomie totale (lire des fichiers ne casse rien)
- **Modifications réversibles** → confirmation légère (diff avant d'appliquer)
- **Actions irréversibles** → confirmation explicite obligatoire

---

## Checklist agent en production

**Avant de déployer :**
- [ ] Limite d'itérations configurée
- [ ] Budget de tokens configuré
- [ ] Timeouts sur chaque appel d'outil
- [ ] Retry avec backoff exponentiel
- [ ] Logs structurés sur chaque étape
- [ ] Actions destructives protégées par confirmation
- [ ] Tests avec des inputs adversariaux (prompt injection)
- [ ] Graceful degradation (que se passe-t-il si l'agent échoue ?)

**Monitoring en production :**
- Durée moyenne des runs
- Taux d'échec par type d'erreur
- Coût moyen par run
- Nombre d'étapes moyen avant conclusion`,

      quiz: [
        {
          id: 'm5-l4-q1',
          question: "Pourquoi faut-il limiter le nombre maximum d'itérations dans une boucle agent ?",
          options: [
            "L'API Anthropic limite automatiquement à 20 appels par session",
            "Pour éviter les boucles infinies où l'agent tourne sans atteindre son objectif, consommant des tokens et du temps indéfiniment",
            "Car après 10 itérations, les LLM perdent le fil de la conversation",
            "Pour respecter les limites de rate limiting de l'API",
          ],
          correctIndex: 1,
          explanation: "Un agent peut boucler quand un outil retourne des résultats ambigus, quand l'objectif est mal défini, ou quand le modèle tourne en rond entre deux outils. Sans limite d'itérations, la boucle tourne indéfiniment et génère des coûts. Une limite de 10-20 étapes avec un message d'arrêt explicite est une protection standard.",
        },
        {
          id: 'm5-l4-q2',
          question: "Qu'est-ce que le principe 'human-in-the-loop' appliqué aux agents IA ?",
          options: [
            "L'humain doit écrire lui-même le code de chaque outil que l'agent utilise",
            "Une confirmation humaine est requise avant l'exécution d'actions critiques ou irréversibles",
            "L'humain surveille en temps réel chaque pensée de l'agent et peut l'interrompre",
            "L'agent demande à l'humain de valider chaque appel d'outil, même pour les lectures",
          ],
          correctIndex: 1,
          explanation: "Human-in-the-loop signifie qu'une confirmation humaine est exigée pour les actions à risque (supprimer, envoyer, payer). Pour les actions non destructives (lire, chercher), l'agent peut opérer en autonomie totale. L'objectif est d'équilibrer autonomie (efficacité) et supervision (sécurité).",
        },
        {
          id: 'm5-l4-q3',
          question: "Quel mécanisme protège contre l'explosion de coûts d'un agent qui boucle ?",
          options: [
            "Le mode streaming qui arrête l'agent dès que le budget de tokens est dépassé",
            "Un compteur de tokens total avec une limite maximale configurée, qui interrompt la boucle si dépassée",
            "L'API Anthropic coupe automatiquement les connexions trop longues",
            "Le retry avec backoff qui ralentit progressivement les appels",
          ],
          correctIndex: 1,
          explanation: "Chaque réponse de l'API inclut response.usage.input_tokens + response.usage.output_tokens. En cumulant ces valeurs à chaque itération et en comparant à un budget maximum (ex: 50 000 tokens ≈ 0.15$ avec Sonnet), tu peux interrompre proprement une boucle runaway avant qu'elle ne coûte trop cher.",
        },
        {
          id: 'm5-l4-q4',
          question: "Pour quelle catégorie d'actions un agent doit-il avoir une autonomie totale sans confirmation ?",
          options: [
            "Les suppressions de fichiers, car elles peuvent toujours être annulées via git",
            "Les envois d'emails, car le destinataire peut ignorer le message",
            "Les actions de lecture et d'exploration (lire des fichiers, faire des recherches)",
            "Toutes les actions — la confirmation humaine ralentit trop les agents",
          ],
          correctIndex: 2,
          explanation: "Les actions en lecture seule (lire un fichier, chercher sur le web, interroger une DB en SELECT) sont non-destructives — elles ne modifient rien, donc une erreur est sans conséquence. L'autonomie totale sur ces actions est saine et efficace. Les actions d'écriture, de suppression ou d'envoi vers l'extérieur nécessitent des guardrails proportionnels à leur irréversibilité.",
        },
      ],

      exercise: {
        id: 'm5-l4-ex',
        title: "Ajouter des guardrails à un agent existant",
        context: "Tu vas analyser et renforcer la sécurité d'un agent de développement.",
        instructions: `Voici un agent qui peut modifier des fichiers, exécuter des commandes shell, et envoyer des notifications Slack. Il n'a actuellement aucun guardrail.

**Problèmes à identifier et corriger :**

Utilise le panel "Tester avec Claude" avec ce prompt :

\`\`\`
Voici un agent de développement sans guardrails :

async function devAgent(task: string) {
  const messages = [{ role: 'user', content: task }];
  while (true) {
    const response = await claude.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 8192,
      tools: [editFileTool, runCommandTool, slackNotifyTool],
      messages,
    });
    if (response.stop_reason === 'end_turn') return;
    // exécute les outils...
  }
}

Identifie les 5 risques principaux et réécris la fonction avec les guardrails appropriés.
\`\`\`

Analyse la réponse et note quels guardrails correspondent aux situations réelles que tu as vécues en développement.`,
        hint: "Les 5 risques évidents : (1) boucle infinie sans limite d'itérations, (2) claude-opus-4-8 en boucle = coût explosif sans budget tokens, (3) slackNotifyTool peut spammer sans confirmation, (4) runCommandTool peut exécuter rm -rf sans validation, (5) aucun timeout = l'agent peut attendre indéfiniment un outil qui ne répond pas.",
        proposedSolution: `**Agent avec guardrails complets :**
\`\`\`typescript
async function devAgent(task: string, options = {
  maxSteps: 15,
  tokenBudget: 30000,
  timeoutMs: 15000,
}) {
  const messages: Anthropic.MessageParam[] = [{ role: 'user', content: task }];
  let steps = 0;
  let totalTokens = 0;

  // Outils destructifs nécessitant confirmation
  const requiresConfirmation = ['run_command', 'slack_notify'];
  // Commandes shell interdites
  const blockedCommands = ['rm -rf', 'DROP TABLE', 'format c:'];

  while (steps < options.maxSteps) {
    steps++;

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001', // Haiku pour le coût
      max_tokens: 2048,
      tools: [editFileTool, runCommandTool, slackNotifyTool],
      messages,
    });

    totalTokens += response.usage.input_tokens + response.usage.output_tokens;

    if (totalTokens > options.tokenBudget) {
      return \`Budget de tokens atteint (\${totalTokens}). Tâche interrompue.\`;
    }

    if (response.stop_reason === 'end_turn') return extractText(response);

    messages.push({ role: 'assistant', content: response.content });
    const results: Anthropic.ToolResultBlockParam[] = [];

    for (const block of response.content) {
      if (block.type !== 'tool_use') continue;

      const input = block.input as Record<string, string>;

      // Bloquer les commandes dangereuses
      if (block.name === 'run_command') {
        const cmd = input.command ?? '';
        if (blockedCommands.some(b => cmd.includes(b))) {
          results.push({ type: 'tool_result', tool_use_id: block.id,
            content: 'Commande bloquée par politique de sécurité.', is_error: true });
          continue;
        }
      }

      // Confirmation pour les outils critiques
      if (requiresConfirmation.includes(block.name)) {
        const ok = await askConfirmation(\`Autoriser \${block.name} ?\`);
        if (!ok) {
          results.push({ type: 'tool_result', tool_use_id: block.id,
            content: 'Action refusée par l\\'utilisateur.', is_error: true });
          continue;
        }
      }

      try {
        const result = await Promise.race([
          executeTool(block.name, input),
          new Promise((_, r) => setTimeout(() => r(new Error('Timeout')), options.timeoutMs)),
        ]);
        results.push({ type: 'tool_result', tool_use_id: block.id, content: JSON.stringify(result) });
      } catch (err) {
        results.push({ type: 'tool_result', tool_use_id: block.id,
          content: String(err), is_error: true });
      }
    }

    messages.push({ role: 'user', content: results });
  }

  return 'Limite d\\'étapes atteinte.';
}
\`\`\``,
      },
    },
  ],
};
