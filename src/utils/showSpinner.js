export const showSpinner = () => {
	const audioCont = document.querySelector('.audios-container');

	const spinner = document.createElement('div');
	spinner.classList.add('spinner');

	spinner.innerHTML = `
		<div class="double-bounce1"></div>
  	<div class="double-bounce2"></div>
	`;

	audioCont.appendChild(spinner);
};