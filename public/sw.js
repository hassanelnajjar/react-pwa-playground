// const self = this;
// const CACHE_NAME = 'v2142-react';
// const CACHE_FILES = [
// 	'/',
// 	'./index.html',
// 	'./offline.html',
// 	'./offline.png',
// 	'./logo192.png',
// 	'./logo512.png',
// 	'./manifest.json',
// 	'./favicon.ico',
// 	'./static/js/bundle.js	',
// 	'./static/js/main.chunk.js',
// 	'./static/js/vendors~main.chunk.js',
// 	'./static/media/bg.7b83f7cd.jpg',
// ];
// self.addEventListener('install', (e) => {
// 	e.waitUntil(
// 		caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_FILES))
// 	);
// 	self.skipWaiting();
// });

// // put the request inside the cache - request clone

// self.addEventListener('activate', (event) => {
// 	var cacheKeeplist = [CACHE_NAME];
// 	event.waitUntil(
// 		caches.keys().then((keyList) => {
// 			return Promise.all(
// 				keyList.map((key) => {
// 					if (cacheKeeplist.indexOf(key) === -1) {
// 						return caches.delete(key);
// 					}
// 				})
// 			);
// 		})
// 	);
// });

const offlineObject = {
	coord: {
		lon: 57,
		lat: 21,
	},
	weather: [
		{
			id: 800,
			main: 'Clear',
			description: 'Please Check Your Connection !!',
			icon: '01n',
		},
	],
	base: 'stations',
	main: {
		temp: 0,
		feels_like: 28.83,
		temp_min: 30.67,
		temp_max: 30.67,
		pressure: 1008,
		humidity: 21,
		sea_level: 1008,
		grnd_level: 994,
	},
	visibility: 10000,
	wind: {
		speed: 5.52,
		deg: 165,
		gust: 7.92,
	},
	clouds: {
		all: 6,
	},
	dt: 1617472301,
	sys: {
		country: 'OM',
		sunrise: 1617415400,
		sunset: 1617460014,
	},
	timezone: 14400,
	id: 286963,
	name: 'Offline',
	cod: 200,
};

self.addEventListener('fetch', (event) => {
	const { destination } = event.request;
	const filePath = event.request.url
		.split('//')[1]
		.split('/')
		.slice(1)
		.join('/');
	switch (destination) {
		case 'image':
			return event.respondWith(
				fetch(event.request).catch(() =>
					caches.match(`./${filePath}`).then((res) => {
						if (res) return res;
						return caches.match('./offline.png');
					})
				)
			);
		case 'document':
		case 'script':
			return event.respondWith(
				fetch(event.request).catch(() => caches.match(`./${filePath}`))
			);
		default:
			if (event.request.url.includes('openweathermap')) {
				return event.respondWith(
					fetch(event.request).catch(
						() => new Response(JSON.stringify(offlineObject))
					)
				);
			}
			return event.respondWith(fetch(event.request));
	}
});
