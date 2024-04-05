import axios from 'axios';

const BASE_URL = 'https://v3.football.api-sports.io';
const API_KEY = process.env.REACT_APP_API_KEY;

const options = {
	headers: {
		'x-rapidapi-key': API_KEY,
		'x-rapidapi-host': 'v3.football.api-sports.io',
	},
};

export const fetchFromAPI = async (url: string) => {
	const { data } = await axios.get(`${BASE_URL}/${url}`, options);
	return data;
};
