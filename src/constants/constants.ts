export const API_URL = 'https://api.openweathermap.org/data/2.5';
export const mbar = 0.75006;

export const APIS = {
	API_KEY: import.meta.env.VITE_WEATHER_API_KEY,
	LOCATION_API_KEY: import.meta.env.VITE_LOCATION_API_KEY,
};

export const ROUTES = {
	main: '/',
	weater: '/weather',
	error: '/error',
};
