'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "c5d2391638029b9fae7ce2aec23d3791",
"assets/AssetManifest.bin.json": "762265ccb257a572e2f056d3d6a49c55",
"assets/AssetManifest.json": "ab10bed5aa4623ffd6027c4bef839328",
"assets/assets/fonts/AvenirNextLTPro-Regular.ttf": "2621ce27f6f8a341540435cf81543945",
"assets/assets/fonts/FontsFree-Net-Gilroy-ExtraBold.ttf": "e444766850436d5b6abd0ff3f878ab92",
"assets/assets/icons/bag.svg": "c390a995581fa8bb4097c141be30ac48",
"assets/assets/icons/best_seller.svg": "37f191e49262f3360e0c9b1b85a912fb",
"assets/assets/icons/body.svg": "a4856004bfa47b511aac19322e41348d",
"assets/assets/icons/cleansers.svg": "b274d5282e61f7b7500b47d7c3c1670a",
"assets/assets/icons/moisturizers.svg": "37b19091764b7088432800c88fb528ea",
"assets/assets/icons/retinol.svg": "2b1de6c4d468c8d4523dc33f81d3336d",
"assets/assets/icons/serums.svg": "c82d639226adf721cec88592261c342c",
"assets/assets/icons/spf.svg": "2d23411ea85567aecb2d1dc52130ceed",
"assets/assets/images/black-friday-bundle.webp": "f5ef9d9714bdffc714a1c89ad2daedf8",
"assets/assets/images/carbon_label.webp": "7ebd068eaf202890f50d79088dd0b1e5",
"assets/assets/images/ceramide-barrier-serum.webp": "77c1daf2286832072b8e5629673b90b4",
"assets/assets/images/ceramide-body-oil-stick.webp": "016d39d015ddd61dfa69c723ff43e5c3",
"assets/assets/images/cruelty_free.webp": "72b95adfca390f8382d17d5bbe86b216",
"assets/assets/images/daily-spf.webp": "1399b036b2058f83132948f380884af0",
"assets/assets/images/img.png": "9f251f79653ab65d723a356269dbae38",
"assets/assets/images/rich-moisture-barrie.webp": "8d0698f557f67b6654e031c2f32d0c84",
"assets/assets/images/rich-moisture-retinol.webp": "b803caff02b7cf24f2c7d80e18c793d6",
"assets/assets/images/s1.webp": "1f88c524c7b40da208a9062ab1d0575d",
"assets/assets/images/sensitive_skin_friendly.webp": "bc3a688b6f2be371fb8bc7a4a714030d",
"assets/assets/images/vegan.webp": "3fa8bf08aa6a934240595fdb5920b92b",
"assets/FontManifest.json": "785cc4ebbcff6cfd860cd87a2f0c96ce",
"assets/fonts/MaterialIcons-Regular.otf": "66ae51920ee6b1faf4b46ec9e4d66ddc",
"assets/NOTICES": "eb7aa1a421a6256ed8c9dba08bd561e1",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "333efaed09e6c5c46133ab7745262656",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "6592149f120e18338da6bd1472cf8c9c",
"/": "6592149f120e18338da6bd1472cf8c9c",
"main.dart.js": "ad014e6ad79226ba823cfe4da758b1d0",
"manifest.json": "ac72c447abbeb89e30382f4782e19f44",
"version.json": "9bc94293637fdb925634d3df734baf71"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
