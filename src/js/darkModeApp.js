const momentDay = document.querySelector('.moment-day');
const logoDeep = document.querySelector('.logo-container a img');
const date = new Date();
// Cambia la interfaz al modo obscuro al anochecer y viceversa
if(date.getHours() >= 19 || date.getHours() <= 6){
	document.body.classList.toggle('dark-mode');
	logoDeep.setAttribute('src',
		'./deep_feels_assets/deep-feels-logo/large_deep_feels_white.svg');
}
// Dias: 5:00 a.m. - 11:59 a.m.
// Tardes: 12:00 pm - 7:59 p.m.
// Noches 8:00 p.m. - 4:59 a.m.

if (date.getHours() >= 20 || date.getHours() < 5) {
	momentDay.textContent = 'Buenas noches.';
} else if (date.getHours() >= 12) {
	momentDay.textContent = 'Buenas tardes.';
} else if (date.getHours() >= 5){
	momentDay.textContent = 'Buenos días.';
}