self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      if (cacheNames.length > 0) {
        // Terdapat cache lama dari PWA (workbox, firestore, dll), bersihkan SEMUA
        return Promise.all(
          cacheNames.map(function (cacheName) {
            return caches.delete(cacheName);
          }),
        )
          .then(function () {
            return self.clients.claim();
          })
          .then(function () {
            return self.registration.unregister();
          })
          .then(function () {
            // Reload SEMUA tab hanya jika ada cache yang terhapus (berarti user sedang buka aplikasi lama)
            return self.clients.matchAll();
          })
          .then(function (clients) {
            clients.forEach((client) => client.navigate(client.url));
          });
      } else {
        // Tidak ada cache. Ini user baru atau user yang sudah berhasil memuat Landing Page baru.
        // Hapus (unregister) service worker secara diam-diam tanpa mengganggu UX (tanpa reload).
        return self.registration.unregister();
      }
    }),
  );
});
