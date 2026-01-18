
# 📚 Library Management System

Un système de gestion de bibliothèque moderne développé avec Angular 17, offrant une interface utilisateur intuitive pour gérer les livres, les prêts et les utilisateurs.

## ✨ Fonctionnalités

### 🔐 Authentification
- Page de connexion sécurisée
- Gestion des rôles (Admin/Utilisateur)
- Protection des routes par authentification

### 📊 Dashboard
- Statistiques en temps réel
- Vue d'ensemble des livres et prêts
- Activités récentes

### 📖 Gestion des Livres
- Ajout, modification et suppression de livres
- Recherche et filtrage avancés
- Gestion des catégories et statuts
- Interface de tableau moderne

### 📋 Gestion des Prêts
- Création de nouveaux prêts
- Suivi des prêts actifs et retournés
- Détection automatique des retards
- Historique des prêts

### 👥 Gestion des Utilisateurs (Admin)
- Gestion complète des utilisateurs
- Attribution des rôles
- Interface d'administration

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd library-management-system
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer le serveur de développement**
```bash
npm start
```

4. **Ouvrir l'application**
```
http://localhost:4200
```

## 🔧 Scripts Disponibles

- `npm start` - Démarre le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run test` - Lance les tests unitaires
- `npm run watch` - Compile en mode watch

## 👤 Comptes de Test

### Administrateur
- **Email:** admin@example.com
- **Rôle:** Administrateur
- **Accès:** Toutes les fonctionnalités

### Utilisateur Standard
- **Email:** user@example.com
- **Rôle:** Utilisateur
- **Accès:** Dashboard, Livres, Prêts

## 🏗️ Architecture du Projet

```
src/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   └── layout.component.ts
│   │   ├── navbar/
│   │   │   └── navbar.component.ts
│   │   └── sidebar/
│   │       └── sidebar.component.ts
│   ├── models/
│   │   └── book.model.ts
│   ├── pages/
│   │   ├── books/
│   │   │   └── books.component.ts
│   │   ├── dashboard/
│   │   │   └── dashboard.component.ts
│   │   ├── loans/
│   │   │   └── loans.component.ts
│   │   ├── login/
│   │   │   └── login.component.ts
│   │   └── users/
│   │       └── users.component.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── book.service.ts
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
```

## 🎨 Design System

### Couleurs
- **Primaire:** Gradient bleu-violet (#667eea → #764ba2)
- **Secondaire:** Gris neutre (#2c3e50)
- **Succès:** Vert (#155724)
- **Erreur:** Rouge (#721c24)
- **Avertissement:** Jaune (#856404)

### Composants
- Interface moderne avec des cartes et des ombres
- Animations fluides et transitions
- Design responsive pour mobile et desktop
- Icônes emoji pour une meilleure UX

## 🔒 Sécurité

- Protection des routes par authentification
- Gestion des rôles et permissions
- Validation des formulaires
- Protection contre les accès non autorisés

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte à tous les écrans :
- **Desktop:** Interface complète avec sidebar
- **Tablet:** Interface adaptée
- **Mobile:** Interface optimisée pour les petits écrans

## 🛠️ Technologies Utilisées

- **Angular 17** - Framework principal
- **TypeScript** - Langage de programmation
- **CSS3** - Styles et animations
- **HTML5** - Structure sémantique
- **RxJS** - Programmation réactive

## 📈 Fonctionnalités Futures

- [ ] Intégration avec une API backend
- [ ] Système de notifications
- [ ] Export de rapports PDF
- [ ] Système de réservation
- [ ] Gestion des amendes
- [ ] Interface de recherche avancée
- [ ] Système de recommandations

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

---

**Développé avec ❤️ pour la gestion moderne de bibliothèques**
>>>>>>> e285092 (@fatimaezzahraa)
