import { API_KEY } from '../constants/constants';
import type { CurrentWeatherType, ForecastWeather } from '../types/types';

interface ApiParams {
	city?: string;
	lat?: string;
	lon?: string;
	lang: string;
	units: string;
}

export const getCurrentWeather = async ({
	city,
	lat,
	lon,
	lang,
	units,
}: ApiParams): Promise<CurrentWeatherType> => {
	if (city) {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&units=${units}&appid=${API_KEY}`,
		);
		if (!res.ok)
			throw new Error(
				`Не удалось получить данные по указанному городу - ${city}`,
			);
		return res.json();
	} else {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${API_KEY}`,
		);
		if (!res.ok)
			throw new Error(`Не удалось получить данные по вашему местоположнию`);
		return res.json();
	}
};

export const getForecastWeather = async ({
	city,
	lat,
	lon,
	lang,
	units,
}: ApiParams): Promise<ForecastWeather> => {
	if (city) {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=${units}&appid=${API_KEY}`,
		);
		if (!res.ok)
			throw new Error(
				`Не удалось получить данные по указанному городу - ${city}`,
			);
		return res.json();
	} else {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${API_KEY}`,
		);
		if (!res.ok)
			throw new Error(`Не удалось получить данные по вашему местополоджению`);
		return res.json();
	}
};

export const getAllWeatherData = async ({
	city,
	lat,
	lon,
	lang,
	units,
}: ApiParams): Promise<{
	current: CurrentWeatherType;
	forecast: ForecastWeather;
}> => {
	try {
		const [current, forecast] = await Promise.all([
			getCurrentWeather({city, lat, lon, lang, units}),
			getForecastWeather({city, lat, lon, lang, units}),
		]);
		return { current, forecast };
	} catch (error: any) {
		console.error('Не удалось загрузить данные погоды', error.message);
		throw new Error(error.message);
	}
};
