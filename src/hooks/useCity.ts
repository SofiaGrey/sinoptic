import { getCity } from '@/api/location';
import { useQuery } from '@tanstack/react-query';

export const useCity = (city: string) => {
	return useQuery({
		queryKey: ['location', city],
		queryFn: () => getCity(city),
		enabled: city.length >= 3,
		retry: 1,
	});
};
