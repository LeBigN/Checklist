const CACHE_NAME = 'checklist-parc-v12';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './jspdf.umd.min.js',
  './apple-touch-icon.png',
  './apple-touch-icon-precomposed.png',
  './icon-120.png',
  './icon-152.png',
  './icon-167.png',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './icon-192-maskable.png',
  './icon-512-maskable.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Important : on met chaque fichier en cache indépendamment (au lieu de
      // cache.addAll, qui annule TOUTE l'installation si un seul fichier est
      // manquant côté hébergement). Ainsi un fichier oublié ne bloque plus
      // jamais la mise à jour du reste de l'app.
      Promise.allSettled(
        ASSETS.map((url) =>
          fetch(url).then((res) => {
            if (res.ok) return cache.put(url, res);
          }).catch(() => {})
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// HTML (navigation): network-first pour toujours avoir la dernière version en ligne,
// repli sur le cache hors-ligne.
// Autres ressources (jsPDF, icônes): cache-first pour la vitesse et le hors-ligne.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const isHTML = req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req, {ignoreSearch:true}).then((cached) => cached || fetch(req))
  );
});
