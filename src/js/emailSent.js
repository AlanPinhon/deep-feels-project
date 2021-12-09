import { useFetch } from "./API";
import { endpoints } from "../constants/endpoints";
import { redirect } from "../utils/redirect";

const resendEmail = document.querySelector('.resend');
const fwdEmail = document.querySelector('.msg-fwd-email');

if(!sessionStorage.getItem('email')){
	redirect('login');
}

resendEmail.addEventListener('click', async (e) => {
	e.preventDefault();

	const textoActual = resendEmail.textContent;
	resendEmail.textContent = 'Reenviando...';
	resendEmail.disabled = true;

	await useFetch(
		endpoints.passRecovery,
		//Toma el objeto del correo y lo reenvía al servidor.
		JSON.parse(sessionStorage.getItem('email')),
		'POST'
	);

	resendEmail.textContent = textoActual;
	resendEmail.disabled = false;

	fwdEmail.classList.add('active');
	setTimeout(() => {
		fwdEmail.classList.remove('active');
	}, 3000);
});