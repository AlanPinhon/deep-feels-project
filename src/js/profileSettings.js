import { currentUser } from "../utils/getCurrentUser";
import { campos } from "../constants/validators";
import { redirect } from "./redirect";

const backHome = document.querySelector('#back-home');
const profileForm = document.querySelector('form');
const inputNameChange = document.querySelector("#name");
const inputEmailChange = document.querySelector("#email");
const saveBtn = document.querySelector('#save');
const cancelBtn = document.querySelector('#cancel');

const fillInputs = () => {
	inputNameChange.value = currentUser().name;
	inputEmailChange.value = currentUser().email;
};

const inputs = {
	name: false,
	email: false
};

const validateInputs = (e) => {
	validateInput(campos[e.target.name], e.target, e.target.nextElementSibling);
};

const validateInput = (expresion, input, message) => {

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

	profileForm.addEventListener('submit', (e) => {
		e.preventDefault();
		console.log('Datos guardados con éxito');
		saveBtn.classList.remove('button-active');
		saveBtn.disabled = true;
	});

	backHome.addEventListener('click', () => {
		redirect('in-app');
	});

	cancelBtn.addEventListener('click', () => {
		fillInputs();
	});
};

fillInputs();
profileListeners();