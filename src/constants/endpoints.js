export const endpoints = {
	register: 'user/register',
	login: 'user/login',
	moods: 'moods/',
	userMood: 'user/:id/mood',// El ":id" se reemplaza por el id de usuario
	passRecovery: 'password-recovery',
	editProfile: 'user/:id/edit'// El ":id" se reemplaza por el id de usuario
};
