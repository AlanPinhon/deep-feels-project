const url = 'https://deep-feels-backend.herokuapp.com/user/register';

export const newUser = async data => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type' : 'application/json'
			}
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error);
	}
};