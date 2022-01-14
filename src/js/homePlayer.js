import { currentAudio } from "../utils/getCurrentAudio";
import { redirect } from "../utils/redirect";


const backHome = document.querySelector('.arrow-player-container');

backHome.addEventListener('click', () => {
	redirect('in-app');
	sessionStorage.clear();
});

const showData = () => {
	const backImage = document.querySelector('.image-container');
	const imgAudio = currentAudio().img;
	backImage.style.backgroundImage = `url('${imgAudio}')`;
};
showData();