import { redirect } from "./redirect";
import { campos } from "../constants/validators";

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
	recoveryForm.addEventListener('submit', (e) => {
		e.preventDefault();

		console.log('Enviando correo...');
		// Prevent any click while request is "in-process"
		btnContinue.innerHTML = 'Enviando...';
		btnContinue.disabled = true;

		redirect('email-sent');
	});

	const linkToLogin = document.querySelector('.login');
	linkToLogin.addEventListener('click', () => {
		redirect('login');
	});
};

passRecovListeners();