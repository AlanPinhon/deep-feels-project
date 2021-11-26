import { currentUser } from "../utils/getCurrentUser";
import { redirect } from "./redirect";

const userName = document.querySelector('#user-name');
const accountSettings = document.querySelector('#account-settings');
const img = document.querySelector('.preview');
const backColor = document.querySelector('.profile-settings-container');

if(currentUser().photo){
	backColor.classList.remove('back-color');
	img.classList.add('change');
	img.src = currentUser().photo;
} else {
	backColor.classList.add('back-color');
	img.classList.remove('change');
	img.src = '../../pages/deep_feels_assets/settings_profile/bxs-user.svg';
}

//Muestra el primer nombre del usuario (en caso de haberse registrado con 2)
userName.textContent = currentUser().name.split(" ")[0];

accountSettings.addEventListener('click', () => {
	redirect('profile-settings');
});