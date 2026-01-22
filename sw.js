// Version को v5 कर दिया है ताकि पुरानी फाइल्स डिलीट हो जाएं
const CACHE_NAME = 'citizen-v5-english'; 
const assets = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // तुरंत नया वर्जन एक्टिवेट करने के लिए
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(assets)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => {
    return Promise.all(keys.map(k => {
      if(k !== CACHE_NAME) return caches.delete(k);
    }));
  }));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
