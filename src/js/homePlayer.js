import { endpoints, API_HOST } from "../constants/endpoints";
import { currentAudio } from "../utils/getCurrentAudio";
import { redirect } from "../utils/redirect";
import { useFetch } from "./API";
import { timeConversion } from "./timeConversion";

// Regresa a la página principal y elimina los
// datos en session storage
const backHome = document.querySelector('.arrow-player-container');
backHome.addEventListener('click', () => {
	redirect('in-app');
	sessionStorage.clear();
});

// Muestra las frases de inspiración en el reproductor
const showPhrases = async () => {
	const phrasesResult = await useFetch(endpoints.phrases,
		null,
		'GET',
		true);

	const phraseEl = document.querySelector('.phrase');
	const authorEl = document.querySelector('.author');
	const { text, author } = phrasesResult.quote;

	phraseEl.textContent = text;
	authorEl.textContent = `- ${author || 'Anonymous'}`;
};

const loadAudio = () => {
	const audio = document.createElement('audio');
	const audioID = currentAudio().id;
	audio.src =
	`${API_HOST}${endpoints.stream.replace(':id-audio', audioID)}`;

	// audio.play();
};

const showData = () => {
	const backImage = document.querySelector('.image-container');
	const imgAudio = currentAudio().img;
	backImage.style.backgroundImage = `url('${imgAudio}')`;

	const finishTime = document.querySelector('.finish-time');
	const endTimeAudio = currentAudio().duration;
	const conversionTime = timeConversion(endTimeAudio);

	finishTime.textContent = `${conversionTime}:00`;
	showPhrases();
	loadAudio();
};
showData();