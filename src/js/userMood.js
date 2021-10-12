import { useFetch } from "./API";
import { endpoints } from "../constants/endpoints";
import { USER_ID } from "../constants/keysStorage";

const btnMood = document.querySelector('.button-alert');

let arrayId = [];

const sendMoods = async () => {
	const userID = localStorage.getItem(USER_ID);
	const selectedMoods =
	await useFetch(endpoints.userMood.replace(':id', userID), arrayId, 'PUT');

	console.log(selectedMoods);
	console.log(arrayId);
};

const goHome = () => {
	console.log('Redirigiendo a Inicio');
};

const showMoods = (moods) => {

	const containerMoods = document.querySelector('.container-moods');

	moods.forEach( mood => {
		const { icon, name, _id } = mood;
		const containerMood = document.createElement('div');
		const imgMood = document.createElement('div');
		const nameMood = document.createElement('p');
		const check = document.createElement('img');


		containerMood.classList.add('container-mood');
		imgMood.classList.add('img-container');
		imgMood.style.backgroundImage = `url(${icon})`;
		nameMood.innerText = name;
		nameMood.classList.add('copy');

		containerMood.appendChild(imgMood);
		containerMood.appendChild(nameMood);
		containerMoods.appendChild(containerMood);

		btnMood.addEventListener('click', goHome);

		containerMood.addEventListener('click', () => {

			if(!containerMood.classList.contains('selected')){
				btnMood.removeEventListener('click', sendMoods);
				btnMood.removeEventListener('click', goHome);
				containerMood.classList.add('selected');
				check.setAttribute(
					'src',
					'../pages/deep_feels_assets/Check.svg'
				);
				check.classList.add('check-active');
				containerMood.appendChild(check);
				btnMood.classList.replace('button-alert', 'button-active');
				btnMood.innerText = 'Continuar';
				//Agregar el id al array
				arrayId = [...arrayId, _id];

				btnMood.addEventListener('click', sendMoods);
			} else {
				containerMood.classList.remove('selected');
				containerMood.removeChild(check);
				//Eliminar elementos duplicados en un array
				arrayId = arrayId.filter( id => id !== _id);
			}

			if(!arrayId.length){
				btnMood.removeEventListener('click', goHome);
				btnMood.removeEventListener('click', sendMoods);
				btnMood.classList.replace('button-active', 'button-alert');
				btnMood.innerText =
				'No me siento identificado. Deseo continuar.';
				btnMood.addEventListener('click', goHome);
			}
		});
	});
};

const userMood = async () => {
	const moodsResult = await useFetch(endpoints.moods);
	if(moodsResult.ok){
		showMoods(moodsResult.moods);
	}
};
userMood();