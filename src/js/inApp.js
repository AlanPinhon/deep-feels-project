import { currentUser } from "../utils/getCurrentUser";
import { redirect } from "./redirect";

const userName = document.querySelector('#user-name');
const accountSettings = document.querySelector('#account-settings');
const img = document.querySelector('.preview');
const backColor = document.querySelector('.profile-settings-container');
const momentDay = document.querySelector('.moment-day');
const logoDeep = document.querySelector('.logo');
const date = new Date();


if(date.getHours() >= 19 || date.getHours() <= 6){
	logoDeep.src =
	'../../pages/deep_feels_assets/deep-feels-logo/large_deep_feels_white.svg';
}

if(currentUser().photo){
	backColor.classList.remove('back-color');
	img.classList.add('change');
	img.src = currentUser().photo;
} else {
	backColor.classList.add('back-color');
	img.classList.remove('change');
	img.src = '../../pages/deep_feels_assets/settings_profile/bxs-user.svg';
}

// Dias: 5:00 a.m. - 11:59 a.m.
// Tardes: 12:00 pm - 7:59 p.m.
// Noches 8:00 p.m. - 4:59 a.m.

if(date.getHours() >= 20 || date.getHours() < 5){
	momentDay.textContent = 'Buenas noches.';
} else if (date.getHours() >= 12 && date.getHours() < 20){
	momentDay.textContent = 'Buenas tardes.';
} else if (date.getHours() >= 5 && date.getHours() < 12){
	momentDay.textContent = 'Buenos días.';
}

//Muestra el primer nombre del usuario (en caso de haberse registrado con 2)
userName.textContent = currentUser().name.split(" ")[0];

accountSettings.addEventListener('click', () => {
	redirect('profile-settings');
});