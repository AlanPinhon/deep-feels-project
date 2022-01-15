import { AUDIO_DATA } from "../constants/keysStorage";

// Trae los datos del audio seleccionado almacenados en Session Storage
const currentAudio = () => {
	return JSON.parse(sessionStorage.getItem(AUDIO_DATA));
};

export{
	currentAudio
};