# 🚀 TechPulse - Agrégateur de News Hybride

TechPulse est une plateforme moderne d'agrégation de news technologiques qui utilise une architecture découplée : un backend **Express/TypeScript** et un frontend **Next.js (App Router)**.

## 🛠 Architecture & Technologies

- **Frontend (`/web`)** : Next.js 15+, TypeScript, Tailwind CSS.
  - Rendu Hybride : ISR (Accueil), SSR (Détails), CSR (Compteur de vues).
  - Gestion d'état : URL State & Server Actions.
- **Backend (`/content`)** : Node.js, Express, TypeScript.
- **Workflow** : NVM (Node Version Manager), Conventional Commits, Yarn.

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir **Node.js v20** installé. Ce projet utilise un verrouillage de version pour garantir la stabilité.

```bash
# Utiliser la version de Node recommandée via NVM
nvm install 20
nvm use 20
```
## 🚀 Installation et Lancement
## 1. Cloner le projet

```bash
git clone <url-du-repo>
cd tech-pulse
```
## 2. Configurer le Backend (/content)

```bash
cd content
yarn install
yarn dev
```

Le serveur tourne sur : http://localhost:3001

## 3. Configurer le Frontend (/web)

```bash
cd ../web
yarn install
yarn dev
```
L'application est accessible sur : http://localhost:3000


