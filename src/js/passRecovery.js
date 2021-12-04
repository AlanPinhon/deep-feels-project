import { campos } from "../constants/validators";
import { redirect } from "./redirect";
import { USER_TOKEN } from "../constants/keysStorage";
import { useFetch } from "./API";
import { endpoints } from "../constants/endpoints";


const newPass = document.querySelector('#new-pass');
const confirmPass = document.querySelector('#confirm-pass');
const alertMsg = document.querySelector('.message');
const samePassMsg = document.querySelector('.same-pass');
const btnRestore = document.querySelector('button');
const passwordForm = document.querySelector('form');

//Se obtienen los query params de la url
const urlParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlParams.entries());

// Si no hay un token o un id de usuario,
// la página se redirige al inicio de sesión.
const { token, uid } = params;
if(!token || !uid){
	redirect('login');
}

localStorage.setItem(USER_TOKEN, token);

const validarInputPass = (e) => {
	if(!campos.password.test(e.target.value)){
		e.target.classList.add('error');
		alertMsg.style.display = 'block';
	} else {
		e.target.classList.remove('error');
		alertMsg.style.display = 'none';
	}
};

const comparePass = () => {
	if(newPass.value !== confirmPass.value){
		confirmPass.classList.add('error');
		samePassMsg.style.display = 'block';
		btnRestore.classList.remove('button-active');
		btnRestore.disabled = true;
	} else {
		confirmPass.classList.remove('error');
		samePassMsg.style.display = 'none';
		btnRestore.classList.add('button-active');
		btnRestore.disabled = false;
	}
};

const recoveryPassListeners = () => {
	newPass.addEventListener('input', validarInputPass);
	confirmPass.addEventListener('input', comparePass);

	passwordForm.addEventListener('submit', async (e) => {
		e.preventDefault();

		const currentText = btnRestore.textContent;
		btnRestore.textContent = 'Restableciendo...';
		btnRestore.disabled = true;
		btnRestore.classList.remove('button-active');

		const payload = {
			password: confirmPass.value,
			uid
		};

		const result = await useFetch(
			endpoints.resetPassword,
			payload,
			'POST',
			true
		);

		if(result.ok){
			redirect('password-reset');
			localStorage.clear();
		} else {
			btnRestore.textContent = currentText;
			btnRestore.disabled = false;
			btnRestore.classList.add('button-active');
		}

	});
};

recoveryPassListeners();