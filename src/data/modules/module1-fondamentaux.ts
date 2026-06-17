import type { Module } from '@/types';

export const module1: Module = {
  id: 'module-1',
  order: 1,
  title: 'Fondamentaux IA & LLM',
  description: "Comprendre ce que sont les LLM, comment ils fonctionnent, et ce qu'on peut en faire concrètement.",
  icon: 'Brain',
  color: '#818CF8',
  lessons: [
    // ─── Leçon 1 ────────────────────────────────────────────────────────────
    {
      id: 'module-1-lesson-1',
      order: 1,
      title: "Qu'est-ce qu'un LLM ?",
      description: "Comprendre ce que sont les grands modèles de langage, comment ils génèrent du texte, et pourquoi ils hallucinent.",
      estimatedMinutes: 20,
      theory: `# Qu'est-ce qu'un LLM ?

## La définition sans jargon

Un **Large Language Model** (grand modèle de langage) est un programme entraîné sur des centaines de milliards de mots pour faire une seule chose : **prédire quel token vient ensuite**.

C'est tout. Mais cette opération répétée des milliers de fois, sur un modèle avec des centaines de milliards de paramètres, produit quelque chose d'extraordinaire : un système capable de raisonner, coder, analyser, traduire, et créer.

---

## Comment un LLM génère du texte

Le processus est séquentiel et probabiliste :

\`\`\`
Entrée : "La capitale de la France est"
         ↓
Le modèle calcule une distribution de probabilité
sur tous les tokens possibles :
  "Paris"    → 94.2%
  "Lyon"     → 2.1%
  "une"      → 1.8%
  ...
         ↓
Il échantillonne selon cette distribution (→ "Paris")
         ↓
Il recommence avec "La capitale de la France est Paris"
         ↓
Nouveau token : " ." → 78%, " !" → 12% ...
\`\`\`

Chaque token est choisi en tenant compte de **tout le contexte précédent**. C'est ce qu'on appelle le mécanisme d'**attention**.

---

## Ce que cache cette simplicité

La prédiction de token semble triviale. En réalité, pour prédire correctement "Paris" dans "La capitale de la France est ___", le modèle doit avoir internalisé :
- Que la France est un pays
- Que les pays ont des capitales
- Que la capitale de la France s'appelle Paris
- La grammaire française
- Le contexte de la phrase

Reproduire ce comportement sur des milliards de phrases crée une **compression du savoir humain** dans les paramètres du modèle.

---

## Ce qu'un LLM fait bien — et mal

| Fait bien ✅ | Fait mal ❌ |
|-------------|-----------|
| Rédiger, reformuler, synthétiser | Calculer avec précision |
| Expliquer des concepts | Accéder à Internet (sans outil) |
| Coder dans la plupart des langages | Se souvenir entre les sessions |
| Analyser des documents | Connaître les événements récents |
| Traduire avec nuance | Être certain de la vérité |

---

## Les hallucinations : pourquoi les LLM inventent

Les LLM ne "savent" pas ce qu'ils savent. Ils génèrent le token le plus probable. Si une question ressemble à quelque chose de leur entraînement, ils répondent avec confiance — même si la réponse est fausse.

**Exemple type :** Demandez la biographie d'un auteur peu connu. Le modèle va souvent inventer des titres de livres cohérents avec le style de l'auteur, une date de naissance plausible, des prix fictifs mais crédibles.

**Ce n'est pas un bug, c'est une conséquence de l'architecture.** Un LLM n'a pas de mécanisme de doute interne — il génère ce qui semble probable.

**Stratégies pour réduire les hallucinations :**
- Fournir les faits dans le contexte (RAG)
- Demander au modèle de citer ses sources
- Utiliser des modèles avec search grounding
- Demander explicitement : *"Si tu n'es pas sûr, dis-le"*

---

## L'architecture Transformer en 30 secondes

En 2017, Google publie *"Attention is All You Need"* et change l'histoire de l'IA.

La clé : le mécanisme d'**attention** permet au modèle de peser l'importance de chaque mot du contexte pour prédire le prochain. Quand tu écris *"La banque est fermée le dimanche. Je ne peux pas retirer d'argent."*, l'attention associe "retirer d'argent" à "banque" (établissement financier) et non à "banque de sable".

Les LLM modernes sont des **Transformers** avec des dizaines de couches d'attention empilées.

---

## Du texte vers les actions

Les LLM modernes ne génèrent pas que du texte. Ils peuvent :
- **Appeler des fonctions** (tool use) → un LLM qui cherche sur Internet
- **Raisonner en chaîne** (chain-of-thought) → un LLM qui décompose un problème
- **S'orchestrer entre eux** (multi-agent) → plusieurs LLM collaborent

Ce module pose les bases. Dans les modules suivants, tu vas apprendre à exploiter ces capacités.`,

      quiz: [
        {
          id: 'm1-l1-q1',
          question: "Quelle est l'opération fondamentale qu'effectue un LLM pour générer du texte ?",
          options: [
            "Il recherche dans une base de données la réponse la plus pertinente",
            "Il prédit le token suivant en calculant des probabilités sur tout le contexte précédent",
            "Il copie des fragments de textes vus pendant l'entraînement",
            "Il applique des règles grammaticales définies par des linguistes",
          ],
          correctIndex: 1,
          explanation: "Un LLM génère du texte token par token, en calculant à chaque étape une distribution de probabilité sur tous les tokens possibles, en tenant compte de tout le contexte précédent (le mécanisme d'attention). Il ne cherche pas dans une base de données et ne copie pas de textes — il génère en interpolant les patterns appris.",
        },
        {
          id: 'm1-l1-q2',
          question: "Pourquoi les LLM produisent-ils des hallucinations (informations inventées) ?",
          options: [
            "Parce qu'ils sont programmés pour être créatifs et peuvent inventer",
            "Parce qu'ils n'ont pas accès à Internet pour vérifier les faits",
            "Parce qu'ils génèrent ce qui semble statistiquement probable, sans mécanisme de doute interne",
            "Parce que leur base de données d'entraînement contient des erreurs",
          ],
          correctIndex: 2,
          explanation: "Les hallucinations sont une conséquence directe du fonctionnement probabiliste des LLM. Le modèle génère toujours le token le plus probable, même quand il devrait dire 'je ne sais pas'. Il n'a pas de mécanisme interne pour distinguer ce qu'il sait avec certitude de ce qu'il infère.",
        },
        {
          id: 'm1-l1-q3',
          question: "Qu'est-ce que le mécanisme d'attention dans un Transformer ?",
          options: [
            "Un système qui force le modèle à relire plusieurs fois le texte",
            "Un mécanisme qui permet au modèle de peser l'importance de chaque token du contexte par rapport aux autres",
            "Un filtre qui élimine les tokens inappropriés avant la génération",
            "Une couche du réseau neuronal qui mémorise les faits importants",
          ],
          correctIndex: 1,
          explanation: "L'attention est le mécanisme clé des Transformers : pour chaque token à prédire, il calcule un score d'importance pour chaque token du contexte. Cela permet par exemple d'associer 'retirer' à 'banque financière' plutôt qu'à 'banque de sable' selon le contexte. C'est ce qui donne aux LLM leur capacité à comprendre les relations longue distance dans le texte.",
        },
        {
          id: 'm1-l1-q4',
          question: "Pour quelle tâche vaut-il mieux NE PAS faire confiance à un LLM sans vérification ?",
          options: [
            "Reformuler un email professionnel en changeant le ton",
            "Résumer un long document en bullet points",
            "Vérifier l'exactitude de faits spécifiques sur une personnalité peu connue",
            "Traduire un texte du français vers l'espagnol",
          ],
          correctIndex: 2,
          explanation: "Les LLM hallucinent particulièrement sur les personnalités ou sujets peu représentés dans leur entraînement : biographies, dates, titres d'œuvres. Pour les faits vérifiables et spécifiques, toujours croiser avec une source externe. La reformulation, le résumé et la traduction sont des tâches où les LLM excellent sans grand risque d'hallucination sur les faits.",
        },
      ],

      exercise: {
        id: 'm1-l1-ex',
        title: "Explorer les limites et les forces d'un LLM",
        context: "Tu vas mener une investigation directement avec Claude pour comprendre concrètement ce qu'un LLM sait faire — et ce qu'il fait mal.",
        instructions: `Cette leçon est abstraite sans expérimentation. Utilise le panel "Tester avec Claude" ci-dessous pour mener ces 3 tests :

**Test 1 — Vérifier une hallucination potentielle**
Demande à Claude la biographie détaillée d'un auteur très peu connu (invente un nom si besoin, par exemple "Jean-Pierre Mérand, romancier belge des années 1940"). Observe si Claude invente une biographie convaincante ou avoue son ignorance.

**Test 2 — Tester les limites mathématiques**
Pose ce calcul : *"Combien font 17 x 23 x 7 - 842 + 156 ?"* Vérifie le résultat toi-même. Les LLM font des erreurs de calcul sur des opérations moyennement complexes.

**Test 3 — Tester la compréhension contextuelle**
Écris : *"La souris est tombée par terre. J'ai eu peur. Pourtant ce n'est qu'un appareil."* Demande à Claude d'expliquer le double sens. Observe comment l'attention contextuelle fonctionne.

Documente tes observations : qu'est-ce que Claude a réussi ? Raté ? Surpris ?`,
        hint: "Pour le Test 1, si Claude génère une biographie détaillée d'une personne inventée avec des dates précises et des titres de livres, c'est une hallucination. Si Claude dit 'Je ne connais pas cet auteur', c'est le comportement correct.",
        proposedSolution: `**Résultats typiques observés :**

**Test 1 — Hallucination :**
Les LLM récents (Claude, GPT-4) sont de mieux en mieux calibrés et diront souvent "Je n'ai pas d'information sur cette personne." Mais si vous pressez ou si la requête semble légitime, ils peuvent inventer. C'est pourquoi demander "Es-tu certain ?" peut révéler une hésitation.

**Test 2 — Calcul :**
17 × 23 × 7 - 842 + 156 = 17 × 161 - 842 + 156 = 2737 - 842 + 156 = **2051**
Les LLM font souvent des erreurs sur ce type de calcul. La bonne pratique : demander à Claude d'utiliser l'outil calculatrice ou de faire le calcul étape par étape (chain-of-thought).

**Test 3 — Contexte :**
"Souris" peut être un rongeur (→ peur) ou une souris d'ordinateur (→ appareil). Claude utilise "pourtant ce n'est qu'un appareil" pour désambiguïser rétroactivement le sens de "souris". C'est le mécanisme d'attention en action : l'information tardive dans le contexte influence l'interprétation de l'information antérieure.

**Leçon clé :** Les LLM excellent à la compréhension contextuelle et à la génération fluide, mais échouent sur la précision factuelle et arithmétique. Adaptez vos usages en conséquence.`,
      },
    },

    // ─── Leçon 2 ────────────────────────────────────────────────────────────
    {
      id: 'module-1-lesson-2',
      order: 2,
      title: 'Tokens, contexte et fenêtre de contexte',
      description: "Comprendre ce que sont les tokens, comment fonctionne la fenêtre de contexte, et les implications pratiques pour vos usages.",
      estimatedMinutes: 18,
      theory: `# Tokens, contexte et fenêtre de contexte

## Un token n'est pas un mot

La première chose à comprendre : les LLM ne traitent pas des mots, ils traitent des **tokens** — des fragments de texte qui peuvent être des mots entiers, des syllabes, ou même des caractères individuels.

\`\`\`
"bonjour"   → 1 token
"antidisestablishmentarianism" → plusieurs tokens
" !"        → 1 token (espace inclus)
"🚀"        → 2-3 tokens (les emojis coûtent cher !)
"printf"    → 1 token (mot courant en code)
\`\`\`

**La règle approximative :**
- 1 token ≈ 4 caractères en anglais
- 1 token ≈ 3 caractères en français (le français est légèrement plus coûteux)
- 100 tokens ≈ 75 mots

---

## La fenêtre de contexte

La **fenêtre de contexte** (context window) est la quantité maximale de texte qu'un LLM peut "voir" en une seule fois — entrée + sortie combinées.

**Évolution des fenêtres de contexte :**

| Modèle | Fenêtre |
|--------|---------|
| GPT-3 (2020) | 4 096 tokens |
| Claude 2 (2023) | 100 000 tokens |
| Claude 3.5 Sonnet (2024) | 200 000 tokens |
| Gemini 1.5 Pro | 1 000 000 tokens |

**En pratique :**
- 4 000 tokens ≈ 3 000 mots ≈ quelques pages
- 100 000 tokens ≈ 75 000 mots ≈ un roman entier
- 200 000 tokens ≈ un long rapport de 500 pages

---

## Ce qui entre dans la fenêtre de contexte

Tout ce que le modèle "voit" compte dans la fenêtre :

\`\`\`
┌─────────────────────────────────────────────┐
│  System prompt (instructions permanentes)   │  ← compte
│  Historique de conversation                 │  ← compte
│  Documents fournis                          │  ← compte
│  Ta question actuelle                       │  ← compte
│  La réponse du modèle                       │  ← compte
└─────────────────────────────────────────────┘
         TOTAL ≤ fenêtre de contexte max
\`\`\`

---

## Les implications pratiques

### 1. Le modèle oublie ce qui dépasse la fenêtre

Si ta conversation dépasse la limite, les messages anciens sont **coupés**. Le modèle ne peut plus y faire référence. C'est pourquoi les conversations très longues peuvent perdre le fil.

### 2. La position dans le contexte compte

Les recherches montrent que les LLM retiennent mieux les informations placées **au début** et **à la fin** du contexte. Ce phénomène s'appelle *"lost in the middle"* — les informations au milieu d'un long contexte sont moins bien utilisées.

**Stratégie :** Mets les instructions importantes en début de prompt, et rappelle les points clés à la fin.

### 3. Plus de tokens = plus cher

Les API de LLM facturent à la fois les tokens **entrants** (input) et **sortants** (output). Les tokens de sortie coûtent généralement 2-5x plus cher que les tokens d'entrée.

\`\`\`
Claude Sonnet 4.6 (exemple de tarif) :
  Input  : ~3$/million de tokens
  Output : ~15$/million de tokens
\`\`\`

Pour un usage professionnel, optimiser la longueur des prompts peut réduire significativement les coûts.

### 4. La fenêtre ne remplace pas la mémoire

Un LLM avec 200 000 tokens de contexte peut analyser tout un roman, mais **il ne se souvient de rien entre deux conversations distinctes**. Chaque nouvelle conversation repart de zéro.

Pour une mémoire persistante, il faut :
- Stocker les informations en base de données
- Les réinjecter dans le contexte à chaque conversation (RAG)
- Utiliser des outils comme les "Memory" de certains assistants

---

## Compter ses tokens avant d'envoyer

Avant d'envoyer un document long à un LLM, tu peux estimer le nombre de tokens :
- **Règle rapide :** nb de caractères ÷ 4 (anglais) ou ÷ 3 (français)
- **Précis :** utiliser la bibliothèque \`tiktoken\` (OpenAI) ou le tokenizer officiel

\`\`\`python
# Exemple avec tiktoken
import tiktoken
enc = tiktoken.get_encoding("cl100k_base")
tokens = enc.encode("Votre texte ici")
print(f"{len(tokens)} tokens")
\`\`\`

---

## À retenir

> La fenêtre de contexte est votre espace de travail. Plus elle est grande, plus vous pouvez y mettre d'information. Mais ce n'est pas de la mémoire — tout disparaît entre les sessions.`,

      quiz: [
        {
          id: 'm1-l2-q1',
          question: "Quelle affirmation sur les tokens est correcte ?",
          options: [
            "1 token = exactement 1 mot dans toutes les langues",
            "Les tokens sont des fragments de texte qui peuvent être des mots entiers, des syllabes ou des caractères",
            "Les tokens n'existent que pour le code, pas pour le texte naturel",
            "Le nombre de tokens est toujours identique au nombre de caractères",
          ],
          correctIndex: 1,
          explanation: "Un token est un fragment de texte défini par le tokenizer du modèle. Ce peut être un mot entier ('bonjour'), une partie de mot ('anti' + 'dis' + 'establish'...), un symbole, ou même un espace. En anglais, 1 token ≈ 4 caractères. Le français et les caractères spéciaux (emojis, caractères asiatiques) utilisent généralement plus de tokens par unité de sens.",
        },
        {
          id: 'm1-l2-q2',
          question: "Que se passe-t-il quand une conversation dépasse la fenêtre de contexte maximale ?",
          options: [
            "Le modèle compresse automatiquement les anciens messages pour en réduire la taille",
            "La conversation s'arrête et l'utilisateur doit recommencer depuis le début",
            "Les messages les plus anciens sont coupés et le modèle ne peut plus y faire référence",
            "Le modèle passe automatiquement sur un modèle plus puissant avec une fenêtre plus grande",
          ],
          correctIndex: 2,
          explanation: "Quand le total de tokens (system prompt + historique + question + réponse) dépasse la fenêtre maximale, les messages les plus anciens sont tronqués. Le modèle ne peut plus accéder à ces informations, ce qui peut causer une perte de cohérence dans les longues conversations. C'est pourquoi il faut gérer activement le contexte dans les applications en production.",
        },
        {
          id: 'm1-l2-q3',
          question: "Qu'est-ce que le phénomène 'lost in the middle' ?",
          options: [
            "Les LLM oublient les premiers tokens générés quand la réponse est très longue",
            "Les informations placées au milieu d'un long contexte sont moins bien retenues par le modèle",
            "Le modèle perd le fil narratif dans les histoires de plus de 10 000 tokens",
            "Les tokens du milieu d'un mot sont traités différemment des tokens de début/fin",
          ],
          correctIndex: 1,
          explanation: "'Lost in the middle' est un phénomène documenté par des recherches (Liu et al., 2023) : les LLM utilisent mieux les informations placées au début et à la fin du contexte. Ce qui est au milieu d'un long document peut être sous-utilisé. Stratégie pratique : placer les instructions importantes au début du prompt, et rappeler les points clés à la fin.",
        },
        {
          id: 'm1-l2-q4',
          question: "Un document de 50 000 mots en français représente approximativement combien de tokens ?",
          options: [
            "Environ 12 500 tokens",
            "Environ 50 000 tokens",
            "Environ 67 000 tokens",
            "Environ 200 000 tokens",
          ],
          correctIndex: 2,
          explanation: "En français, 1 token ≈ 3 caractères, et un mot français moyen fait ~5-6 caractères. Donc 50 000 mots × ~5,5 caractères ÷ 3 caractères/token ≈ 92 000 tokens. L'option 67 000 est la plus proche (on peut aussi estimer : 1 mot ≈ 1,3-1,5 token en français). En anglais ce serait ~65 000 tokens (1 mot ≈ 1,3 token). Le français est légèrement plus coûteux en tokens.",
        },
      ],

      exercise: {
        id: 'm1-l2-ex',
        title: "Manipuler le contexte pour améliorer une réponse",
        context: "Tu dois analyser un contrat fictif de 3 pages (ci-dessous) avec Claude. L'objectif est d'expérimenter l'impact de la position des instructions dans le contexte.",
        instructions: `**Contrat fictif (contexte du test) :**
*"CONTRAT DE PRESTATION DE SERVICES — Entre la société TECHCO SAS (ci-après 'le Client') et M. Jean Dupont (ci-après 'le Prestataire'). Article 1 — Objet : développement d'une application web. Article 2 — Durée : 6 mois à compter du 1er janvier 2025. Article 3 — Rémunération : 5 000€ HT par mois. Article 4 — Propriété intellectuelle : toutes les créations appartiennent au Client dès la livraison. Article 5 — Confidentialité : le Prestataire s'engage à ne pas divulguer les informations confidentielles pendant 2 ans. Article 6 — Résiliation : préavis de 30 jours par lettre recommandée. Article 7 — Pénalités : 10% du montant mensuel par semaine de retard, plafonnées à 50% du montant total."*

**Test A :** Écris un prompt où les instructions d'analyse viennent APRÈS le contrat :
\`\`\`
[contrat complet]
Analyse les clauses risquées pour le Prestataire.
\`\`\`

**Test B :** Écris un prompt où les instructions viennent AVANT le contrat :
\`\`\`
Tu es un avocat spécialisé. Analyse ce contrat pour identifier :
1. Les clauses risquées pour le Prestataire
2. Les points à renégocier en priorité
3. Un score de risque global /10

Voici le contrat :
[contrat complet]
\`\`\`

Compare la qualité et la structure des deux réponses.`,
        hint: "Le Test B devrait donner une réponse mieux structurée car les instructions précises encadrent la lecture du contrat. Avec le Test A, le modèle a déjà 'lu' le contrat avant de savoir ce que tu veux — il peut manquer de structure.",
        proposedSolution: `**Résultat attendu du Test A :**
Analyse générale du contrat, probablement chronologique (article par article), sans structure imposée. Le modèle décide lui-même quoi mettre en avant.

**Résultat attendu du Test B :**
Réponse structurée en 3 sections exactes (clauses risquées / points à renégocier / score). Le modèle sait dès le départ quel cadre appliquer à sa lecture.

**Les clauses vraiment risquées dans ce contrat :**

🔴 **Article 4 — PI totale dès livraison** : Le prestataire cède tous ses droits immédiatement. Il ne peut pas réutiliser ses méthodes/composants dans d'autres projets. À renégocier : garder une licence d'utilisation sur les composants génériques.

🔴 **Article 7 — Pénalités 10%/semaine** : Sans plafond hebdomadaire, une semaine de retard = 10% du mensuel (500€). À renégocier : pénalités uniquement après mise en demeure, et plafond hebdomadaire plus raisonnable.

🟡 **Article 5 — Confidentialité 2 ans** : Standard, mais à vérifier que la définition de "confidentiel" est précise.

**Score de risque :** 7/10 pour le Prestataire — contrat client-centrique typique.

**Leçon clé :** Les instructions AVANT le contexte donnent un cadre de lecture. Les instructions APRÈS sont traitées comme une question sur un texte déjà "digéré" sans contexte d'objectif.`,
      },
    },

    // ─── Leçon 3 ────────────────────────────────────────────────────────────
    {
      id: 'module-1-lesson-3',
      order: 3,
      title: 'Temperature, top-p et paramètres de génération',
      description: "Contrôler le comportement d'un LLM avec les paramètres clés : temperature, top-p, top-k, et max_tokens.",
      estimatedMinutes: 16,
      theory: `# Temperature, top-p et paramètres de génération

## Rappel : le LLM choisit parmi des probabilités

À chaque token généré, le modèle calcule une distribution de probabilité sur l'ensemble de son vocabulaire. Les paramètres de génération modifient **comment il choisit dans cette distribution**.

\`\`\`
Distribution brute pour le token suivant de "La nuit est ___" :
  "tombée"  → 34%
  "noire"   → 28%
  "calme"   → 18%
  "froide"  → 12%
  "belle"   → 5%
  autres... → 3%
\`\`\`

Les paramètres vont modifier cette distribution avant l'échantillonnage.

---

## Temperature : le curseur créativité/déterminisme

La **temperature** (entre 0 et 2, défaut souvent 1) est le paramètre le plus important.

### Temperature = 0 (déterministe)
Le modèle choisit toujours le token le plus probable. Résultat : prévisible, reproductible, conservateur.

\`\`\`
"La nuit est tombée" → toujours la même réponse
\`\`\`

**Quand utiliser :** extraction de données, code, analyses factuelles, JSON structuré.

### Temperature = 0.7 (équilibre)
Le modèle mélange prévisibilité et variété. Valeur par défaut pour la plupart des cas.

**Quand utiliser :** emails, rédaction, conversations.

### Temperature = 1+ (créatif)
La distribution est aplatie — les tokens moins probables ont plus de chance d'être choisis. Résultats plus surprenants, parfois incohérents.

**Quand utiliser :** brainstorming, créativité, génération de noms, poésie.

\`\`\`
Effet de la temperature sur la distribution :

Temperature 0.3 :  tombée=72%, noire=18%, calme=7%, ...
Temperature 1.0 :  tombée=34%, noire=28%, calme=18%, ...
Temperature 1.5 :  tombée=22%, noire=20%, calme=18%, froide=17%, ...
\`\`\`

---

## Top-p (nucleus sampling) : filtrer la longue traîne

**Top-p** (entre 0 et 1) filtre le vocabulaire en gardant uniquement les tokens dont les probabilités cumulées atteignent p%.

\`\`\`
Top-p = 0.9 :
  Garde les tokens jusqu'à couvrir 90% de la probabilité cumulée
  → Élimine les tokens très improbables (la "longue traîne")
  → Évite les tokens aberrants tout en gardant de la variété
\`\`\`

**Différence avec temperature :**
- Temperature redistribue toutes les probabilités
- Top-p coupe les tokens trop improbables avant l'échantillonnage

**Conseil :** En pratique, modifier temperature OU top-p, rarement les deux simultanément. Temperature est plus intuitif à ajuster.

---

## Top-k : limiter le nombre de candidats

**Top-k** ne garde que les k tokens les plus probables. Moins utilisé que top-p.

\`\`\`
Top-k = 50 : seuls les 50 tokens les plus probables sont candidats
\`\`\`

---

## Max tokens : contrôler la longueur de sortie

**max_tokens** (ou max_output_tokens) limite la longueur de la réponse. Utile pour :
- Maîtriser les coûts
- Forcer des réponses concises
- Éviter que le modèle "déborde"

\`\`\`python
# Exemple d'appel API Claude
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=500,        # réponse max 500 tokens
    temperature=0.3,       # déterministe pour une analyse
    system="Tu es un analyste factuel.",
    messages=[{"role": "user", "content": "Analyse ce texte..."}]
)
\`\`\`

---

## Guide de sélection rapide

| Tâche | Temperature | Top-p | Notes |
|-------|------------|-------|-------|
| Extraction JSON | 0 - 0.2 | 0.9 | Reproductibilité |
| Code | 0.2 - 0.4 | 0.9 | Précision sans rigidité |
| Rédaction pro | 0.5 - 0.8 | 0.95 | Équilibre |
| Brainstorming | 0.9 - 1.2 | 0.95 | Variété |
| Poésie/fiction | 1.0 - 1.5 | 0.98 | Créativité max |

---

## Le paramètre caché : le seed

Certaines API supportent un paramètre **seed** pour fixer l'aléatoire. Avec le même seed + même température, vous obtenez exactement la même réponse. Utile pour les tests et le débogage.`,

      quiz: [
        {
          id: 'm1-l3-q1',
          question: "Tu veux extraire des données structurées en JSON depuis un document. Quelle temperature choisir ?",
          options: [
            "Temperature = 1.5 pour maximiser la créativité du format",
            "Temperature = 0 ou proche de 0 pour un résultat déterministe et reproductible",
            "Temperature = 1.0 qui est toujours la valeur optimale",
            "La temperature n'a aucun impact sur les sorties JSON",
          ],
          correctIndex: 1,
          explanation: "Pour l'extraction de données structurées, on veut du déterminisme : toujours le même format, pas de variété créative. Une temperature proche de 0 force le modèle à choisir les tokens les plus probables à chaque étape, ce qui produit des résultats consistants. C'est le cas d'usage classique pour les pipelines de traitement automatique.",
        },
        {
          id: 'm1-l3-q2',
          question: "Quelle est la différence principale entre temperature et top-p ?",
          options: [
            "La temperature s'applique à l'input, top-p s'applique à l'output",
            "La temperature redistribue toutes les probabilités ; top-p coupe les tokens trop improbables avant l'échantillonnage",
            "Top-p est disponible uniquement avec les modèles OpenAI, temperature avec Claude",
            "Il n'y a aucune différence, ce sont deux noms pour le même paramètre",
          ],
          correctIndex: 1,
          explanation: "Temperature et top-p sont deux mécanismes distincts. Temperature reshaping : multiplie les logits par 1/T avant le softmax, redistribuant toutes les probabilités. Top-p filtering : calcule la probabilité cumulée et coupe les tokens qui dépassent le seuil p. Les deux modifient l'espace de sélection, mais par des mécanismes différents. En pratique, ajuster l'un ou l'autre (pas les deux) suffit.",
        },
        {
          id: 'm1-l3-q3',
          question: "Tu génères 1000 emails marketing différents avec Claude via l'API. Quelle combinaison de paramètres maximise la variété tout en gardant des emails cohérents ?",
          options: [
            "Temperature = 0, top-p = 1.0",
            "Temperature = 1.2, top-p = 0.95",
            "Temperature = 0.1, top-p = 0.5",
            "Temperature = 2.0, top-p = 0.1",
          ],
          correctIndex: 1,
          explanation: "Temperature = 1.2 introduit de la variété créative (plus que le défaut de 1.0). Top-p = 0.95 garde 95% de la masse probabilistique, éliminant les tokens vraiment aberrants. Cette combinaison produit des textes variés et créatifs tout en restant cohérents. Temperature = 0 donnerait des emails identiques. Temperature = 2.0 + top-p = 0.1 serait trop aléatoire (incohérent).",
        },
        {
          id: 'm1-l3-q4',
          question: "Le paramètre max_tokens contrôle :",
          options: [
            "Le nombre maximum de tokens dans le prompt d'entrée",
            "La taille maximale de la fenêtre de contexte totale",
            "Le nombre maximum de tokens générés dans la réponse",
            "La temperature maximale autorisée pour ce modèle",
          ],
          correctIndex: 2,
          explanation: "max_tokens (ou max_output_tokens selon l'API) limite la longueur de la RÉPONSE générée, pas du contexte total. Si le modèle atteint cette limite avant de finir naturellement, la réponse sera tronquée. Utile pour maîtriser les coûts (les tokens output coûtent 2-5x plus que les input) et forcer la concision.",
        },
      ],

      exercise: {
        id: 'm1-l3-ex',
        title: "L'impact de la temperature sur la créativité",
        context: "Tu vas générer le même contenu avec des temperatures différentes pour observer l'impact concret sur les sorties d'un LLM.",
        instructions: `Utilise le panel "Tester avec Claude" pour envoyer **exactement le même prompt** 3 fois, en variant la temperature dans les instructions système.

**Prompt à tester (le même pour les 3 tests) :**
\`\`\`
Génère un slogan de 10 mots maximum pour une startup qui vend
des formations en IA pour les professionnels non-techniques.
\`\`\`

**Test 1 — Temperature faible** : ajoute au début du prompt :
\`\`\`
[INSTRUCTION: sois conservateur et choisis les formulations les plus classiques]
\`\`\`

**Test 2 — Temperature équilibrée** : envoie le prompt brut sans instructions supplémentaires.

**Test 3 — Temperature créative** : ajoute au début du prompt :
\`\`\`
[INSTRUCTION: sois surprenant, brise les conventions, propose quelque chose d'inattendu]
\`\`\`

Note les 3 slogans obtenus et analyse les différences en termes de :
- Vocabulaire utilisé
- Originalité perçue
- Clarté du message`,
        hint: "Même sans changer la temperature via l'API directement, tu peux influencer le comportement créatif du modèle via les instructions du prompt. C'est une technique utile quand on n'a pas accès aux paramètres de l'API.",
        proposedSolution: `**Exemple de résultats typiques :**

**Test 1 (conservateur) :** "L'IA accessible à tous les professionnels" — clair, attendu, sans surprise. Vocabulaire standard, message direct.

**Test 2 (équilibré) :** "Maîtrisez l'IA sans être développeur" — bon équilibre entre clarté et accroche. Adresse directement la douleur du cible.

**Test 3 (créatif) :** "L'IA ne vous attend pas. Apprenez maintenant." — plus audacieux, joue sur l'urgence, vocabulaire moins conventionnel.

**Analyse :**
- La temperature faible converge vers le "centre de masse" du style d'écriture marketing conventionnel
- La temperature créative s'éloigne de ce centre et explore des formulations moins représentées dans les données d'entraînement
- Ni l'un ni l'autre n'est meilleur — ça dépend du contexte (B2B conservateur vs startup disruptive)

**Technique avancée :** En production avec l'API, vous pouvez aussi demander au modèle de générer N variantes dans un seul appel, puis sélectionner la meilleure — c'est plus économique que N appels séparés.`,
      },
    },

    // ─── Leçon 4 ────────────────────────────────────────────────────────────
    {
      id: 'module-1-lesson-4',
      order: 4,
      title: 'Les modèles du marché : Claude, GPT, Gemini',
      description: "Panorama des principaux LLM en 2025, leurs forces respectives, et comment choisir le bon modèle pour chaque usage.",
      estimatedMinutes: 22,
      theory: `# Les modèles du marché en 2025

## Les 3 grands fournisseurs

Le marché des LLM est dominé par 3 acteurs avec des philosophies très différentes :

| Fournisseur | Modèles phares | Point fort |
|-------------|---------------|------------|
| **Anthropic** | Claude 4 (Haiku / Sonnet / Opus) | Sécurité, raisonnement, instructions complexes |
| **OpenAI** | GPT-4o, o1, o3 | Écosystème, polyvalence, outils |
| **Google** | Gemini 1.5 Pro/Flash, Gemini 2.0 | Contexte très long, multimodal, intégration Google |

Et des acteurs open-source importants :
- **Meta** — Llama 3.x (utilisable en local ou auto-hébergé)
- **Mistral** — Mixtral, Mistral Large (open-source européen)

---

## Claude (Anthropic) — La famille 4.x

Claude est conçu avec une priorité explicite sur la **sécurité** et le **suivit d'instructions complexes**.

### La gamme en 2025
\`\`\`
claude-haiku-4-5       → Rapide, économique
                          Idéal : tâches simples, production à volume

claude-sonnet-4-6      → L'équilibre performances/coût
                          Idéal : 90% des cas professionnels

claude-opus-4-8        → Le plus capable
                          Idéal : tâches complexes, raisonnement profond
\`\`\`

### Forces distinctives de Claude
- **Suivit d'instructions long** : Claude excelle à suivre des instructions complexes et nuancées sans "dériver"
- **Refus calibrés** : moins de faux positifs sur le contenu inoffensif
- **Raisonnement structuré** : particulièrement fort pour l'analyse et la logique
- **XML tags** : Claude est entraîné à utiliser les balises XML pour structurer les prompts
- **Long context** : 200K tokens avec bonne rétention

---

## GPT-4o et la famille OpenAI

OpenAI reste la référence en termes d'**écosystème** et de **polyvalence**.

### La gamme
\`\`\`
gpt-4o-mini    → Économique et rapide
gpt-4o         → Multimodal (vision + audio + texte), très polyvalent
o1 / o3        → Modèles de raisonnement (thinking models)
                  Prennent plus de temps mais résolvent des problèmes complexes
\`\`\`

### Forces distinctives de GPT
- **Écosystème mature** : ChatGPT, Plugins, GPT Store, API bien documentée
- **Multimodal natif** : gpt-4o analyse images, génère du son, traite des fichiers
- **Models o1/o3** : reasoning models qui "pensent avant de répondre"
- **Code Interpreter** : exécution de code Python en sandbox

---

## Gemini (Google)

Google mise sur l'**intégration avec l'écosystème Google** et les **contextes très longs**.

### La gamme
\`\`\`
Gemini 1.5 Flash   → Rapide et économique
Gemini 1.5 Pro     → 1 million de tokens de contexte (!), multimodal
Gemini 2.0 Flash   → Thinking natif, outils intégrés
\`\`\`

### Forces distinctives
- **Contexte 1M tokens** : analyser des heures de vidéo ou des corpus entiers
- **Intégration Google** : Google Docs, Search, Workspace
- **Multimodal natif** : texte + image + audio + vidéo

---

## Open source : Llama et Mistral

Pour ceux qui veulent **contrôle total** ou **fonctionnement local** :

\`\`\`
Meta Llama 3.3 (70B)  → Comparable à GPT-3.5, gratuit, local
Mistral Large 2       → Forte sur le français et le code
Mixtral 8x7B          → Architecture MoE efficace
\`\`\`

**Avantages open source :**
- Zéro coût API (seulement l'infrastructure)
- Données restent sur vos serveurs (conformité RGPD)
- Customisation fine (fine-tuning)

**Inconvénients :**
- Moins performant que les meilleurs modèles propriétaires
- Infrastructure à gérer (GPU nécessaires pour les grands modèles)

---

## Comment choisir : l'arbre de décision

\`\`\`
Votre tâche nécessite-t-elle des instructions très complexes ?
  → OUI : Claude Sonnet ou Opus

Avez-vous besoin d'analyser des images ou de la vidéo ?
  → OUI : GPT-4o ou Gemini 1.5 Pro

Avez-vous un contexte > 100K tokens ?
  → OUI : Gemini 1.5 Pro (1M tokens) ou Claude (200K)

C'est une tâche de production à fort volume et faible coût ?
  → Claude Haiku, GPT-4o mini, ou Gemini Flash

Confidentialité des données ou contraintes RGPD strictes ?
  → Llama 3 ou Mistral en auto-hébergement

Cas général sans contrainte spécifique ?
  → Claude Sonnet 4.6 (excellent équilibre)
\`\`\`

---

## Comparer les prix (ordre de grandeur 2025)

| Modèle | Input ($/M tokens) | Output ($/M tokens) |
|--------|-------------------|-------------------|
| Claude Haiku | ~0.25 | ~1.25 |
| Claude Sonnet | ~3 | ~15 |
| GPT-4o mini | ~0.15 | ~0.60 |
| GPT-4o | ~2.5 | ~10 |
| Gemini Flash | ~0.075 | ~0.30 |
| Llama 3.3 (auto-hébergé) | coût infra | coût infra |

*Les prix évoluent régulièrement — vérifier les tarifs officiels.*

---

## Le vrai critère : testez vous-même

Les benchmarks ne remplacent pas le test sur votre cas d'usage. La même tâche peut donner des résultats très différents selon le modèle. La bonne pratique : **tester les 2-3 modèles candidats sur 20 exemples représentatifs** et évaluer manuellement.`,

      quiz: [
        {
          id: 'm1-l4-q1',
          question: "Tu construis un pipeline de production qui classe automatiquement 100 000 emails clients par jour. Quel modèle est le plus adapté ?",
          options: [
            "Claude Opus — le plus puissant pour ne rater aucune nuance",
            "GPT-4o — le plus polyvalent du marché",
            "Claude Haiku ou GPT-4o mini — rapides et économiques pour du volume",
            "Llama 3.3 local — pas de coût API sur 100 000 requêtes",
          ],
          correctIndex: 2,
          explanation: "Pour un pipeline de volume (100 000 requêtes/jour), les modèles premium (Opus, GPT-4o) coûteraient prohibitif. Les modèles économiques (Haiku, GPT-4o mini) sont suffisants pour une classification simple. Llama local est aussi viable mais nécessite une infrastructure GPU. Le choix entre Haiku et GPT-4o mini se fait sur les tests de qualité spécifiques à votre cas.",
        },
        {
          id: 'm1-l4-q2',
          question: "Quel modèle est le plus adapté pour analyser une heure de réunion en vidéo + son + les documents partagés pendant la réunion ?",
          options: [
            "Claude Sonnet — excellent pour suivre des instructions complexes",
            "Gemini 1.5 Pro — contexte 1M tokens et multimodal natif (vidéo + audio + docs)",
            "GPT-4o avec Code Interpreter pour traiter les fichiers",
            "Llama 3.3 — open source donc meilleures garanties de confidentialité",
          ],
          correctIndex: 1,
          explanation: "Gemini 1.5 Pro est conçu pour exactement ce cas : contexte 1 million de tokens (une heure de vidéo = énorme quantité de tokens) et multimodal natif permettant de traiter simultanément vidéo, audio et documents. C'est une tâche qui dépasse les capacités de Claude (200K) et pour laquelle GPT-4o n'a pas de support vidéo natif équivalent.",
        },
        {
          id: 'm1-l4-q3',
          question: "Une entreprise pharmaceutique veut utiliser un LLM pour analyser des données de patients. Quelle est la considération la plus importante ?",
          options: [
            "Choisir le modèle avec le plus de paramètres pour maximiser la précision",
            "Utiliser uniquement des modèles open-source en auto-hébergement pour garder les données sur leurs serveurs",
            "Choisir le modèle le moins cher pour maximiser le volume traitable",
            "Utiliser GPT-4o car OpenAI a le plus de certifications de sécurité",
          ],
          correctIndex: 1,
          explanation: "Pour des données médicales sous RGPD et réglementations pharmaceutiques, les données ne peuvent pas quitter l'infrastructure contrôlée. L'auto-hébergement (Llama, Mistral) est la seule option qui garantit que les données ne transitent pas par des API tierces. Les APIs cloud (Claude, GPT-4, Gemini) envoient les données aux serveurs de ces fournisseurs, même si ceux-ci ont des contrats de confidentialité.",
        },
        {
          id: 'm1-l4-q4',
          question: "Quelle affirmation sur les 'modèles de raisonnement' comme o1/o3 d'OpenAI est correcte ?",
          options: [
            "Ils sont plus rapides que GPT-4o car ils utilisent un algorithme optimisé",
            "Ils génèrent une chaîne de réflexion interne avant de répondre, ce qui les rend plus performants sur les problèmes complexes mais plus lents",
            "Ils peuvent uniquement traiter des problèmes mathématiques et de code",
            "Ils ont une fenêtre de contexte plus grande que les autres modèles",
          ],
          correctIndex: 1,
          explanation: "Les modèles de raisonnement (o1, o3, et équivalents 'thinking' chez Anthropic/Google) génèrent une chaîne de réflexion interne (chain-of-thought) avant de produire leur réponse finale. Cela les rend nettement plus performants sur les problèmes complexes (maths, logique, code complexe) mais plus lents et plus coûteux. Pour les tâches simples, un modèle standard est plus efficace.",
        },
      ],

      exercise: {
        id: 'm1-l4-ex',
        title: "Choisir le bon modèle pour 5 cas d'usage réels",
        context: "Tu es consultant IA pour une entreprise de taille moyenne. On te présente 5 cas d'usage et tu dois recommander le modèle (famille + variante) le plus adapté avec une justification.",
        instructions: `Pour chacun des 5 cas ci-dessous, utilise le panel "Tester avec Claude" pour demander à Claude lui-même de recommander le meilleur modèle. Puis compare avec ton propre raisonnement.

**Cas 1 :** Un cabinet d'avocats veut analyser des contrats confidentiels de 200+ pages et extraire les clauses clés.

**Cas 2 :** Une chaîne de restaurants veut classifier automatiquement 50 000 avis clients/mois en 5 catégories.

**Cas 3 :** Une startup EdTech veut créer un tuteur IA qui répond aux questions des étudiants en temps réel (latence critique < 1 seconde).

**Cas 4 :** Un département R&D veut générer 50 variations créatives de leur slogan pour un brainstorming.

**Cas 5 :** Un développeur solo veut un assistant de code qui aide à debugger et écrire des tests unitaires.

**Prompt à utiliser :**
\`\`\`
Pour chacun de ces 5 cas d'usage, recommande le modèle LLM optimal
(famille + variante) avec une justification de 2-3 lignes incluant
les critères : coût, performance, latence, confidentialité.

[colle les 5 cas ici]
\`\`\``,
        hint: "Pensez à ces critères pour chaque cas : volume de requêtes (→ coût), sensibilité des données (→ confidentialité), complexité de la tâche (→ performance), exigence temps réel (→ latence), longueur du contexte (→ fenêtre).",
        proposedSolution: `**Recommandations optimales :**

**Cas 1 — Analyse de contrats confidentiels 200 pages**
→ **Llama 3.3 70B ou Mistral Large en auto-hébergement**
Raison : données confidentielles → ne pas envoyer à des API tierces. 200 pages = ~150-200K tokens → vérifier la fenêtre du modèle choisi. Si confidentialité absolue non requise : Claude Sonnet (200K, excellent sur les instructions complexes).

**Cas 2 — Classification 50 000 avis clients/mois**
→ **Claude Haiku 4.5 ou GPT-4o mini**
Raison : tâche simple (classification 5 catégories), volume élevé → minimiser le coût par token. Ces modèles sont 10-20x moins chers que leurs versions premium.

**Cas 3 — Tuteur IA temps réel < 1 seconde**
→ **Gemini Flash ou Claude Haiku**
Raison : latence critique → modèles optimisés pour la vitesse. Gemini 2.0 Flash a d'excellentes performances temps réel.

**Cas 4 — 50 slogans créatifs**
→ **Claude Sonnet ou GPT-4o avec temperature élevée (1.2)**
Raison : créativité > précision. 50 variantes dans un seul appel est possible. Sonnet a un excellent niveau de créativité langagière.

**Cas 5 — Assistant de code solo**
→ **Claude Sonnet 4.6 (via Claude Code ou API)**
Raison : Claude excelle sur le code et le debugging, et son interface Claude Code (que tu utilises en ce moment !) est optimisée pour cet usage.`,
      },
    },
  ],
};
