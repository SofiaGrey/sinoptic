import { API_KEY, API_URL } from '../constants/constants';
import type { CurrentWeatherType, ForecastWeather } from '../types/types';

interface ApiParams {
	city?: string;
	lat: string;
	lon: string;
	lang: string;
	units: string;
}
const fetchWeather = async (
	endpoint: string,
	{ city, lat, lon, lang, units }: ApiParams,
) => {
	const res = await fetch(
		`${API_URL}/${endpoint}?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${API_KEY}`,
	);
	if (!res.ok) {
		throw new Error(
			`Не удалось получить данные по указанному городу - ${city}`,
		);
	}
	return res.json();
};

export const getAllWeatherData = async (
	params: ApiParams,
): Promise<{
	current: CurrentWeatherType;
	forecast: ForecastWeather;
}> => {
	try {
		const [current, forecast] = await Promise.all([
			fetchWeather('weather', params),
			fetchWeather('forecast', params),
		]);
		return { current, forecast };
	} catch (error: any) {
		console.error('Не удалось загрузить данные погоды', error.message);
		throw new Error(error.message);
	}
};
