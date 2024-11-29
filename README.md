
# README - EventSync

---

## **EventSync - Description**

EventSync est une application innovante conçue pour simplifier la gestion des événements et des tâches, tout en aidant les utilisateurs à optimiser leur emploi du temps. En intégrant des outils de gestion classiques et des fonctionnalités avancées, comme l'optimisation des "temps morts" (BreakFiller), EventSync se positionne comme un assistant personnel complet et moderne.

---

## **Objectifs du Projet**

1. Proposer une application qui transforme la gestion du temps libre en opportunité productive ou relaxante.
2. Intégrer des fonctionnalités intuitives répondant aux besoins des utilisateurs modernes, personnels comme professionnels.
3. Exploiter les technologies avancées telles qu’**Angular**, **Node.js**, et **MongoDB** pour offrir une application performante, fluide et engageante.

---

## **Fonctionnalités actuelles (29/11/2024)**

1. **Authentification et gestion des utilisateurs :**
   - Création de compte avec validation des champs obligatoires.
   - Connexion sécurisée avec génération de token JWT.
   - Profil utilisateur avec possibilité d'accès sécurisé aux données personnelles.

2. **Gestion des tâches :**
   - Ajout, modification et suppression de tâches.
   - Gestion des sous-tâches associées.
   - Priorisation des tâches par niveau (urgent, moyen, faible).
   - Statuts des tâches (à faire, en cours, terminé).
   - Association des tâches à des événements spécifiques.

3. **Gestion des événements :**
   - Création et modification d’événements (titre, description, lieu, date et heure).
   
4. **Tableau de bord :**
   - Accès rapide aux fonctionnalités principales.

5. **Gestion des dates et validations dynamiques :**
   - Contrôle automatique des dates (date de début dans le futur, date de fin après la date de début).
   - Affichage des messages d'erreur spécifiques en cas de validation échouée.

---

## **Technologies utilisées**

Le projet repose sur les technologies suivantes :

- **Frontend :**
  - **Angular v19** : Pour créer une interface utilisateur dynamique et responsive.
  - **Angular Material UI** : Pour intégrer des composants modernes et préconstruits.
  - **Tailwind CSS** : Pour une mise en page moderne et réactive.

- **Backend :**
  - **Node.js** : Gestion de la logique serveur avec **Express.js** pour créer des API REST performantes.

- **Base de données :**
  - **MongoDB** : Stockage efficace, évolutif et flexible des données.

---

## **Installation et démarrage du projet**

### **Pré-requis :**
1. Installer **Node.js** (version 18 ou supérieure).
2. Installer **MongoDB** (ou créer une base de données sur MongoDB Atlas).
3. Cloner le dépôt GitHub contenant le projet.

### **Étapes d'installation en local :**
1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/BelkacemRedouane/EventSync.git
   cd EventSync
   ```

3. **Installer les dépendances :**
   ```bash
   cd backend
   npm install
   cd ..
   cd frontend
   npm install
   cd ..
   ```

4. **Lancer le serveur backend :**
   ```bash
   cd backend
   npm run dev
   ```

5. **Lancer le serveur frontend :**
   ```bash
   cd frontend
   ng serve
   ```

6. **Accéder à l'application :**
   - Ouvrez votre navigateur et accédez à [http://localhost:4200](http://localhost:4200).

---

## **Fonctionnalités futures**

EventSync est un projet évolutif. Voici les fonctionnalités prévues pour les prochaines phases de développement :

1. **Notifications intelligentes :**
   - Envoi de rappels pour les tâches et événements importants.
   - Actions rapides via notifications :
     - Accepter ou refuser une tâche/événement directement depuis la notification.
     - Ajouter un rappel instantané.

2. **Optimisation des "temps morts" (BreakFiller) :**
   - **Suggestions automatiques :**
     - Détection des créneaux libres dans l’agenda.
     - Suggestions adaptées à la durée disponible (exemple : lecture, méditation, tâches courtes).
   - **Personnalisation :**
     - Choix des catégories d’activités suggérées (productivité, détente, loisirs).

3. **Statistiques d'utilisation du temps :**
   - **Rapports hebdomadaires :**
     - Temps productif vs temps libre.
     - Analyse des activités courantes (travail, détente, déplacements).
   - **Suggestions d’amélioration :**
     - Conseils pour équilibrer et optimiser les activités.

4. **Événements collaboratifs :**
   - Partage d’événements avec plusieurs participants.
   - Gestion collaborative des tâches liées à l’événement.

5. **Réseau social d’événements :**
   - Publication d’événements publics (exemple : "Cours de yoga collectif").
   - Inscription des utilisateurs à des événements ouverts.

---
