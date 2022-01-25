import { AUDIO_DATA } from "../constants/keysStorage";
import { timeConversion } from "../js/timeConversion";
import { redirect } from "./redirect";

export const showSounds = (audios) => {
	const audioCont = document.querySelector('.audios-container');

	while (audioCont.firstChild) {
		audioCont.removeChild(audioCont.firstChild);
	}

	audios.forEach( audio =>{
		const { image, avgColor, duration, name, _id } = audio;

		const containerAudio = document.createElement('div');
		const containerImg = document.createElement('div');
		const containerInfo = document.createElement('div');
		const containerPlay = document.createElement('div');
		const playBtn = document.createElement('img');
		const nameAudio = document.createElement('p');
		const durationAudio = document.createElement('p');

		const time = timeConversion(duration);

		containerAudio.style.backgroundColor = avgColor;
		containerAudio.classList.add('audio-container');

		containerImg.style.backgroundImage = `url(${image})`;
		containerImg.classList.add('img-container');

		containerInfo.classList.add('info-container');
		nameAudio.classList.add('name-audio');
		durationAudio.classList.add('time-audio');

		containerPlay.classList.add('play-btn');
		playBtn.setAttribute('src',
			'../../../pages/deep_feels_assets/play-btn.svg');

		playBtn.id = _id;

		nameAudio.innerText = name;
		durationAudio.innerText = `${time} minutos`;

		// Append de los elementos que conforman cada audio
		containerPlay.appendChild(playBtn);
		containerInfo.appendChild(nameAudio);
		containerInfo.appendChild(durationAudio);

		containerAudio.appendChild(containerImg);
		containerAudio.appendChild(containerInfo);
		containerAudio.appendChild(containerPlay);
		audioCont.appendChild(containerAudio);

		//Se envía el id a la url para la reproducción del audio.
		playBtn.addEventListener('click', async () => {
			const dataAudio = {
				img: image,
				id: _id
			};

			sessionStorage.setItem(AUDIO_DATA, JSON.stringify(dataAudio));
			redirect('home-player');
		});

	});
};