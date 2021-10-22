import { redirect } from "./redirect";

const resendEmail = document.querySelector('.resend');
const fwdEmail = document.querySelector('.msg-fwd-email');
const linkToLogin = document.querySelector('.login');

linkToLogin.addEventListener('click', () => {
	redirect('login');
});

resendEmail.addEventListener('click', () => {
	fwdEmail.classList.add('active');
	setTimeout(() => {
		fwdEmail.classList.remove('active');
	}, 3000);
});