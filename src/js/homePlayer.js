import { endpoints, API_HOST } from "../constants/endpoints";
import { currentAudio } from "../utils/getCurrentAudio";
import { redirect } from "../utils/redirect";
import { useFetch } from "./API";

const audioTime = document.querySelector('.audio-time');
const totalTime = document.querySelector('.finish-time');
const audio = document.createElement('audio');
const progress = document.querySelector('#progress');
const playPauseBtn = document.querySelector('.play-container img');

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

const calculateTime = secs => {
	const minutes = Math.floor(secs / 60);
	const seconds = Math.floor(secs % 60);

	const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
	return `${minutes}:${returnedSeconds}`;
};

const updateProg = (e) => {
	const { duration, currentTime } = e.srcElement;
	const progStatus = (currentTime / duration) * 100;
	progress.style.width = `${progStatus}%`;
};

const setProgress = (e) => {
	const totalWidth = e.currentTarget.offsetWidth;
	const progWidth = e.offsetX;

	const current = ( progWidth / totalWidth) * audio.duration;
	audio.currentTime = current;
};

const progressTime = (e) => {
	const totalWidth = e.currentTarget.offsetWidth;
	const progWidth = e.offsetX;

	const current = ( progWidth / totalWidth) * audio.duration;
	const audioDuration = current;

	audioTime.textContent = calculateTime(audioDuration);
};

const duration = () =>{
	totalTime.textContent = calculateTime(audio.duration);
};

//Carga el audio seleccionado
const loadAudio = () => {
	const audioID = currentAudio().id;
	audio.src =
	`${API_HOST}${endpoints.stream.replace(':id-audio', audioID)}`;

	//Pausa o reproduce el audio
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
	// Regresa a la página principal y elimina los
	// datos en session storage
	const backHome = document.querySelector('.arrow-player-container');
	backHome.addEventListener('click', () => {
		redirect('in-app');
		sessionStorage.clear();
	});

	//Eventos para la barra de progreso
	const progressBar = document.querySelector('.progress-bar');
	progressBar.addEventListener('click', setProgress);
	progressBar.addEventListener('click', progressTime);
	//Eventos para el audio

	audio.addEventListener('timeupdate', updateProg);
	audio.addEventListener('loadeddata', duration);
	audio.ontimeupdate = function(){
		audioTime.textContent = calculateTime(audio.currentTime);

		if(audio.ended){
			audioTime.textContent = '0:00';
			progress.style.width = 0;
			playPauseBtn.src =
				'../../pages/deep_feels_assets/play-btn.svg';
		}
	};

	showData();
};

playerListeners();