# 🍋 Configuration Paddle pour SaaS Boilerplate

Ce guide vous explique comment configurer Paddle pour votre projet SaaS.

## 📋 Prérequis

1. Un compte Paddle (https://www.paddle.com/)
2. Votre projet SaaS Boilerplate configuré

## 🔧 Configuration

### 1. Créer un compte Paddle

1. Allez sur [Paddle.com](https://www.paddle.com/)
2. Créez un compte développeur
3. Accédez au Dashboard Paddle

### 2. Configurer les variables d'environnement

Mettez à jour votre fichier `.env.local` avec vos clés Paddle :

```bash
# Paddle Configuration
NEXT_PUBLIC_PADDLE_CLIENT_ID=your_paddle_client_id_here
PADDLE_API_KEY=your_paddle_api_key_here
PADDLE_WEBHOOK_SECRET=your_paddle_webhook_secret_here
```

### 3. Obtenir vos clés Paddle

#### Client ID (Frontend)
1. Dans le Dashboard Paddle, allez dans **Developer Tools** > **Authentication**
2. Copiez votre **Client ID**
3. Ajoutez-le à `NEXT_PUBLIC_PADDLE_CLIENT_ID`

#### API Key (Backend)
1. Dans le Dashboard Paddle, allez dans **Developer Tools** > **Authentication**
2. Copiez votre **API Key**
3. Ajoutez-la à `PADDLE_API_KEY`

#### Webhook Secret
1. Dans le Dashboard Paddle, allez dans **Developer Tools** > **Webhooks**
2. Créez un nouveau webhook avec l'URL : `https://votre-domaine.com/api/webhooks/paddle`
3. Copiez le **Webhook Secret**
4. Ajoutez-le à `PADDLE_WEBHOOK_SECRET`

### 4. Créer vos produits et prix

1. Dans le Dashboard Paddle, allez dans **Catalog** > **Products**
2. Créez vos produits (Premium, Enterprise, etc.)
3. Pour chaque produit, créez des prix pour :
   - **Test** (Sandbox)
   - **Development** (Sandbox)
   - **Production** (Live)

### 5. Mettre à jour les Price IDs

Mettez à jour le fichier `src/utils/AppConfig.ts` avec vos vrais Price IDs :

```typescript
export const PricingPlanList: Record<string, PricingPlan> = {
  [PLAN_ID.PREMIUM]: {
    id: PLAN_ID.PREMIUM,
    price: 79,
    interval: BILLING_INTERVAL.MONTH,
    testPriceId: 'pri_01hxxxxx', // Votre vrai test price ID
    devPriceId: 'pri_01hxxxxx',  // Votre vrai dev price ID
    prodPriceId: 'pri_01hxxxxx', // Votre vrai prod price ID
    // ...
  },
  // ...
};
```

## 🚀 Utilisation

### Composant PaddleCheckout

Le composant `PaddleCheckout` est prêt à être utilisé :

```tsx
import { PaddleCheckout } from '@/components/PaddleCheckout';

<PaddleCheckout
  priceId="pri_01hxxxxx"
  onSuccess={(data) => console.log('Payment successful:', data)}
  onError={(error) => console.error('Payment failed:', error)}
>
  Payer maintenant
</PaddleCheckout>
```

### Webhooks

Les webhooks Paddle sont configurés pour gérer :
- `subscription.created` - Nouvelle souscription
- `subscription.updated` - Mise à jour de souscription
- `subscription.cancelled` - Annulation de souscription
- `transaction.completed` - Transaction réussie

## 🔒 Sécurité

### Vérification des webhooks

Pour sécuriser vos webhooks, implémentez la vérification de signature :

```typescript
import crypto from 'crypto';

function verifyPaddleWebhook(body: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body);
  const expectedSignature = hmac.digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

## 🧪 Test

### Mode Sandbox

Pour tester en mode développement :
1. Utilisez les Price IDs de test
2. Utilisez des cartes de test Paddle
3. Vérifiez les webhooks dans le Dashboard Paddle

### Cartes de test

Paddle fournit des cartes de test :
- **Visa** : 4000 0000 0000 0002
- **Mastercard** : 5555 5555 5555 4444
- **Expiration** : 12/25
- **CVC** : 123

## 📚 Ressources

- [Documentation Paddle](https://developer.paddle.com/)
- [SDK Paddle JavaScript](https://developer.paddle.com/api-reference/overview)
- [Webhooks Paddle](https://developer.paddle.com/api-reference/webhooks)

## 🆘 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs de la console
2. Vérifiez les webhooks dans le Dashboard Paddle
3. Consultez la documentation Paddle
4. Contactez le support Paddle
