import { AUDIO_DATA } from "../constants/keysStorage";
import { redirect } from "../utils/redirect";

const backHome = document.querySelector('.arrow-player-container');

backHome.addEventListener('click', () => {
	redirect('in-app');
	sessionStorage.clear();
});

const showData = () => {
	console.log(JSON.parse(sessionStorage.getItem(AUDIO_DATA)));
};
showData();