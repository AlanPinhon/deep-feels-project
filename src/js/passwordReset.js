import { redirect } from "../utils/redirect";

const btnToLogin = document.querySelector('button');

btnToLogin.addEventListener('click', () => {
	redirect('login');
});