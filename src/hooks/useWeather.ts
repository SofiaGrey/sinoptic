import { getAllWeatherData } from '@/api/temperature';
import { useQuery } from '@tanstack/react-query';

export const useWeather = (lat: string, lon: string) => {
	return useQuery({
		queryKey: ['weatherData', lat, lon],
		queryFn: () => getAllWeatherData({ lat, lon, lang: 'ru', units: 'metric' }),
		retry: 1,
	});
};
