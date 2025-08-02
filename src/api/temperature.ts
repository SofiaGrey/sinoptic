import { API_KEY, API_URL } from '../constants/constants';
import type { CurrentWeatherType, ForecastWeather } from '../types/types';

interface ApiParams {
	city?: string;
	lat?: string;
	lon?: string;
	lang: string;
	units: string;
}

const withApiKey = (url: string) => `${url}&appid=${API_KEY}`;

const buildUrl = (
	endpoin: string,
	{ city, lat, lon, lang, units }: ApiParams,
) => {
	if (city) {
		return withApiKey(
			`${API_URL}/${endpoin}?q=${city}&lang=${lang}&units=${units}`,
		);
	}
	return withApiKey(
		`${API_URL}/${endpoin}?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}`,
	);
};

const fetchWeather = async (
	endpoint: string,
	params: ApiParams,
	errorMsg: string,
) => {
	const url = buildUrl(endpoint, params);
	console.log(url);
	const res = await fetch(url);
	if (!res.ok) throw new Error(errorMsg);
	return res.json();
};

export const getCurrentWeather = async (
	params: ApiParams,
): Promise<CurrentWeatherType> => {
	const err = params.city
		? `Не удалось получить данные по указанному городу - ${params.city}`
		: `Не удалось получить данные по вашему местоположнию`;
	return fetchWeather('weather', params, err);
};

export const getForecastWeather = async (
	params: ApiParams,
): Promise<ForecastWeather> => {
	const err = params.city
		? `Не удалось получить данные по указанному городу - ${params.city}`
		: `Не удалось получить данные по вашему местоположнию`;
	return fetchWeather('forecast', params, err);
};

export const getAllWeatherData = async (
	params: ApiParams,
): Promise<{
	current: CurrentWeatherType;
	forecast: ForecastWeather;
}> => {
	try {
		const [current, forecast] = await Promise.all([
			getCurrentWeather(params),
			getForecastWeather(params),
		]);
		return { current, forecast };
	} catch (error: any) {
		console.error('Не удалось загрузить данные погоды', error.message);
		throw new Error(error.message);
	}
};
