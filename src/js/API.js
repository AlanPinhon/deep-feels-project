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

			if(Object.values(data).some(value => value?.type)){
				fetchOptions.headers["Content-Type"] = 'multipart/form-data';
				console.log(fetchOptions);
			}

			fetchOptions.body = JSON.stringify(data);
			console.log(fetchOptions);

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