import { USER_TOKEN } from "../constants/keysStorage";

export const useFetch =
async (endpoint ,data, method = 'GET', credentials) => {
	try {
		const url = `https://deep-feels-backend.herokuapp.com/${endpoint}`;

		const fetchOptions = {
			method,
			headers: {
				'Content-Type' : 'application/json'
			}
		};

		if(data){
			fetchOptions.body = JSON.stringify(data);
		}

		if(credentials){
			fetchOptions.headers.Authorization =
				localStorage.getItem(USER_TOKEN);
		}

		const response = await fetch(url, fetchOptions);
		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error);
	}
};