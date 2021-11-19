import { currentUser } from "../utils/getCurrentUser";
import { redirect } from "./redirect";

const userName = document.querySelector('#user-name');
const accountSettings = document.querySelector('#account-settings');

//Muestra el primer nombre del usuario (en caso de haberse registrado con 2)
userName.textContent = currentUser().name.split(" ")[0];

accountSettings.addEventListener('click', () => {
	redirect('profile-settings');
});