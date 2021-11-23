import { currentUser } from "../utils/getCurrentUser";
import { campos } from "../constants/validators";
import { redirect } from "./redirect";

const backHome = document.querySelector('#back-home');
const profileForm = document.querySelector('form');
const inputNameChange = document.querySelector("#name");
const inputEmailChange = document.querySelector("#email");
const saveBtn = document.querySelector('#save');
const cancelBtn = document.querySelector('#cancel');
const uploadImg = document.querySelector('#file-up');
const img = document.querySelector('.preview');

// Función que llena los inputs del usuario actual
const fillInputs = () => {
	inputNameChange.value = currentUser().name;
	inputEmailChange.value = currentUser().email;
};

// Validación de inputs
const inputs = {
	name: false,
	email: false
};

const validateInputs = (e) => {
	validateInput(campos[e.target.name], e.target, e.target.nextElementSibling);
};

const validateInput = (expresion, input, message) => {

	if(input !== ""){
		saveBtn.style.display = 'block';
		cancelBtn.style.display = 'block';
	}

	if(!expresion.test(input.value)){
		input.classList.remove('active');
		input.classList.add('error');
		message.style.display = 'block';
		inputs[input.name] = false;
	} else {
		input.classList.remove('error');
		input.classList.add('active');
		message.style.display = 'none';
		inputs[input.name] = true;
	}

	const validatedInputs =
		Object.values(inputs).every(value => value);

	if(validatedInputs){
		saveBtn.classList.add('button-active');
		saveBtn.disabled = false;
	} else {
		saveBtn.classList.remove('button-active');
		saveBtn.disabled = true;
	}
};

const profileListeners = () => {
	inputNameChange.addEventListener('input', validateInputs);
	inputEmailChange.addEventListener('input', validateInputs);

	// Actualiza los datos del usuario.
	profileForm.addEventListener('submit', (e) => {
		e.preventDefault();
		console.log('Datos guardados con éxito');
		// Oculta los botones "Guardar cambios" y "Cancelar"
		saveBtn.classList.remove('button-active');
		saveBtn.disabled = true;
		saveBtn.style.display = 'none';
		cancelBtn.style.display = 'none';
	});

	backHome.addEventListener('click', () => {
		redirect('in-app');
	});

	// Carga el preview de la imagen
	uploadImg.addEventListener('change', (e) => {
		img.classList.add('change');
		img.src = URL.createObjectURL(e.target.files[0]);
		saveBtn.style.display = 'block';
		saveBtn.classList.add('button-active');
		saveBtn.disabled = false;
		cancelBtn.style.display = 'block';
	});

	// Regresa a los valores iniciales del perfil
	cancelBtn.addEventListener('click', () => {
		uploadImg.value = '';
		img.classList.remove('change');
		img.src =
		'../../pages/deep_feels_assets/settings_profile/bxs-user.svg';
		saveBtn.style.display = 'none';
		cancelBtn.style.display = 'none';
		saveBtn.classList.remove('button-active');
		saveBtn.disabled = true;
		inputNameChange.classList.remove('active');
		inputEmailChange.classList.remove('active');
		fillInputs();
	});
};

fillInputs();
profileListeners();