const STATIC_CACHE = 'static-v1';

const urlsToCache = [
	'index.html',
	'pages/email-sent.html',
	'pages/forgot-password.html',
	'pages/home-player.html',
	'pages/in-app.html',
	'pages/login.html',
	'pages/password-recovery.html',
	'pages/password-reset.html',
	'pages/profile-settings.html',
	'pages/register.html',
	'pages/user-mood.html',
	'pages/deep_feels_assets/deep-feels-logo/large_deep_feels_purple.svg',
	'pages/deep_feels_assets/deep-feels-logo/large_deep_feels_white.svg',
	'pages/deep_feels_assets/deep-feels-logo/moon_deep_feels_purple.svg',
	'bundle/app.css',
	'bundle/app.js'
];

self.addEventListener('install', e => {

	const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
		return cache.addAll(urlsToCache);
	});

	e.waitUntil(cacheStatic);
});

self.addEventListener('activate', e => {

	const response = caches.keys().then( key => {
		if(key !== STATIC_CACHE && key.includes('static')){
			return caches.delete(key);
		}

	});

	e.waitUntil(response);

});

self.addEventListener('fetch', e => {

	const response = caches.match(e.request).then(newRes =>{
		return newRes || fetch(e.request);
	})

	e.respondWith(response);
});