const CACHE_PREFIX = 'verdant-shell-v1';
const SHELL_CACHE = CACHE_PREFIX;
const STATIC_CACHE = 'verdant-static-v1';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    const response = await fetch('/', { cache: 'reload' });
    if (!response.ok) throw new Error('Unable to cache Verdant app shell');
    await cache.put('/', response.clone());
    const html = await response.text();
    const assets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
      .map(match => match[1])
      .filter(path => path.startsWith('/') && !path.startsWith('//') && !path.includes('?'));
    const staticCache = await caches.open(STATIC_CACHE);
    await Promise.all(assets.map(async path => {
      try {
        const asset = await fetch(path, { cache: 'reload' });
        if (asset.ok) await staticCache.put(path, asset);
      } catch {}
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('verdant-') && ![SHELL_CACHE, STATIC_CACHE].includes(key)).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // Never cache API/auth/database requests: they may contain private or changing financial data.
  if (url.pathname.startsWith('/rest/') || url.pathname.startsWith('/auth/') || url.pathname.startsWith('/functions/')) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(SHELL_CACHE);
          await cache.put('/', response.clone());
        }
        return response;
      } catch {
        return (await caches.match('/')) || new Response('Verdant is offline and its app shell has not been cached yet. Reconnect once and reload.', {
          status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }
    })());
    return;
  }

  if (url.pathname.startsWith('/assets/') || /\.(?:svg|png|webp|ico|woff2?)$/i.test(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(STATIC_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch {
        return new Response('', { status: 504, statusText: 'Offline asset unavailable' });
      }
    })());
  }
});
