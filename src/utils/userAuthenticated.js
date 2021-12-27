import { USER_TOKEN , USER_DATA, USER_ID } from "../constants/keysStorage";
import { redirect } from "./redirect";

export const userAuthenticated = () => {
	if(localStorage.getItem(USER_TOKEN) &&
	localStorage.getItem(USER_ID) &&
	localStorage.getItem(USER_DATA)){
		redirect('in-app');
	}
};