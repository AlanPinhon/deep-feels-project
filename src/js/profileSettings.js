import { currentUser } from "../utils/getCurrentUser";
import { campos } from "../constants/validators";
import { redirect } from "./redirect";
import { useFetch } from "./API";
import { USER_DATA, USER_ID } from "../constants/keysStorage";
import { endpoints } from "../constants/endpoints";

const backHome = document.querySelector('#back-home');
const profileForm = document.querySelector('form');
const inputNameChange = document.querySelector("#name");
const inputEmailChange = document.querySelector("#email");
const saveBtn = document.querySelector('#save');
const cancelBtn = document.querySelector('#cancel');
const uploadImg = document.querySelector('#file-up');
const img = document.querySelector('.preview');
const fwdEmail = document.querySelector('.msg-fwd-email');
const backColor = document.querySelector('.profile-img');


// Función que llena los inputs del usuario actual
const fillInputs = () => {
	inputNameChange.value = currentUser().name || '';
	inputEmailChange.value = currentUser().email || '';
	if(currentUser().photo){
		backColor.classList.remove('back-color');
		img.classList.add('change');
		img.src = currentUser().photo;
	} else {
		backColor.classList.add('back-color');
		img.classList.remove('change');
		img.src = '../../pages/deep_feels_assets/settings_profile/bxs-user.svg';
	}
};

// Validación de inputs
const inputs = {
	name: false,
	email: false
};

// let payLoad = {};

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
		// payLoad = { ... payLoad, [input.name] : input.value };
	}

	const validatedInputs =
		Object.values(inputs).some(value => value);

	if(validatedInputs){
		saveBtn.classList.add('button-active');
		saveBtn.disabled = false;
	} else {
		saveBtn.classList.remove('button-active');
		saveBtn.disabled = true;
	}
};

const cancelChanges = () =>{

	// Elimina el valor del input de la imagen seleccionada
	uploadImg.value = '';
	if(currentUser().photo){
		img.classList.add('change');
		backColor.classList.remove('back-color');
	} else{
		img.classList.remove('change');
		backColor.classList.add('back-color');
	}
	img.src = currentUser().photo ||
		'../../pages/deep_feels_assets/settings_profile/bxs-user.svg';
	saveBtn.style.display = 'none';
	cancelBtn.style.display = 'none';
	saveBtn.classList.remove('button-active');
	saveBtn.disabled = true;
	inputNameChange.classList.remove('active');
	inputEmailChange.classList.remove('active');
	// payLoad = {};
	fillInputs();
};

const profileListeners = () => {
	inputNameChange.addEventListener('input', validateInputs);
	inputEmailChange.addEventListener('input', validateInputs);

	// Actualiza los datos del usuario.
	profileForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		saveBtn.textContent = 'Guardando cambios...';

		try {
			const userID = localStorage.getItem(USER_ID);
			const upgradeResult = await useFetch(
				endpoints.editProfile.replace(':id', userID),
				new FormData(profileForm),
				'PUT',
				true
			);

			if(upgradeResult.ok){
				localStorage.setItem(
					USER_DATA, JSON.stringify(upgradeResult.user));
				// Muestra el mensaje de los cambios guardados con éxito.
				fwdEmail.classList.add('active');
				setTimeout(() => {
					fwdEmail.classList.remove('active');
				}, 3000);
			}
		} catch (error) {
			cancelChanges();
			console.log('Ocurrió un error');
		}

		// Oculta los botones "Guardar cambios" y "Cancelar"
		saveBtn.classList.remove('button-active');
		saveBtn.disabled = true;
		saveBtn.style.display = 'none';
		cancelBtn.style.display = 'none';
		saveBtn.textContent = 'Guardar cambios';
		// payLoad = {};
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
		// payLoad = { ...payLoad, [e.target.name] : e.target.files[0] };
	});

	// Regresa a los valores iniciales del perfil
	cancelBtn.addEventListener('click', cancelChanges);
};

fillInputs();
profileListeners();