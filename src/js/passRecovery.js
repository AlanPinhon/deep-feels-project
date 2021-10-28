import { campos } from "../constants/validators";

const newPass = document.querySelector('#new-pass');
const confirmPass = document.querySelector('#confirm-pass');
const alertMsg = document.querySelector('.message');
const samePassMsg = document.querySelector('.same-pass');
const btnRestore = document.querySelector('button');
const passwordForm = document.querySelector('form');

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

	passwordForm.addEventListener('submit', (e) => {
		e.preventDefault();

		console.log('Contraseña restablecida');

		btnRestore.disabled = true;
	});
};

recoveryPassListeners();