# 🍋 SaaS Boilerplate avec Paddle

Un boilerplate SaaS moderne et complet avec intégration Paddle pour les paiements et la gestion des souscriptions.

## ✨ Fonctionnalités

- 🔐 **Authentification** avec Clerk
- 💳 **Paiements** avec Paddle
- 📊 **Dashboard** utilisateur moderne
- 🌍 **Internationalisation** (i18n)
- 🎨 **Interface** moderne avec Tailwind CSS
- 🗄️ **Base de données** PostgreSQL avec Drizzle ORM
- 🔄 **Webhooks** Paddle configurés
- 📱 **Responsive** design
- ⚡ **Performance** optimisée

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- PostgreSQL
- Compte Paddle

### Installation

1. **Cloner le projet**
```bash
git clone https://github.com/votre-username/saas-paddle-boilerplate.git
cd saas-paddle-boilerplate
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'environnement**
```bash
cp .env.example .env.local
```

4. **Configurer les variables d'environnement**
```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Database (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/saas_boilerplate

# Paddle Configuration
NEXT_PUBLIC_PADDLE_CLIENT_ID=your_paddle_client_id_here
PADDLE_API_KEY=your_paddle_api_key_here
PADDLE_WEBHOOK_SECRET=your_paddle_webhook_secret_here
```

5. **Démarrer le serveur de développement**
```bash
npm run dev
```

6. **Ouvrir votre navigateur**
```
http://localhost:3000
```

## 🍋 Configuration Paddle

Consultez le guide complet : [PADDLE_SETUP.md](./PADDLE_SETUP.md)

### Étapes principales :

1. **Créer un compte Paddle** sur [paddle.com](https://www.paddle.com/)
2. **Obtenir vos clés API** dans le Dashboard Paddle
3. **Créer vos produits** et prix
4. **Configurer les webhooks**
5. **Mettre à jour les Price IDs** dans `src/utils/AppConfig.ts`

## 🛠️ Technologies utilisées

- **Frontend :** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend :** Next.js API Routes, Drizzle ORM
- **Base de données :** PostgreSQL
- **Authentification :** Clerk
- **Paiements :** Paddle
- **Monitoring :** Sentry
- **Tests :** Vitest, Playwright

## 📁 Structure du projet

```
src/
├── app/                    # Next.js App Router
├── components/             # Composants réutilisables
│   └── PaddleCheckout.tsx  # Composant de paiement Paddle
├── features/               # Fonctionnalités spécifiques
│   └── billing/           # Gestion des paiements
├── libs/                   # Configuration des librairies
├── models/                 # Modèles de base de données
├── types/                  # Types TypeScript
└── utils/                  # Utilitaires
```

## 🔧 Scripts disponibles

```bash
npm run dev          # Démarrer le serveur de développement
npm run build        # Construire pour la production
npm run start        # Démarrer le serveur de production
npm run test         # Lancer les tests
npm run db:generate  # Générer les migrations
npm run db:migrate   # Appliquer les migrations
```

## 📚 Documentation

- [Guide Paddle](./PADDLE_SETUP.md) - Configuration complète de Paddle
- [Résumé de l'intégration](./INTEGRATION_SUMMARY.md) - Détails de l'intégration
- [Documentation Next.js](https://nextjs.org/docs) - Documentation Next.js
- [Documentation Paddle](https://developer.paddle.com/) - Documentation Paddle

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## 🆘 Support

Si vous rencontrez des problèmes :

1. Consultez la [documentation Paddle](./PADDLE_SETUP.md)
2. Vérifiez les logs de la console
3. Ouvrez une issue sur GitHub
4. Consultez la [documentation Paddle](https://developer.paddle.com/)

## 🎊 Félicitations !

Votre projet SaaS est maintenant prêt à accepter des paiements avec Paddle ! 🍋✨

---

**Développé avec ❤️ et Paddle**
