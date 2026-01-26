# Énoncé — ATM virtuel (Angular / TypeScript)

## 1) Modèles de données à créer

### 1.1 Card

Créer un objet `Card` avec les propriétés suivantes :

- `cardnumber`
- `pin`
- `balance`
- `type` : `visa` | `mastercard` | `autre`
- `bank` : `belfius` | `ing` | `revolut`

---

### 1.2 Customer

Créer un objet `Customer` avec les propriétés suivantes :

- `firstname`
- `lastname`
- `gender`
- `birthdate`
- `address`
- `cards` : tableau de `Card`

---

## 2) Navigation ATM — système de steps

### Objectif

Implémenter un système de **steps** pour l’écran ATM :

- Créer une **enum** représentant les étapes (steps)
- Créer les **composants** correspondants
- Gérer la navigation entre étapes

### Steps attendus

1. **Accueil machine** (bouton : _Insérer carte_)
2. **Sélection carte**
   - Utilisateurs et cartes sont hardcodées pour l'instant
3. **Vérification code PIN**
4. **Sélection action**
   - Dépôt
   - Retrait
   - Solde
   - Changement code PIN
   - Quitter
5. **Action “Quitter”**
   - Retour à l’accueil (reset de la session)

---

## 3) Composants / actions à implémenter

- ✅ Composant **Solde**
- ✅ Composant **Dépôt**
- ✅ Composant **Retrait**
- ✅ Action **Changement de PIN**
