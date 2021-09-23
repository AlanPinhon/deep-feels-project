const btnRegister = document.querySelector('button');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#pass');

const camposValidacion = {
	name: false,
	email: false,
	password: false
};

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, //Letras y espacios, pueden llevar acentos.
	password: /^.{6,20}$/, //Password 6 a 20 dígitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};

const validarFormulario = (e) => {
	const { nombre, password, correo } = expresiones;

	const campos = {
		name: validarCampo(nombre , e.target, e.target.nextElementSibling),
		email: validarCampo(correo, e.target, e.target.nextElementSibling),
		password: validarCampo(password, e.target, e.target.nextElementSibling)
	};
	campos[e.target.name]();
};

const validarCampo = (expresion, input, message) => () => {

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

	if(camposValidados)
		btnRegister.classList.add('button-active');
	else
		btnRegister.classList.remove('button-active');

};

const registerListeners = () => {
	nameInput.addEventListener('input', validarFormulario);
	emailInput.addEventListener('input', validarFormulario);
	passwordInput.addEventListener('input', validarFormulario);
};

export{
	registerListeners
};