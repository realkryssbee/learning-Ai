import type { Module } from '@/types';

export const module2: Module = {
  id: 'module-2',
  order: 2,
  title: 'Prompt Engineering',
  description: 'Maîtriser l\'art de communiquer avec les LLM : structure, techniques avancées et patterns professionnels.',
  icon: 'Pencil',
  color: '#FF6B47',
  lessons: [
    // ─── Leçon 1 ────────────────────────────────────────────────────────────
    {
      id: 'module-2-lesson-1',
      order: 1,
      title: 'Anatomie d\'un bon prompt',
      description: 'Les 4 composantes essentielles de tout prompt efficace : contexte, tâche, format, contraintes.',
      estimatedMinutes: 20,
      theory: `# Anatomie d'un bon prompt

Un prompt mal construit donne une réponse médiocre — pas parce que le modèle est "stupide", mais parce qu'il manque d'information pour inférer ce que vous voulez vraiment. Un LLM comble les lacunes avec des suppositions, et ces suppositions ne correspondent pas toujours à vos attentes.

La bonne nouvelle : il existe une structure reproductible. On l'appelle le **modèle CFTC** (Contexte, Format, Tâche, Contraintes).

---

## Les 4 composantes du modèle CFTC

### 1. Contexte — *Qui parle, dans quelle situation ?*

Le contexte positionne la conversation. Il répond à : qui es-tu, à qui tu parles, dans quel environnement.

**Prompt sans contexte :**
\`\`\`
Explique-moi le machine learning.
\`\`\`

**Prompt avec contexte :**
\`\`\`
Je suis développeur web avec 5 ans d'expérience en JavaScript,
aucune formation en mathématiques avancées. J'envisage d'intégrer
un modèle de classification dans mon app.
Explique-moi le machine learning.
\`\`\`

Le même modèle, avec contexte, va calibrer le niveau technique, éviter les formules mathématiques abstraites, et faire le lien avec le développement web.

---

### 2. Tâche — *Que doit exactement faire le modèle ?*

La tâche contient un **verbe d'action précis** et un **objet clair**. C'est le cœur du prompt.

| Vague ❌ | Précis ✅ |
|----------|----------|
| "Parle-moi de React" | "Compare React et Vue.js pour un projet avec une équipe de 3 devs juniors" |
| "Aide-moi avec mon CV" | "Réécris ce bullet point CV pour qu'il soit orienté résultats et mesurable" |
| "Email" | "Rédige un email de relance 7 jours après un entretien sans réponse" |

Verbes utiles : *Rédige, Analyse, Compare, Liste, Explique, Reformule, Transforme, Identifie, Synthétise, Évalue.*

---

### 3. Format — *Comment doit être structurée la réponse ?*

Spécifier le format évite de reformater manuellement chaque réponse.

**Exemples de formats :**
- \`Réponds en bullet points, 5 maximum\`
- \`Structure ta réponse en : Problème / Solution / Exemple\`
- \`Renvoie uniquement du JSON valide, pas de texte autour\`
- \`Réponds en moins de 3 phrases\`
- \`Utilise des headers Markdown\`

---

### 4. Contraintes — *Ce qu'il faut éviter ou respecter*

Les contraintes filtrent les réponses indésirables et cadrent le périmètre.

**Exemples :**
- \`N'utilise pas de jargon technique au-delà du niveau lycée\`
- \`Ne propose pas de solution payante\`
- \`Reste dans le contexte Python, pas d'autres langages\`
- \`Maximum 150 mots\`

---

## Avant / Après : voir la différence

**Prompt amateur :**
\`\`\`
Écris-moi un post LinkedIn sur l'IA.
\`\`\`

**Prompt professionnel :**
\`\`\`
CONTEXTE : Je suis CTO d'une startup B2B SaaS de 15 personnes.
Mon audience LinkedIn est composée de fondateurs tech et investisseurs.

TÂCHE : Rédige un post LinkedIn sur notre expérience d'intégration
de Claude dans notre workflow de support client.

FORMAT :
- 3 paragraphes courts (hook, expérience, leçon)
- Termine par une question pour engager les commentaires
- Ton : direct, concret, sans hype

CONTRAINTES :
- Pas de listes à puces
- Pas de hashtags en excès (2 maximum)
- Évite les formules creuses comme "game-changer" ou "révolutionnaire"
- 200-250 mots maximum
\`\`\`

La différence est radicale. Le deuxième prompt peut être utilisé directement en production.

---

## À retenir

> Un bon prompt réduit l'espace des réponses possibles jusqu'à ce que la réponse cible soit l'option la plus probable.

Chaque composante CFTC sert à éliminer des mauvaises interprétations. Plus vous êtes précis, moins le modèle improvise.`,

      quiz: [
        {
          id: 'q1-1',
          question: 'Pourquoi un LLM donne-t-il une réponse médiocre face à un prompt vague ?',
          options: [
            'Parce que le modèle n\'a pas assez de paramètres pour comprendre des questions simples',
            'Parce qu\'il comble les lacunes avec des suppositions qui peuvent ne pas correspondre à vos attentes',
            'Parce que les modèles sont entraînés à donner des réponses courtes par défaut',
            'Parce que les prompts vagues déclenchent un mode de sécurité restrictif',
          ],
          correctIndex: 1,
          explanation: 'Un LLM n\'est pas "stupide" — il est très capable. Mais face à un manque d\'information, il fait des suppositions plausibles basées sur son entraînement. Ces suppositions peuvent être très différentes de ce que vous attendez. Un prompt précis réduit cet espace d\'ambiguïté.',
        },
        {
          id: 'q1-2',
          question: 'Quelle est la composante CFTC qui contient obligatoirement un verbe d\'action ?',
          options: [
            'Le Contexte',
            'Le Format',
            'La Tâche',
            'Les Contraintes',
          ],
          correctIndex: 2,
          explanation: 'La Tâche est le cœur du prompt : elle doit contenir un verbe d\'action précis (Rédige, Analyse, Compare, Liste…) et un objet clair. C\'est elle qui indique au modèle ce qu\'il doit concrètement produire.',
        },
        {
          id: 'q1-3',
          question: 'Vous voulez que le modèle génère une réponse structurée en JSON sans texte superflu. Dans quelle composante CFTC placez-vous cette instruction ?',
          options: [
            'Contexte — car cela définit l\'environnement technique',
            'Tâche — car c\'est une action à réaliser',
            'Format — car cela décrit la structure attendue de la réponse',
            'Contraintes — car c\'est une restriction',
          ],
          correctIndex: 2,
          explanation: 'Le Format décrit comment doit être structurée la réponse : JSON, Markdown, bullet points, nombre de mots, etc. "Renvoie uniquement du JSON valide" est une instruction de format, pas une contrainte thématique.',
        },
        {
          id: 'q1-4',
          question: 'Parmi ces prompts, lequel applique correctement le modèle CFTC ?',
          options: [
            '"Explique-moi Docker."',
            '"Je suis dev junior en Python. Explique-moi Docker en le comparant à un environnement virtuel Python que je connais déjà. Utilise une analogie simple, 3 paragraphes max, sans mentionner Kubernetes."',
            '"Docker c\'est quoi ? Sois précis et détaillé."',
            '"En tant qu\'expert, parle-moi de Docker de manière exhaustive."',
          ],
          correctIndex: 1,
          explanation: 'La deuxième option coche toutes les cases : Contexte (dev junior Python), Tâche (expliquer Docker en le comparant à virtualenv), Format (3 paragraphes, analogie), Contraintes (pas de Kubernetes). Les autres manquent de plusieurs composantes essentielles.',
        },
      ],

      exercise: {
        id: 'module-2-lesson-1-ex',
        title: 'Construire un prompt CFTC complet',
        context: 'Vous êtes chef de projet dans une agence digitale. Vous devez envoyer un email à un client difficile pour lui annoncer un retard de 2 semaines sur son projet e-commerce, sans perdre la relation commerciale.',
        instructions: `Construisez un prompt CFTC complet pour demander à un LLM de rédiger cet email délicat.

Votre prompt doit explicitement inclure les 4 composantes :
- **Contexte** : qui vous êtes, qui est votre client, la relation commerciale
- **Tâche** : verbe d'action précis + objet clair
- **Format** : structure de l'email, longueur, ton
- **Contraintes** : ce qu'il ne faut surtout pas faire dans cet email

Testez ensuite votre prompt dans Claude.ai ou tout autre LLM disponible.`,
        hint: 'Pensez aux contraintes spécifiques d\'un email de mauvaise nouvelle : ne pas minimiser le problème, ne pas promettre ce qu\'on ne peut pas tenir, proposer une solution de compensation...',
        proposedSolution: `Voici un exemple de prompt CFTC bien construit :

\`\`\`
CONTEXTE :
Je suis chef de projet dans une agence web de 8 personnes. Notre client,
Boutique Élégance, est une PME retail qui nous a confié le refonte de son
site e-commerce (budget : 18 000€). C'est notre 2ème projet ensemble —
la relation est bonne mais le client est très orienté délais. Le retard
est dû à un problème technique imprévu avec leur système de paiement legacy.

TÂCHE :
Rédige un email professionnel pour annoncer à Mme Dupont (directrice de
Boutique Élégance) un retard de 2 semaines sur la livraison prévue le
15 juillet, initialement dûe à notre scope agreement.

FORMAT :
- Objet de l'email accrocheur et transparent
- Structure : contexte / cause du retard / nouvelle date / mesures compensatoires / prochaine étape
- Ton : professionnel, direct, sans faux-semblants mais rassurant
- Longueur : 200-250 mots

CONTRAINTES :
- Ne pas utiliser de jargon technique incompréhensible pour un non-dev
- Ne pas minimiser ou noyer le message principal dans du texte de remplissage
- Ne pas promettre une date sans marge de sécurité
- Inclure une compensation concrète (exemple : une fonctionnalité bonus ou une réunion de suivi gratuite)
- Ne pas rejeter la faute sur des facteurs externes sans assumer la responsabilité
\`\`\``,
      },
    },

    // ─── Leçon 2 ────────────────────────────────────────────────────────────
    {
      id: 'module-2-lesson-2',
      order: 2,
      title: 'Few-shot prompting et exemples',
      description: 'Guider le modèle avec des exemples : quand et comment utiliser le few-shot prompting efficacement.',
      estimatedMinutes: 18,
      theory: `# Few-shot prompting et exemples

## Le problème avec les instructions abstraites

Imaginez que vous embauchez quelqu'un et que vous lui décrivez verbalement son travail pendant 10 minutes. Puis vous lui montrez 3 exemples concrets de travail bien fait. La deuxième approche est presque toujours plus efficace.

Les LLM fonctionnent de la même manière. Les exemples ancrent le comportement attendu de façon bien plus précise que des instructions abstraites.

---

## Zero-shot, One-shot, Few-shot

Ces termes décrivent le nombre d'exemples inclus dans le prompt :

| Technique | Exemples | Quand l'utiliser |
|-----------|----------|-----------------|
| **Zero-shot** | 0 | Tâches simples et univoques |
| **One-shot** | 1 | Quand le format est clair avec un seul exemple |
| **Few-shot** | 2-8 | Tâches avec nuances, style ou format spécifique |

---

## La structure d'un exemple few-shot

Chaque exemple suit le pattern **Input → Output** :

\`\`\`
[EXEMPLES]

Input: "Ce produit est arrivé cassé et le service client ne répond pas."
Output: NÉGATIF | Problème produit + SAV | Priorité haute

Input: "Livraison ultra rapide, emballage soigné, produit conforme !"
Output: POSITIF | Livraison + Qualité | Priorité basse

Input: "Ça marche mais je m'attendais à quelque chose de plus robuste."
Output: MIXTE | Qualité produit | Priorité moyenne

[FIN EXEMPLES]

Maintenant classe cet avis :
Input: "J'ai dû attendre 3 semaines, mais le produit est exactement ce que je voulais."
Output:
\`\`\`

Le modèle comprend immédiatement le format attendu (3 champs séparés par \`|\`), les catégories possibles (POSITIF/NÉGATIF/MIXTE), et la logique de priorité.

---

## Pourquoi les exemples fonctionnent

Quand un LLM voit des exemples, il réalise quelque chose de clé qu'une instruction seule ne peut pas transmettre : **la distribution des cas réels**.

Un exemple concret : si vous demandez "Classe le sentiment de ces avis", le modèle peut interpréter "neutre" différemment selon son entraînement. Avec des exemples, vous lui montrez *votre* définition du neutre, *votre* niveau de granularité.

---

## Règles pour de bons exemples few-shot

**1. Couvrir les cas-limites**
N'incluez pas que les cas faciles. Montrez les cas ambigus avec votre décision.

**2. Être cohérent**
Si un exemple utilise un format, tous les exemples doivent utiliser exactement le même format.

**3. Ordre stratégique**
Placez les exemples du plus simple au plus complexe. Le dernier exemple avant la question est souvent le plus mémorisé.

**4. Qualité > Quantité**
3 bons exemples valent mieux que 8 exemples bâclés.

**5. Utiliser des exemples représentatifs**
Choisissez des exemples qui couvrent la distribution réelle de vos données.

---

## Few-shot vs Fine-tuning

Une question fréquente : quand passer au fine-tuning (entraîner le modèle) plutôt que d'utiliser des exemples in-context ?

- **Few-shot** suffit pour la plupart des tâches. Rapide, flexible, pas de coût d'entraînement.
- **Fine-tuning** devient utile quand vous avez des centaines d'exemples et que la tâche est très spécifique à votre domaine.

Pour 90% des cas en entreprise, le few-shot avec une bonne sélection d'exemples est la bonne approche.

---

## Template pratique

\`\`\`
Tu es [rôle]. Ta tâche est [description de la tâche].

Voici des exemples :

---
Exemple 1:
[INPUT 1]
[OUTPUT 1]

---
Exemple 2:
[INPUT 2]
[OUTPUT 2]

---
Exemple 3:
[INPUT 3]
[OUTPUT 3]

---
Maintenant applique cela à :
[INPUT RÉEL]
\`\`\``,

      quiz: [
        {
          id: 'q2-1',
          question: 'Quelle est la principale différence entre le zero-shot et le few-shot prompting ?',
          options: [
            'Le few-shot utilise des modèles plus puissants que le zero-shot',
            'Le zero-shot ne contient aucun exemple, le few-shot en contient plusieurs pour guider le modèle',
            'Le zero-shot est plus précis car il force le modèle à raisonner sans aide',
            'Le few-shot ne fonctionne qu\'avec des tâches de classification',
          ],
          correctIndex: 1,
          explanation: 'Zero-shot = aucun exemple dans le prompt (le modèle doit inférer seul). Few-shot = plusieurs exemples inclus qui montrent le pattern attendu. Le choix dépend de la complexité et de la spécificité de la tâche, pas de la puissance du modèle.',
        },
        {
          id: 'q2-2',
          question: 'Vous devez classer des emails clients dans 5 catégories métier complexes avec des nuances importantes. Quelle approche est la plus appropriée ?',
          options: [
            'Zero-shot avec une longue description de chaque catégorie',
            'One-shot avec un exemple par catégorie décrit dans les instructions',
            'Few-shot avec 2-3 exemples représentatifs par catégorie incluant des cas-limites',
            'Il vaut mieux passer directement au fine-tuning dans ce cas',
          ],
          correctIndex: 2,
          explanation: 'Avec 5 catégories complexes et des nuances importantes, le few-shot avec des exemples représentatifs (incluant des cas-limites) est optimal. Chaque catégorie bénéficie d\'exemples concrets. Le fine-tuning n\'est justifié qu\'avec des centaines d\'exemples et une tâche très spécifique au domaine.',
        },
        {
          id: 'q2-3',
          question: 'Parmi ces règles pour les exemples few-shot, laquelle est FAUSSE ?',
          options: [
            'Privilégier la qualité sur la quantité (3 bons exemples > 8 médiocres)',
            'Inclure uniquement des cas faciles et représentatifs pour ne pas confondre le modèle',
            'Maintenir un format strictement cohérent entre tous les exemples',
            'Couvrir les cas-limites et ambigus avec vos décisions explicites',
          ],
          correctIndex: 1,
          explanation: 'C\'est la règle INCORRECTE. On doit au contraire inclure les cas-limites et ambigus — ce sont eux qui montrent au modèle votre logique de décision dans les situations difficiles. N\'inclure que les cas faciles laisse le modèle sans guide pour les situations complexes.',
        },
        {
          id: 'q2-4',
          question: 'Pourquoi est-il important que les exemples few-shot couvrent la "distribution des cas réels" ?',
          options: [
            'Pour augmenter la taille du contexte et améliorer les performances générales',
            'Pour que le modèle comprenne votre définition spécifique des catégories et des cas-limites',
            'Pour compenser le fait que les LLM ne peuvent pas apprendre à partir d\'instructions textuelles',
            'Uniquement pour des raisons de performance et de vitesse de traitement',
          ],
          correctIndex: 1,
          explanation: 'Les exemples transmettent votre définition spécifique des catégories — pas la définition générique du modèle. Si "neutre" pour vous signifie "avis avec du positif ET du négatif", vos exemples le montrent. C\'est cette précision de définition que les instructions abstraites ne peuvent pas transmettre aussi efficacement.',
        },
      ],

      exercise: {
        id: 'module-2-lesson-2-ex',
        title: 'Transformer un zero-shot en few-shot',
        context: 'Vous gérez un service client e-commerce. Vous voulez utiliser un LLM pour tagger automatiquement les messages entrants avec leur niveau d\'urgence (URGENT / NORMAL / FAIBLE) et la catégorie du problème.',
        instructions: `**Étape 1 — Zero-shot (à écrire)**
Rédigez d'abord un prompt zero-shot simple pour cette tâche de classification.

**Étape 2 — Few-shot (à construire)**
Transformez ce prompt en few-shot en ajoutant 4 exemples représentatifs incluant :
- Un cas clairement urgent (problème de paiement ou commande bloquée)
- Un cas normal (question sur une commande en cours)
- Un cas de faible urgence (question générale sur un produit)
- Un cas-limite ambigu de votre choix

**Étape 3 — Test**
Testez les deux prompts avec ce message :
*"Bonjour, j'ai commandé il y a 3 semaines et je n'ai toujours pas reçu ma commande. J'ai essayé de vous appeler deux fois sans réponse. C'est pour un cadeau d'anniversaire prévu demain."*

Observez si la version few-shot donne un résultat plus précis et dans le bon format.`,
        hint: 'Pour vos exemples, pensez à varier les formulations (client en colère vs calme, texte court vs long) pour montrer que le format de sortie reste stable quelles que soient les variations d\'entrée.',
        proposedSolution: `**Prompt Zero-shot :**
\`\`\`
Tu es un assistant de service client e-commerce.
Classe ce message avec un niveau d'urgence (URGENT/NORMAL/FAIBLE)
et une catégorie de problème.

Message : [MESSAGE DU CLIENT]
\`\`\`

---

**Prompt Few-shot :**
\`\`\`
Tu es un assistant de service client e-commerce. Classe chaque message
avec un niveau d'urgence et une catégorie de problème.

Format de sortie : URGENCE | CATÉGORIE | Résumé en 5 mots max

---
Message: "Mon paiement a été débité 2 fois !! Je veux un remboursement immédiat !!"
Classification: URGENT | Problème paiement | Double débit à rembourser

---
Message: "Bonjour, savez-vous quand mon colis #FR4892 sera livré ?"
Classification: NORMAL | Suivi commande | Demande de tracking

---
Message: "Est-ce que la veste existe aussi en taille XL ?"
Classification: FAIBLE | Info produit | Disponibilité taille

---
Message: "Ça fait 3 jours que j'essaie de vous contacter. Ma commande est marquée livrée mais je n'ai rien reçu. J'habite seul et personne n'a pu réceptionner à ma place."
Classification: URGENT | Colis non reçu | Livraison manquée à résoudre

---
Message: "Bonjour, j'ai commandé il y a 3 semaines et je n'ai toujours pas reçu ma commande. J'ai essayé de vous appeler deux fois sans réponse. C'est pour un cadeau d'anniversaire prévu demain."
Classification:
\`\`\`

**Résultat attendu avec le few-shot :**
\`URGENT | Colis non reçu | Cadeau urgent non livré\`

La version few-shot donne le bon format et identifie correctement l'urgence (cadeau demain + absence de réponse SAV = escalade nécessaire).`,
      },
    },

    // ─── Leçon 3 ────────────────────────────────────────────────────────────
    {
      id: 'module-2-lesson-3',
      order: 3,
      title: 'Chain-of-Thought et raisonnement étape par étape',
      description: 'Forcer le modèle à raisonner explicitement pour résoudre des problèmes complexes avec fiabilité.',
      estimatedMinutes: 22,
      theory: `# Chain-of-Thought et raisonnement étape par étape

## Le problème : les LLM sautent aux conclusions

Les LLM sont entraînés à prédire le token suivant le plus probable. Sur des tâches simples, ça fonctionne. Mais sur des problèmes complexes — raisonnement multi-étapes, maths, logique, analyse — cette approche "directe" génère des erreurs.

**Exemple problématique :**
\`\`\`
Prompt : Un fermier a 17 moutons. Tous meurent sauf 9.
Combien en reste-t-il ?
Réponse directe : 9  ← correct, mais souvent le modèle calcule 17-9=8 en autopilote
\`\`\`

La solution : forcer le modèle à **montrer son raisonnement** avant de donner la réponse finale.

---

## Qu'est-ce que le Chain-of-Thought (CoT) ?

Le Chain-of-Thought est une technique qui demande au modèle de décomposer son raisonnement en étapes explicites avant de conclure. En montrant "son travail", le modèle commet beaucoup moins d'erreurs de raisonnement.

---

## Zero-shot CoT : "Pense étape par étape"

La forme la plus simple : ajouter une phrase magique à la fin de votre question.

\`\`\`
Question : Si une équipe de 5 développeurs peut livrer un projet en 10 semaines,
combien de temps faudrait-il à 8 développeurs pour livrer le même projet ?

Pense à ça étape par étape.
\`\`\`

**Avec cette instruction, le modèle va :**
1. Calculer le volume total de travail (5 × 10 = 50 semaines-développeur)
2. Diviser par la nouvelle équipe (50 ÷ 8 = 6,25 semaines)
3. Nuancer : il mentionnera probablement la loi de Brooks (ajouter des développeurs n'est pas linéaire)

Sans l'instruction CoT, il aurait risqué de simplement diviser 10 ÷ 8 = 1,25 semaine — une erreur grossière.

---

## Few-shot CoT : montrer le raisonnement dans les exemples

Pour les tâches très complexes, combiner few-shot et CoT : inclure des exemples où vous montrez le raisonnement étape par étape.

\`\`\`
Analyse cette proposition commerciale et recommande d'accepter ou refuser.

---
EXEMPLE :
Proposition : "Nous offrons 40% de réduction si vous payez 12 mois d'avance."
Raisonnement :
- Économie : 40% sur 12 mois = significatif
- Risque : engagement long sur un fournisseur non testé
- Flux de trésorerie : immobiliser du cash sur 12 mois a un coût d'opportunité
- Clause de sortie : à vérifier dans le contrat
Décision : REFUSER en l'état — demander une période de test 3 mois d'abord,
puis négocier l'engagement annuel avec garantie de remboursement partiel.

---
Maintenant analyse :
Proposition : "Abonnement mensuel à 200€, sans engagement, résiliable à tout moment."
Raisonnement :
\`\`\`

---

## Quand utiliser le CoT ?

| Utiliser CoT ✅ | Ne pas utiliser CoT ❌ |
|----------------|----------------------|
| Problèmes mathématiques | Questions factuelles simples |
| Raisonnement logique multi-étapes | Génération de texte créatif |
| Analyse de décisions complexes | Classification simple |
| Debugging de code | Résumé de texte |
| Évaluation d'arguments | Traduction |

Le CoT a un coût : plus de tokens générés = réponse plus longue et plus lente. À utiliser de façon ciblée.

---

## Variations avancées

### "Let's think step by step" vs instructions structurées

\`\`\`
# Version courte (zero-shot CoT)
Pense étape par étape.
Réfléchis avant de répondre.

# Version structurée (pour plus de contrôle)
Avant de donner ta réponse finale :
1. Identifie les données clés du problème
2. Liste les hypothèses que tu fais
3. Déroule le raisonnement
4. Donne ta conclusion et ton niveau de confiance
\`\`\`

### Self-consistency : demander plusieurs raisonnements

Pour les questions critiques, demandez au modèle de raisonner de 3 façons différentes, puis de synthétiser. Si les 3 chemins convergent vers la même réponse, vous pouvez avoir plus confiance.

---

## Exemple concret : analyse de contrat

**Sans CoT :**
\`\`\`
Ce contrat est-il risqué ?
[contrat de 2 pages]

→ Réponse : "Ce contrat présente des risques modérés..."  ← vague et peu fiable
\`\`\`

**Avec CoT structuré :**
\`\`\`
Analyse ce contrat pour identifier les risques.

Structure ton analyse ainsi :
1. Identifie les clauses sensibles (responsabilité, résiliation, pénalités)
2. Pour chaque clause, évalue : favorable / neutre / défavorable pour notre partie
3. Identifie les éléments manquants qu'on devrait demander
4. Donne une recommandation finale : signer / négocier / refuser

[contrat]
\`\`\`

La réponse sera infiniment plus exploitable.`,

      quiz: [
        {
          id: 'q3-1',
          question: 'Pourquoi les LLM font-ils des erreurs sur des problèmes de raisonnement complexes sans Chain-of-Thought ?',
          options: [
            'Parce que les LLM ne peuvent pas effectuer de calculs mathématiques',
            'Parce qu\'ils sont entraînés à prédire le token suivant et tendent à sauter directement à la conclusion la plus probable',
            'Parce que le Chain-of-Thought améliore la mémoire du modèle entre les sessions',
            'Parce que les problèmes complexes nécessitent un accès à Internet que les LLM n\'ont pas',
          ],
          correctIndex: 1,
          explanation: 'Les LLM génèrent du texte token par token en prédisant le suivant. Sur des problèmes complexes, la "réponse directe la plus probable" peut être incorrecte si elle saute des étapes intermédiaires cruciales. Le CoT force le modèle à dérouler les étapes, ce qui le rend plus fiable.',
        },
        {
          id: 'q3-2',
          question: 'Quelle est la différence principale entre le zero-shot CoT et le few-shot CoT ?',
          options: [
            'Le zero-shot CoT est plus précis car le modèle raisonne sans contrainte d\'exemples',
            'Le zero-shot CoT utilise une instruction simple ("Pense étape par étape"), le few-shot CoT montre des exemples de raisonnements complets',
            'Le few-shot CoT ne fonctionne qu\'avec des problèmes mathématiques',
            'Il n\'y a pas de différence pratique, les deux termes sont interchangeables',
          ],
          correctIndex: 1,
          explanation: 'Zero-shot CoT = ajouter "Pense étape par étape" (ou similaire) sans exemples. Few-shot CoT = inclure des exemples où le raisonnement intermédiaire est montré explicitement avant la conclusion. Le few-shot CoT est plus puissant pour les tâches très complexes.',
        },
        {
          id: 'q3-3',
          question: 'Dans quel cas vaut-il mieux NE PAS utiliser le Chain-of-Thought ?',
          options: [
            'Pour analyser un contrat juridique complexe',
            'Pour résoudre un problème d\'optimisation logistique',
            'Pour traduire une phrase du français vers l\'anglais',
            'Pour évaluer les risques d\'une décision business',
          ],
          correctIndex: 2,
          explanation: 'La traduction est une tâche simple et directe — le CoT génèrerait des tokens inutiles sans améliorer la qualité. Le CoT est utile pour les tâches qui nécessitent un raisonnement multi-étapes : logique, maths, analyse de décisions, debugging.',
        },
        {
          id: 'q3-4',
          question: 'Quelle instruction illustre le mieux un zero-shot Chain-of-Thought bien formulé ?',
          options: [
            '"Réponds à ma question de façon détaillée et complète."',
            '"Donne-moi la réponse la plus précise possible."',
            '"Avant de répondre, identifie les données clés, liste tes hypothèses, puis déroule ton raisonnement étape par étape avant de conclure."',
            '"Sois logique et structuré dans ta réponse."',
          ],
          correctIndex: 2,
          explanation: 'Un bon zero-shot CoT donne une structure explicite au raisonnement : identifier les données, poser les hypothèses, dérouler les étapes. Les autres options demandent vaguement de la précision ou de la structure sans guider le processus de raisonnement lui-même.',
        },
      ],

      exercise: {
        id: 'module-2-lesson-3-ex',
        title: 'Déboguer une décision avec le Chain-of-Thought',
        context: 'Vous êtes en train d\'évaluer si votre startup devrait investir 15 000€ dans une campagne publicitaire LinkedIn Ads pour acquérir des clients B2B SaaS. Votre ARR actuel est de 80 000€, votre ARPU moyen est de 2 400€/an, et votre taux de churn mensuel est de 3%.',
        instructions: `Rédigez un prompt qui utilise le Chain-of-Thought pour analyser cette décision d'investissement.

Votre prompt doit :
1. Définir le rôle du modèle (expert en growth B2B SaaS)
2. Donner toutes les données chiffrées nécessaires
3. Demander explicitement un raisonnement étape par étape structuré :
   - Calcul de la LTV client actuelle
   - Calcul du CAC maximum acceptable
   - Évaluation du ROI de la campagne selon différents scénarios
   - Recommandation finale argumentée

N'oubliez pas : l'objectif n'est pas juste d'avoir une réponse oui/non, mais de comprendre le raisonnement derrière.`,
        hint: 'La LTV (Lifetime Value) se calcule : ARPU / churn rate mensuel. Le CAC maximum acceptable est généralement 1/3 de la LTV pour un ratio sain. Ces formules peuvent faire partie de vos instructions pour guider le raisonnement.',
        proposedSolution: `\`\`\`
Tu es un expert en growth et finance pour les startups B2B SaaS.

CONTEXTE :
Ma startup envisage d'investir 15 000€ dans une campagne LinkedIn Ads B2B.
Données actuelles :
- ARR : 80 000€
- ARPU moyen : 2 400€/an (200€/mois)
- Churn mensuel : 3%
- Budget campagne envisagé : 15 000€
- Durée campagne : 3 mois

Analyse cette décision en suivant EXACTEMENT ces étapes :

ÉTAPE 1 — Calcul de la LTV actuelle
Utilise la formule : LTV = ARPU mensuel / taux de churn mensuel
Explique ce que ce chiffre signifie concrètement.

ÉTAPE 2 — CAC maximum acceptable
Sur la base de la LTV, calcule le CAC (coût d'acquisition client)
maximum qu'on peut se permettre pour un ratio LTV/CAC sain (objectif : ratio ≥ 3).

ÉTAPE 3 — Analyse de la campagne
Avec un budget de 15 000€, calcule combien de clients on doit acquérir
pour que la campagne soit rentable. Modélise 3 scénarios :
- Scénario pessimiste : CPL (coût par lead) élevé, taux de conversion faible
- Scénario réaliste : benchmarks LinkedIn B2B standards
- Scénario optimiste

ÉTAPE 4 — Risques et questions ouvertes
Identifie les 3 principaux risques et les informations manquantes
qui changeraient la décision.

ÉTAPE 5 — Recommandation finale
Donne une recommandation claire : investir / ne pas investir / conditions
pour investir. Justifie avec les chiffres.
\`\`\`

**Ce que ce prompt accomplit :**
- Le CoT structuré force le modèle à calculer la LTV (~6 667€) avant de conclure
- On obtient un CAC max (~2 222€) et donc un nb minimum de clients (7-8 clients)
- Le modèle peut identifier que c'est faisable mais risqué avec un budget aussi limité
- La recommandation finale est ancrée dans des calculs vérifiables, pas une opinion`,
      },
    },

    // ─── Leçon 4 ────────────────────────────────────────────────────────────
    {
      id: 'module-2-lesson-4',
      order: 4,
      title: 'System prompts, XML tags et structuration avancée',
      description: 'Maîtriser la couche système des LLM : system prompts, balises XML, et architectures de prompts pour des applications complexes.',
      estimatedMinutes: 25,
      theory: `# System prompts, XML tags et structuration avancée

## La différence entre System et User

Quand vous utilisez un LLM via API (ou des outils comme Claude.ai, ChatGPT), il y a généralement deux "espaces" distincts :

\`\`\`
┌─────────────────────────────────────────┐
│  SYSTEM PROMPT                          │
│  Instructions permanentes, rôle, règles │
│  → Invisible pour l'utilisateur final   │
│  → Priorité haute sur le user message   │
└─────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│  USER MESSAGE                           │
│  La question / tâche de l'utilisateur   │
└─────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│  RÉPONSE DU MODÈLE                      │
└─────────────────────────────────────────┘
\`\`\`

Le **system prompt** est le "contrat de comportement" du modèle. Il définit :
- Le persona et l'expertise du modèle
- Le périmètre de ce sur quoi il peut/doit répondre
- Le format systématique des réponses
- Les règles de sécurité et guardrails

---

## Écrire un bon system prompt

Un system prompt professionnel suit généralement cette structure :

\`\`\`
Tu es [PERSONA + EXPERTISE].

[CONTEXTE PRODUIT/ENTREPRISE]
Tu opères pour [nom de l'entreprise/produit]. [Description courte.]

[COMPORTEMENT ET PÉRIMÈTRE]
Tu dois :
- [règle 1]
- [règle 2]

Tu ne dois pas :
- [restriction 1]
- [restriction 2]

[FORMAT DE RÉPONSE]
Tes réponses doivent toujours :
- [format 1]
- [format 2]

[GESTION DES CAS LIMITES]
Si [situation X], alors [comportement Y].
\`\`\`

---

## Exemple concret : assistant support SaaS

\`\`\`
Tu es Alex, assistant support de Flowly, un logiciel de gestion de projet
pour les équipes créatives.

Flowly propose 3 plans : Starter (29€/mois), Pro (79€/mois), Enterprise (sur devis).
Documentation disponible sur docs.flowly.io.

Tu dois :
- Répondre aux questions techniques sur Flowly uniquement
- Orienter vers docs.flowly.io pour les tutoriels détaillés
- Créer un ticket de support si le problème nécessite un ingénieur
- Être chaleureux, concis, et toujours proposer une prochaine étape concrète

Tu ne dois pas :
- Parler de concurrents (Asana, Monday, Notion, etc.)
- Donner des informations sur les tarifs Enterprise (renvoyer vers l'équipe commerciale)
- Promettre des fonctionnalités pas encore disponibles

Format : Commence toujours par valider la frustration si l'utilisateur
exprime un problème, puis donne la solution en 2-3 étapes max.
\`\`\`

---

## Les XML tags : la signature de Claude

Claude (Anthropic) est particulièrement entraîné à interpréter les balises XML pour structurer les prompts complexes. C'est une pratique officielle recommandée par Anthropic.

### Pourquoi les XML tags ?

Les balises délimitent clairement les sections du prompt, évitant toute ambiguïté sur ce qui est une instruction vs ce qui est du contenu à traiter.

\`\`\`xml
<instructions>
  Analyse le document fourni et extrait les informations clés.
  Réponds uniquement à partir du contenu du document.
</instructions>

<document>
  Rapport Q3 2024 - Flowly Inc.
  Chiffre d'affaires : 2,4M€ (+34% vs Q3 2023)
  Nouveaux clients : 127
  Churn rate : 2,1%
  ...
</document>

<format_de_sortie>
  - Titre : [titre court]
  - KPIs clés : [liste à puces]
  - Points d'attention : [liste à puces]
  - Recommandations : [liste à puces]
</format_de_sortie>
\`\`\`

---

## Patterns XML avancés

### Séparer les données des instructions
\`\`\`xml
<context>
  Tu analyses des contrats pour une PME française, secteur tech.
</context>

<contract>
  {{CONTRAT_À_ANALYSER}}
</contract>

<task>
  Identifie les 5 clauses les plus risquées et propose une reformulation
  pour chacune.
</task>

<output_format>
  Pour chaque clause :
  - Clause originale (citation)
  - Niveau de risque : ÉLEVÉ / MOYEN / FAIBLE
  - Risque identifié
  - Reformulation proposée
</output_format>
\`\`\`

### Gérer plusieurs variantes avec des tags
\`\`\`xml
<examples>
  <example>
    <input>Message agressif d'un client mécontent</input>
    <output>Réponse empathique qui désamorce</output>
  </example>
  <example>
    <input>Question technique complexe</input>
    <output>Réponse structurée avec étapes</output>
  </example>
</examples>
\`\`\`

---

## Architectures avancées : prompt templates avec variables

Pour les applications en production, on utilise des templates avec des variables à injecter dynamiquement :

\`\`\`xml
<system>
  Tu es un assistant RH pour {{COMPANY_NAME}}.
  Ton rôle est d'analyser les CVs pour le poste de {{JOB_TITLE}}.
</system>

<job_requirements>
  {{JOB_REQUIREMENTS}}
</job_requirements>

<cv>
  {{CV_CONTENT}}
</cv>

<task>
  Évalue ce CV selon les critères du poste.
  Score de 1 à 10 pour chaque critère, avec justification.
  Recommandation finale : RETENIR / REFUSER / LISTE D'ATTENTE
</task>
\`\`\`

Ce pattern permet de réutiliser le même prompt template pour des centaines d'analyses.

---

## Récapitulatif : quand utiliser quoi

| Technique | Usage |
|-----------|-------|
| System prompt | Comportement permanent d'un assistant ou d'une application |
| XML \`<instructions>\` | Séparer instructions et contenu dans un prompt complexe |
| XML \`<examples>\` | Few-shot structuré et lisible |
| XML \`<context>\` | Injecter du contexte documentaire volumineux |
| Variables \`{{placeholder}}\` | Templates réutilisables pour des applications |`,

      quiz: [
        {
          id: 'q4-1',
          question: 'Quelle est la différence fondamentale entre un system prompt et un user message ?',
          options: [
            'Le system prompt est traité par un modèle plus puissant que le user message',
            'Le system prompt définit le comportement permanent du modèle et a priorité sur les user messages',
            'Les user messages sont chiffrés mais pas les system prompts',
            'Le system prompt ne peut contenir que du texte brut, sans mise en forme',
          ],
          correctIndex: 1,
          explanation: 'Le system prompt est le "contrat de comportement" du modèle — il définit son rôle, son périmètre et ses règles permanentes. Il a généralement priorité sur les instructions contradictoires du user message. C\'est l\'espace utilisé par les développeurs pour configurer le comportement d\'un assistant.',
        },
        {
          id: 'q4-2',
          question: 'Pourquoi Claude (Anthropic) est-il particulièrement adapté à l\'utilisation des XML tags dans les prompts ?',
          options: [
            'Parce que les XML tags réduisent le nombre de tokens utilisés',
            'Parce qu\'Anthropic a spécifiquement entraîné Claude à interpréter les balises XML pour structurer les prompts',
            'Parce que les XML tags permettent d\'accéder à des fonctionnalités cachées du modèle',
            'Parce que Claude ne comprend que les formats structurés comme XML ou JSON',
          ],
          correctIndex: 1,
          explanation: 'Anthropic recommande officiellement l\'utilisation des XML tags dans les prompts Claude car le modèle a été entraîné à les interpréter correctement pour délimiter les sections (instructions, contenu, format de sortie). C\'est une pratique documentée qui améliore la précision pour les tâches complexes.',
        },
        {
          id: 'q4-3',
          question: 'Vous construisez une application où 1000 CVs différents doivent être analysés avec les mêmes critères. Quelle technique est la plus adaptée ?',
          options: [
            'Écrire un prompt complet et différent pour chaque CV',
            'Utiliser un template avec des variables ({{CV_CONTENT}}, {{JOB_REQUIREMENTS}}) injectées dynamiquement',
            'Inclure les 1000 CVs dans un seul prompt et demander une analyse groupée',
            'Utiliser uniquement le zero-shot sans aucune structure pour garder de la flexibilité',
          ],
          correctIndex: 1,
          explanation: 'Les templates avec variables ({{placeholder}}) permettent de réutiliser la même structure de prompt pour des milliers d\'analyses. On injecte dynamiquement le contenu variable (le CV) tout en gardant les instructions constantes. C\'est le pattern standard pour les applications de traitement en masse.',
        },
        {
          id: 'q4-4',
          question: 'Dans un system prompt professionnel, que doit-on inclure dans la section "Tu ne dois pas" ?',
          options: [
            'Uniquement les sujets illégaux ou dangereux',
            'Les fonctionnalités que le modèle ne sait techniquement pas faire',
            'Les périmètres hors-scope, les concurrents à ne pas mentionner, et les informations sensibles à ne pas divulguer',
            'Cette section est optionnelle et n\'apporte pas de valeur concrète',
          ],
          correctIndex: 2,
          explanation: 'La section des restrictions définit le périmètre négatif de l\'assistant : sujets hors-scope (ne pas parler de concurrents), informations sensibles (ne pas donner les tarifs Enterprise), comportements à éviter (ne pas promettre des features inexistantes). C\'est essentiel pour un assistant de production fiable.',
        },
      ],

      exercise: {
        id: 'module-2-lesson-4-ex',
        title: 'Créer un system prompt de production',
        context: 'Vous développez "CodeReview Bot", un assistant intégré dans votre IDE d\'équipe. Il analyse du code Python soumis par des développeurs juniors et seniors, donne un feedback structuré, et suggère des améliorations. L\'équipe suit les conventions PEP 8 et utilise principalement FastAPI + SQLAlchemy.',
        instructions: `Créez un system prompt complet pour CodeReview Bot en utilisant les XML tags appropriés.

Votre system prompt doit inclure :
1. **Le persona** : rôle, expertise, ton (strict mais pédagogique)
2. **Le contexte tech** : stack utilisée, conventions de l'équipe
3. **Le périmètre** (doit / ne doit pas)
4. **Le format de sortie** systématique pour chaque review :
   - Score global /10
   - Points positifs (au moins 1)
   - Problèmes critiques (bloquants)
   - Suggestions d'amélioration (optionnelles)
   - Snippet de code corrigé si pertinent
5. **Gestion des cas limites** : code parfait, code inutilisable, demande hors-scope

Utilisez les XML tags \`<persona>\`, \`<context>\`, \`<rules>\`, \`<output_format>\`, \`<edge_cases>\`.`,
        hint: 'Pensez à distinguer les "problèmes critiques" (sécurité, performance, bugs) des "suggestions" (style, lisibilité). Un bon système de review ne met pas tout au même niveau d\'urgence.',
        proposedSolution: `\`\`\`xml
<persona>
Tu es CodeReview Bot, un senior ingénieur Python avec 10 ans d'expérience.
Tu combines la rigueur d'un expert en qualité logicielle avec la pédagogie
d'un mentor bienveillant. Tu es direct et factuel, jamais condescendant.
</persona>

<context>
Tu analyses du code Python pour une équipe de développeurs (mix junior/senior).
Stack principale : FastAPI, SQLAlchemy, PostgreSQL, Pydantic v2.
Conventions : PEP 8 strict, type hints obligatoires, docstrings pour
les fonctions publiques, pas de magic numbers.
Les reviews servent à la fois à améliorer le code ET à former les juniors.
</context>

<rules>
Tu dois :
- Analyser uniquement le code fourni (pas de suppositions sur le reste du projet)
- Expliquer le POURQUOI de chaque problème, pas juste le quoi
- Distinguer les problèmes bloquants des améliorations optionnelles
- Proposer un exemple de code corrigé pour les problèmes critiques
- Adapter le niveau de détail selon la complexité du code

Tu ne dois pas :
- Suggérer d'autres langages ou frameworks que ceux de la stack
- Faire de la revue de design d'architecture sans voir le contexte complet
- Approuver du code avec des problèmes de sécurité (injection SQL, secrets hardcodés)
- Commenter le style personnel si PEP 8 est respecté
</rules>

<output_format>
Structure obligatoire de chaque review :

## Score : X/10

## ✅ Points positifs
[Au moins 1 point, même sur du code médiocre]

## 🚨 Problèmes critiques (bloquants)
[Bugs, sécurité, performance critique — vide si aucun]

## 💡 Suggestions d'amélioration
[Style, lisibilité, maintenabilité — optionnel pour le merge]

## Code corrigé
\`\`\`python
[Snippet corrigé uniquement si problème critique identifié]
\`\`\`
</output_format>

<edge_cases>
Si le code est excellent (aucun problème) : score 9-10, explique précisément
pourquoi c'est bien écrit, suggère 1 piste d'optimisation avancée optionnelle.

Si le code est inutilisable ou non-Python : score 1-2, demande une réécriture
complète, fournis un squelette de départ.

Si la demande est hors-scope (question générale, autre langage) :
"Je suis spécialisé dans la review de code Python FastAPI/SQLAlchemy.
Soumets un snippet Python pour que je puisse t'aider."
</edge_cases>
\`\`\``,
      },
    },
  ],
};
