// import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

const fetchWeather = async (query) => {
	// const { data } = await axios.get(URL, {
	// 	params: {
	// 		q: query,
	// 		units: 'metric',
	// 		APPID: API_KEY,
	// 	},
	// });

	const jsonData = await fetch(
		`${URL}?q=${query}&units=metric&APPID=${API_KEY}`
	);
	const data = await jsonData.json();
	return data;
};

export default fetchWeather;
