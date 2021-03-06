import { endpoints } from "../constants/endpoints";
import { useFetch } from "./API";
import { USER_ID, USER_TOKEN, USER_DATA } from "../constants/keysStorage";
import { userAuthenticated } from "../utils/userAuthenticated";
import { redirect } from "../utils/redirect";

const formLogin = document.querySelector('form');
const emailLogin = document.querySelector('#email');
const passwordLogin = document.querySelector('#pass');
const btnLogin = document.querySelector('button');
const alertError = document.querySelector('.message-error');

userAuthenticated();

const login = () => {
	if(!emailLogin.value) {
		emailLogin.classList.remove('active');
	} else {
		emailLogin.classList.add('active');
	}

	if(!passwordLogin.value) {
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

		// Text changes in-loading phase should change before
		// that request will be fired:
		btnLogin.innerText = 'Iniciando sesión...';
		btnLogin.classList.remove('button-active');
		btnLogin.disabled = true;

		const loginResult = await useFetch(endpoints.login, inputs , 'POST');

		if(loginResult.ok){
			console.log(loginResult);
			localStorage.setItem(USER_ID, loginResult.user._id);
			localStorage.setItem(USER_TOKEN, loginResult.token);
			localStorage.setItem(USER_DATA, JSON.stringify(loginResult.user));
			redirect('in-app');
		} else {
			//If something fails, we need to retrieve button state as before
			btnLogin.innerText = 'Iniciar sesión';
			btnLogin.disabled = false;
			alertError.style.display = 'block';
		}

		setTimeout(() => {
			alertError.style.display = 'none';
		}, 2000);
	});

	const linkToLogin = document.querySelector('.register-page');
	linkToLogin.addEventListener('click', () => {
		redirect('register');
	});

	const linkPassword = document.querySelector('.forgot');
	linkPassword.addEventListener('click', () => {
		redirect('forgot-password');
	});
};

loginListeners();