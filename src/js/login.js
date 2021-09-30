import { endpoints } from "../constants/endpoints";
import { useFetch } from "./API";
import { USER_ID, USER_TOKEN } from "../constants/keysStorage";

const formLogin = document.querySelector('form');
const emailLogin = document.querySelector('#email');
const passwordLogin = document.querySelector('#pass');
const btnLogin = document.querySelector('button');
const alertError = document.querySelector('.message-error');

const login = () => {
	if(emailLogin.value.length <= 0) {
		emailLogin.classList.remove('active');
	} else {
		emailLogin.classList.add('active');
	}

	if(passwordLogin.value.length <= 3) {
		passwordLogin.classList.remove('active');
		btnLogin.classList.remove('button-active');
		btnLogin.disabled = true;
	} else {
		passwordLogin.classList.add('active');
		btnLogin.classList.add('button-active');
		btnLogin.disabled = false;
	}
};

const loginListeners = () => {
	emailLogin.addEventListener('input', login);
	passwordLogin.addEventListener('input', login);

	formLogin.addEventListener('submit', async (e) => {
		e.preventDefault();

		const inputs = {
			email: emailLogin.value,
			password: passwordLogin.value
		};

		const loginResult = await useFetch(endpoints.login, inputs);
		if(loginResult.ok){
			console.log(loginResult);
			localStorage.setItem(USER_ID, loginResult.user._id);
			localStorage.setItem(USER_TOKEN, loginResult.token);
			btnLogin.innerText = 'Iniciando sesión';
			btnLogin.disabled = true;
		} else {
			alertError.style.display = 'block';
		}

		setTimeout(() => {
			alertError.style.display = 'none';
		}, 2000);
	});
};

export{
	loginListeners
};