import { endpoints } from "../constants/endpoints";
import { currentAudio } from "../utils/getCurrentAudio";
import { redirect } from "../utils/redirect";
import { useFetch } from "./API";

// Regresa a la página principal y elimina los
// datos en session storage
const backHome = document.querySelector('.arrow-player-container');
backHome.addEventListener('click', () => {
	redirect('in-app');
	sessionStorage.clear();
});

const showPhrases = async () => {
	const phrasesResult = await useFetch(endpoints.phrases,
		null,
		'GET',
		true);

	const phraseEl = document.querySelector('.phrase');
	const authorEl = document.querySelector('.author');
	const { text, author } = phrasesResult.quote;

	phraseEl.textContent = text;

	if(author === null) {
		authorEl.textContent = '- Anonymous';
	} else {
		authorEl.textContent = `- ${author}`;
	}
};

const showData = () => {
	const backImage = document.querySelector('.image-container');
	const imgAudio = currentAudio().img;
	backImage.style.backgroundImage = `url('${imgAudio}')`;
	showPhrases();
};
showData();