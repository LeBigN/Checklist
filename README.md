# Checklist Parc — version web installable (PWA)

Ce dossier contient l'appli Checklist Parc prête à héberger. Une fois en ligne,
elle s'installe sur Android **et** iPhone via "Ajouter à l'écran d'accueil",
et fonctionne hors-ligne une fois ouverte au moins une fois.

**Tous les fichiers sont à plat, à la racine du dossier — il n'y a plus de
sous-dossier `icons/` ni `vendor/`.** C'est volontaire : sur GitHub, glisser-
déposer un dossier entier depuis un téléphone échoue parfois silencieusement
(les fichiers à l'intérieur ne sont jamais uploadés, sans message d'erreur).
En mettant tout à plat, un simple glisser-déposer de fichiers individuels
suffit et ne peut plus rien oublier.

## Contenu

- `index.html` — l'appli (c'est le seul fichier à modifier pour changer le contenu)
- `manifest.json` — nom, icône, couleurs de l'app installée
- `service-worker.js` — permet le fonctionnement hors-ligne
- `icon-*.png`, `apple-touch-icon*.png` — icônes de l'app
- `jspdf.umd.min.js` — génération de PDF, embarquée en local

## Héberger gratuitement avec GitHub Pages (10 minutes, sans rien installer)

1. Créer un compte sur [github.com](https://github.com) si tu n'en as pas
2. Cliquer **New repository**, nommer par exemple `checklist-parc`, cocher **Public**, créer
3. Sur la page du dépôt : **Add file → Upload files**, glisser-déposer
   **tous les fichiers de ce dossier en une seule fois** (sélectionne-les
   tous, pas dossier par dossier — il n'y en a plus) puis **Commit changes**
4. **Vérifie que tous les fichiers sont bien arrivés** : ouvre le dépôt sur
   github.com et compte les fichiers — tu dois voir exactement les mêmes
   fichiers que dans ce dossier. S'il en manque, réessaie l'upload
   (idéalement depuis un ordinateur, c'est plus fiable que depuis un téléphone)
5. Aller dans **Settings → Pages** (menu de gauche)
6. Sous "Build and deployment" → Source : **Deploy from a branch**,
   Branch : **main**, dossier **/ (root)** → **Save**
7. Après ~1 minute, l'URL apparaît en haut de cette page, du type :
   `https://<ton-pseudo>.github.io/checklist-parc/`

C'est cette URL que tu partages à tes agents de parc / sous-traitants.

## Installer sur les téléphones / tablettes

**Android (Chrome)** : ouvrir l'URL → menu ⋮ → "Ajouter à l'écran d'accueil"
**iPhone/iPad (Safari)** : ouvrir l'URL → icône de partage (carré avec flèche) → "Sur l'écran d'accueil"
**iPhone/iPad (Chrome)** : ouvrir l'URL → icône de partage → "Ajouter à l'écran d'accueil"
(le partage à l'écran d'accueil passe par le moteur système d'iOS même depuis Chrome)

L'icône Checklist Parc apparaît, l'app s'ouvre en plein écran comme une vraie application.

Si une icône avec juste une lettre apparaît au lieu du logo, c'est presque
toujours parce qu'un fichier `icon-*.png` n'a pas été uploadé (vérifie l'étape 4
ci-dessus) — pas un problème de cache téléphone.

## Mettre à jour le contenu plus tard

Modifier `index.html`, puis sur GitHub : **Add file → Upload files** à nouveau
(ou éditer le fichier directement dans l'interface GitHub, crayon ✏️ en haut à
droite du fichier). Les tablettes récupèrent la nouvelle version à la
prochaine ouverture avec connexion.

Astuce : si une mise à jour ne semble pas s'appliquer (à cause du cache
hors-ligne), changer `const CACHE_NAME = 'checklist-parc-v10';` en
`'checklist-parc-v11'` dans `service-worker.js` force le rafraîchissement.

## Alternatives à GitHub Pages

Si tu préfères ne pas utiliser GitHub, n'importe quel hébergement de fichiers
statiques fonctionne pareil (Netlify Drop, Cloudflare Pages, ou même un petit
espace web déjà utilisé par l'entreprise) : il suffit de déposer les mêmes
fichiers à la racine.
