
const emailLogin = document.querySelector('#email');
const passwordLogin = document.querySelector('#pass');


const iniciarSesion = (e) => {
	console.log(e.target.value);
};



export const loginListeners = () => {
	emailLogin.addEventListener('input', iniciarSesion);
	passwordLogin.addEventListener('input', iniciarSesion);
};

