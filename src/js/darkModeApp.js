const date = new Date();

// Cambia la interfaz al modo obscuro al anochecer y viceversa
if(date.getHours() >= 19 || date.getHours() <= 6){
	document.body.classList.toggle('dark-mode');
}