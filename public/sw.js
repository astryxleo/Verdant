const VERSION='verdant-shell-v2';
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('verdant-shell-')&&k!==VERSION).map(k=>caches.delete(k)));await self.clients.claim()})()));
// Deliberately network-first with no HTML/JS caching: prevents stale bundles from blanking the app.
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;});
