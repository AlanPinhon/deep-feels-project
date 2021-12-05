import { redirect } from "./redirect";
import { campos } from "../constants/validators";
import { endpoints } from "../constants/endpoints";
import { useFetch } from "./API";

const emailRecovery = document.querySelector('#email');
const inputMsg = document.querySelector('.message');
const btnContinue = document.querySelector('button');
const recoveryForm = document.querySelector('form');

const validarInput = (e) => {

	if(!campos.email.test(e.target.value)){
		e.target.classList.add('error');
		inputMsg.style.display = 'block';
		btnContinue.classList.remove('button-active');
		btnContinue.disabled = true;
	} else {
		e.target.classList.remove('error');
		inputMsg.style.display = 'none';
		btnContinue.classList.add('button-active');
		btnContinue.disabled = false;
	}
};

const passRecovListeners = () => {
	emailRecovery.addEventListener('input', validarInput);
	recoveryForm.addEventListener('submit', async (e) => {
		e.preventDefault();

		const data = { email: emailRecovery.value };

		// Prevent any click while request is "in-process"
		btnContinue.innerHTML = 'Enviando...';
		btnContinue.disabled = true;

		await useFetch(
			endpoints.passRecovery,
			data,
			'POST',
		);

		//Guarda el objeto del correo para que, posteriormente,
		//se reenvie el correo en caso de no enviarlo por primera vez.
		sessionStorage.setItem('email', JSON.stringify(data));

		redirect('email-sent');
	});

	const linkToLogin = document.querySelector('.login');
	linkToLogin.addEventListener('click', () => {
		redirect('login');
	});
};

passRecovListeners();