# 🎨 GENUARY//26 — Antoine Brachet

Mon projet d'art génératif pour l'IIM (B3).
**3 projets en 1** : un site web, un mini-zine et un grand zine.

---

## ▶️ Comment ouvrir (le plus simple)

1. Ouvre le dossier.
2. **Double-clique sur `index.html`** → ça s'ouvre dans le navigateur. C'est tout. ✅

(Besoin d'internet la 1ère fois pour charger p5.js et le QR code.)

---

## 📂 C'est quoi chaque fichier ?

| Fichier | C'est quoi |
|---|---|
| **index.html** | 🌐 Le site : la galerie des **31 dessins génératifs** |
| **genuary.html** | 🔍 Voir un dessin en grand + le **chatbot** |
| **zine/mini-zine.html** | ✂️ Le **petit zine** (1 feuille = 8 pages) |
| **zine/big-zine.html** | 📕 Le **grand zine** à agrafer |
| `js/sketches.js` | Le code des 31 dessins |
| `js/chatbot.js` | Le robot qui parle (SANS IA) |

---

## ✅ Les 3 projets demandés (et où ils sont)

### 1. Site Genuary 🌐 → `index.html`
- ✔️ Les **31 Genuaries** en p5.js, qui tournent en vrai
- ✔️ Style **unique / hors-norme** (Y2K / vaporwave : pastel, chrome, grille rétro)
- ✔️ Un **chatbot SANS IA** qui parle de mon code (clique un dessin → en bas à droite)

### 2. Petit zine ✂️ → `zine/mini-zine.html`
- 1 feuille, **8 pages**, pliée autour d'une coupe au centre (le bon modèle).
- ✔️ Mon **nom**, ✔️ **contact**, ✔️ lien **GitHub**, ✔️ une **bio**, ✔️ infos sur l'**art génératif**.
- Pour l'imprimer : ouvre le fichier → bouton **PRINT** (les instructions de pliage sont écrites dessus).

### 3. Grand zine 📕 → `zine/big-zine.html`
- ✔️ Couverture unique, ✔️ page **about me**, ✔️ page **about the project**
- ✔️ **QR code** vers le site, ✔️ les **31 genuaries**, ✔️ mon **nom**
- Emplacements prévus pour : **1 image vectorielle** + **10 images raster** (à coller/imprimer).
- Tuto agrafage (saddle-stitch) : https://www.youtube.com/watch?v=A1VzheSHW5k

---

## ✏️ Déjà configuré pour toi

- **Pseudo GitHub** : `antoine721` (déjà mis partout : site, zines, chatbot).
- **Adresse du site (QR codes)** : `antoine721.github.io/genuary`.

> ⚠️ Le seul point à vérifier : l'adresse suppose que ton dépôt GitHub s'appelle **`genuary`**.
> Si tu nommes le dépôt autrement, Rechercher/Remplacer `antoine721.github.io/genuary`
> par `antoine721.github.io/LE-NOM-DE-TON-DEPOT` (sinon les QR codes pointent au mauvais endroit).

**Mettre en ligne gratuitement :** pousse ce dossier sur GitHub → onglet **Settings ▸ Pages** → branche `main`. Ton site sera sur `antoine721.github.io/NOM-DU-DEPOT`.

---

## 🤖 Le chatbot est-il une IA ?

**Non.** Aucun GPT, aucune API. Juste des **règles par mots-clés** (`js/chatbot.js`).
Demande-lui *"favourite"*, *"about 15"*, *"what is genuary"*, *"contact"*…

---

Fait avec ❤️ et **p5.js** — Antoine Brachet · IIM B3 · 2026
