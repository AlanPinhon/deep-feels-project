
export const useFetch = async (endpoint ,data, method = 'GET') => {
	try {
		const url = `https://deep-feels-backend.herokuapp.com/${endpoint}`;

		const fetchOptions = {
			method,
			headers: {
				'Content-Type' : 'application/json'
			},
		};

		if(data){
			fetchOptions.body = JSON.stringify(data);
		}

		const response = await fetch(url);
		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error);
	}
};