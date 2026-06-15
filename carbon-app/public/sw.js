// Minimal offline service worker — runtime cache-first with background
// revalidation. After the first visit the whole static app works offline, so a
// flaky conference network can't break the workshop. No build-time precache
// manifest needed (Vite asset hashes change per build); we cache on first fetch.
const CACHE = 'pd-carbon-v1'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return // don't touch cross-origin (CDNs, APIs)

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE)
      const cached = await cache.match(req)
      if (cached) {
        // Serve cached, refresh in the background.
        fetch(req).then((res) => { if (res.ok) cache.put(req, res.clone()) }).catch(() => {})
        return cached
      }
      try {
        const res = await fetch(req)
        if (res.ok) cache.put(req, res.clone())
        return res
      } catch {
        // Offline and uncached: for page navigations, fall back to the app shell.
        if (req.mode === 'navigate') {
          const shell = (await cache.match('/index.html')) || (await cache.match('/'))
          if (shell) return shell
        }
        throw new Error('offline')
      }
    })(),
  )
})
