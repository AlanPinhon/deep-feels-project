const resendEmail = document.querySelector('.resend');
const fwdEmail = document.querySelector('.msg-fwd-email');

resendEmail.addEventListener('click', () => {
	fwdEmail.classList.add('active');
	setTimeout(() => {
		fwdEmail.classList.remove('active');
	}, 3000);
});