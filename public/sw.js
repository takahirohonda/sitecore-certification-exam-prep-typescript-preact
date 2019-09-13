

self.addEventListener('install', function(e) {
  console.log('starting caching')
  e.waitUntil(
    caches.open('airhorner').then(function(cache) {
      return cache.addAll([
        '/sitecore-exam-prep/index.html',
        '/sitecore-exam-prep/default.js',
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        'https://mydatahack.github.io/static/img/sitecore-quiz/sitecore-logo.PNG',
        'https://mydatahack.github.io/data/sitecore-quiz/sitecore-quiz-data.json'
      ]);
    })
  );
 });

 self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
 
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
 });