export const endpoints = {
	register: 'user/register',
	login: 'user/login',
	moods: 'moods/',
	userMood: 'user/:id/mood',// El ":id" se reemplaza por el id de usuario
	passRecovery: 'password-recovery',
	resetPassword: 'reset-password',
	editProfile: 'user/:id/edit',// El ":id" se reemplaza por el id de usuario
	sounds: 'sounds',
	stream: 'sounds/stream/:id-audio', //El ":id" se reemplaza por el del audio
	phrases: 'quote'
};

export const API_HOST = 'https://deep-feels-backend.herokuapp.com/';