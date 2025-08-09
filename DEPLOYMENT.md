# 🚀 Guide de Déploiement Vercel

Ce guide vous explique comment déployer votre projet SaaS avec Paddle sur Vercel.

## 📋 Prérequis

- Compte Vercel
- Compte GitHub (avec votre repository)
- Compte Clerk (pour l'authentification)
- Compte Paddle (optionnel pour le déploiement initial)

## 🔧 Déploiement sur Vercel

### 1. **Connecter votre repository**

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur **"New Project"**
4. Importez votre repository : `solsina/boilerplate`
5. Vercel détectera automatiquement Next.js

### 2. **Configuration des variables d'environnement**

Dans les paramètres du projet Vercel, ajoutez ces variables :

#### **Variables obligatoires :**
```bash
# Clerk Authentication (obligatoire)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
```

#### **Variables optionnelles (pour Paddle) :**
```bash
# Paddle Configuration (optionnel)
NEXT_PUBLIC_PADDLE_CLIENT_ID=your_paddle_client_id_here
PADDLE_API_KEY=your_paddle_api_key_here
PADDLE_WEBHOOK_SECRET=your_paddle_webhook_secret_here

# Database (optionnel pour le déploiement initial)
DATABASE_URL=postgresql://username:password@host:port/database

# App URL
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

### 3. **Déploiement**

1. Cliquez sur **"Deploy"**
2. Vercel va construire et déployer votre application
3. Une fois terminé, vous aurez une URL : `https://your-app-name.vercel.app`

## 🍋 Configuration Paddle après déploiement

### 1. **Obtenir vos clés Paddle**

1. Créez un compte sur [Paddle.com](https://www.paddle.com/)
2. Allez dans **Developer Tools** > **Authentication**
3. Copiez votre **Client ID** et **API Key**

### 2. **Mettre à jour les variables Vercel**

1. Dans votre projet Vercel, allez dans **Settings** > **Environment Variables**
2. Ajoutez vos vraies clés Paddle :
   ```bash
   NEXT_PUBLIC_PADDLE_CLIENT_ID=pri_01hxxxxx
   PADDLE_API_KEY=your_real_api_key
   PADDLE_WEBHOOK_SECRET=your_webhook_secret
   ```

### 3. **Configurer les webhooks**

1. Dans le Dashboard Paddle, allez dans **Developer Tools** > **Webhooks**
2. Créez un webhook avec l'URL : `https://your-app-name.vercel.app/api/webhooks/paddle`
3. Sélectionnez les événements :
   - `subscription.created`
   - `subscription.updated`
   - `subscription.cancelled`
   - `transaction.completed`

### 4. **Redéployer**

1. Dans Vercel, allez dans **Deployments**
2. Cliquez sur **"Redeploy"** pour appliquer les nouvelles variables

## 🗄️ Configuration de la base de données

### Option 1 : Base de données locale (développement)
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/saas_boilerplate
```

### Option 2 : Base de données cloud (production)
- **Neon** : [neon.tech](https://neon.tech)
- **Supabase** : [supabase.com](https://supabase.com)
- **Railway** : [railway.app](https://railway.app)

## 🔍 Vérification du déploiement

### 1. **Page d'accueil**
- Visitez votre URL Vercel
- Vérifiez que la page se charge correctement

### 2. **Authentification**
- Testez l'inscription/connexion avec Clerk
- Vérifiez que l'authentification fonctionne

### 3. **Paiements Paddle**
- Si Paddle est configuré, testez le processus de paiement
- Utilisez les cartes de test Paddle

## 🛠️ Dépannage

### **Erreur de build**
- Vérifiez que toutes les variables d'environnement sont configurées
- Consultez les logs de build dans Vercel

### **Erreur de base de données**
- Vérifiez que `DATABASE_URL` est correct
- Assurez-vous que la base de données est accessible

### **Erreur Paddle**
- Vérifiez que les clés Paddle sont correctes
- Testez avec les cartes de test Paddle

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Paddle](https://developer.paddle.com/)
- [Documentation Clerk](https://clerk.com/docs)
- [Guide Paddle](./PADDLE_SETUP.md)

## 🎊 Félicitations !

Votre application SaaS est maintenant déployée et accessible publiquement ! 🍋✨
