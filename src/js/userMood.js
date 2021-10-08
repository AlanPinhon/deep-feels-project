import { useFetch } from "./API";
import { endpoints } from "../constants/endpoints";

const showMoods = (moods) => {

	const containerMoods = document.querySelector('.container-moods');
	let arrayId = [];

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

		containerMood.addEventListener('click', () => {

			if(!containerMood.classList.contains('selected')){
				containerMood.classList.add('selected');
				check.setAttribute(
					'src',
					'../pages/deep_feels_assets/Check.svg'
				);
				check.classList.add('check-active');
				containerMood.appendChild(check);
				//Agregar el id al array
				arrayId = [...arrayId, _id];
			} else {
				containerMood.classList.remove('selected');
				containerMood.removeChild(check);
				arrayId = arrayId.filter( id => id !== _id);
			}
			//Eliminar elementos duplicados en un array
			console.log(arrayId);
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