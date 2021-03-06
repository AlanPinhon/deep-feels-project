import { API_HOST } from "../constants/endpoints";
import { USER_TOKEN } from "../constants/keysStorage";
import { redirect } from "../utils/redirect";



export const useFetch =
async (endpoint ,data, method = 'GET', credentials) => {
	try {
		const url = `${API_HOST}${endpoint}`;

		const fetchOptions = {
			method,
			headers: {
				'Content-Type' : 'application/json'
			}
		};

		if(data){
			if(data instanceof FormData){
				delete fetchOptions.headers["Content-Type"];
				fetchOptions.body = data;
			} else {
				fetchOptions.body = JSON.stringify(data);
			}
		}

		if(credentials){
			fetchOptions.headers.Authorization =
				localStorage.getItem(USER_TOKEN);
		}

		const response = await fetch(url, fetchOptions);
		const result = await response.json();

		if(response.status === 401){
			localStorage.clear();
			redirect('login');
		}

		return result;
	} catch (error) {
		console.log(error);
	}
};