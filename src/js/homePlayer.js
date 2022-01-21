import { endpoints, API_HOST } from "../constants/endpoints";
import { currentAudio } from "../utils/getCurrentAudio";
import { redirect } from "../utils/redirect";
import { useFetch } from "./API";

// const progressBar = document.querySelector('.progress-bar');
const audio = document.createElement('audio');
const progress = document.querySelector('#progress');

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

const updateProg = (e) => {
	const { duration, currentTime } = e.srcElement;
	const progStatus = (currentTime / duration) * 100;
	progress.style.width = `${progStatus}%`;
};

//Carga el audio seleccionado
const loadAudio = () => {
	const audioID = currentAudio().id;
	audio.src =
	`${API_HOST}${endpoints.stream.replace(':id-audio', audioID)}`;

	//Pausa o reproduce el audio
	const playPauseBtn = document.querySelector('.play-container img');
	playPauseBtn.addEventListener('click', () => {
		if((!audio.paused) && (!audio.ended)){
			audio.pause();
			playPauseBtn.src =
			'../../pages/deep_feels_assets/play-btn.svg';
		} else {
			audio.play();
			playPauseBtn.src =
			'../../pages/deep_feels_assets/pause-btn.svg';
		}
	});

	audio.play();
};

const showData = () => {
	const backImage = document.querySelector('.image-container');
	const imgAudio = currentAudio().img;
	backImage.style.backgroundImage = `url('${imgAudio}')`;

	showPhrases();
	loadAudio();
};

const playerListeners = () => {

	audio.addEventListener('timeupdate', updateProg);

	// Regresa a la página principal y elimina los
	// datos en session storage
	const backHome = document.querySelector('.arrow-player-container');
	backHome.addEventListener('click', () => {
		redirect('in-app');
		sessionStorage.clear();
	});

	showData();
};

playerListeners();