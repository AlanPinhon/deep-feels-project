import { USER_DATA } from "../constants/keysStorage";

// Trae los datos del usuario almacenados en Local Storage
const currentUser = () => {
	return JSON.parse(localStorage.getItem(USER_DATA));
};

export{
	currentUser
};