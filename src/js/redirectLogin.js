import { redirect } from "./redirect";

const btnToLogin = document.querySelector('button');

btnToLogin.addEventListener('click', () => {
	redirect('login');
});