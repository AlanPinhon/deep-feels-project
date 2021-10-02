import { endpoints } from "../constants/endpoints";
import { USER_ID, USER_TOKEN } from "../constants/keysStorage";
import { useFetch } from "./API";

const btnRegister = document.querySelector('button');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#pass');
const formulario = document.querySelector('form');
const msgError = document.querySelector('.message-error');

const camposValidacion = {
	name: false,
	email: false,
	password: false
};

const validarFormulario = (e) => {

	const campos = {
		name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, //Letras, espacios y acentos.
		password: /^.{7,20}$/, //Password 7 a 20 dígitos.
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
	};
	validarCampo(campos[e.target.name], e.target, e.target.nextElementSibling);
};

const validarCampo = (expresion, input, message) => {

	if(!expresion.test(input.value)){
		input.classList.remove('active');
		input.classList.add('error');
		message.style.display = 'block';
		camposValidacion[input.name] = false;
	} else {
		input.classList.remove('error');
		input.classList.add('active');
		message.style.display = 'none';
		camposValidacion[input.name] = true;
	}

	const camposValidados =
		Object.values(camposValidacion).every(value => value);

	if(camposValidados){
		btnRegister.classList.add('button-active');
		btnRegister.disabled = false;
	} else {
		btnRegister.classList.remove('button-active');
		btnRegister.disabled = true;
	}
};

const registerListeners = () => {
	nameInput.addEventListener('input', validarFormulario);
	emailInput.addEventListener('input', validarFormulario);
	passwordInput.addEventListener('input', validarFormulario);

	formulario.addEventListener('submit', async (e) => {
		e.preventDefault();
		const body = {
			name: nameInput.value,
			email: emailInput.value,
			password: passwordInput.value
		};

		// Loader to prevent many click while request is "in-process"
		btnRegister.innerHTML = 'Registrando...';
		btnRegister.disabled = true;

		const result = await useFetch (endpoints.register ,body);
		if(result.ok) {
			localStorage.setItem(USER_ID, result.user._id);
			localStorage.setItem(USER_TOKEN, result.token);
			btnRegister.innerText = 'Registrado';
		} else {
			btnRegister.classList.remove('button-active');
			btnRegister.disabled = true;

			// If request fails, we need to retrieve
			// "Registrar" instead "Registrando...":
			btnRegister.innerText = 'Registrar';

			msgError.style.display = 'block';
		}

		setTimeout(() => {
			msgError.style.display = 'none';
		}, 2000);
	});
};
registerListeners();