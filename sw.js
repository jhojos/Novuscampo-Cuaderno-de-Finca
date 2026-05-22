// Service worker mínimo para Novuscampo Cuaderno de Finca.
// Permite que la app se instale como PWA y abra sin internet, mostrando
// los datos ya guardados en el teléfono. NO sincroniza nada (no hay servidor).

const CACHE = 'cuaderno-finca-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './favicon.png',
];

// Al instalar, guarda los archivos base en caché.
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

// Al activar, limpia cachés viejas de versiones anteriores.
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Estrategia: primero caché (para abrir offline), luego red como respaldo.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
