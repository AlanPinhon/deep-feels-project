// const formulario = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#pass');

const emailExpression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const validarFormulario = () => {

	if(nameInput.value.length < 2){
		console.log('Ingrese un nombre válido');
	}

	if(!emailExpression.test(emailInput.value)){
		console.log('Ingrese un email válido');
	}

	if(passwordInput.value.length < 6){
		console.log('La contraseña debe ser mayor a 6 caracteres');
	}
};

const eventListeners = () => {
	nameInput.addEventListener('blur', validarFormulario);
	emailInput.addEventListener('blur', validarFormulario);
	passwordInput.addEventListener('blur', validarFormulario);
};

export {
	eventListeners
};