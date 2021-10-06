import { useFetch } from "./API";
import { endpoints } from "../constants/endpoints";

const showMoods = (moods) => {

	const containerMoods = document.querySelector('.container-moods');

	moods.forEach( mood => {
		const { icon, name } = mood;
		const containerMood = document.createElement('div');
		const imgMood = document.createElement('img');
		const nameMood = document.createElement('p');

		containerMood.classList.add('container-mood');
		imgMood.setAttribute('src', icon);
		nameMood.innerText = name;
		nameMood.classList.add('copy');

		containerMood.appendChild(imgMood);
		containerMood.appendChild(nameMood);
		containerMoods.appendChild(containerMood);
	});
};


const userMood = async () => {
	const moodsResult = await useFetch(endpoints.moods);
	if(moodsResult.ok){
		showMoods(moodsResult.moods);
		console.log(moodsResult.moods);
	}
};
userMood();