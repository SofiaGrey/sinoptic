import { API_KEY } from '../constants/constants';
import type { CurrentWeatherType, ForecastWeather } from '../types/types';

export const getCurrentWeather = async (
	city: string,
	lang: string = 'ru',
	units: string = 'metric',
): Promise<CurrentWeatherType> => {
	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&units=${units}&appid=${API_KEY}`,
	);
	if (!res.ok) throw new Error(`Не удалось получить данные по указанному городу - ${city}`);

	await new Promise((resolve) => setTimeout(resolve, 1000));
	return res.json();
};

export const getForecastWeather = async (
	city: string,
	lang: string = 'ru',
	units: string = 'metric',
): Promise<ForecastWeather> => {
	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=${units}&appid=${API_KEY}`,
	);
	if (!res.ok) throw new Error(`Не удалось получить данные по указанному городу - ${city}`);
	return res.json();
};

export const getAllWeatherData = async (
	city: string,
	lang: string = 'ru',
	units: string = 'metric',
):Promise<{current: CurrentWeatherType, forecast: ForecastWeather}> => {
	try {
		const [current, forecast] = await Promise.all([
			getCurrentWeather(city, lang, units),
			getForecastWeather(city, lang, units),
		]);
		return { current, forecast };
	} catch (error: any) {
		console.error('Не удалось загрузить данные погоды', error.message);
		throw new Error(error.message);
	}
};

