import { LOCATION_API_KEY } from '@/constants/constants';
import type { LocationItem } from '@/types/types';

export const getCity = async (city: string): Promise<LocationItem[]> => {
	try {
		const res = await fetch(
			`https://api.locationiq.com/v1/autocomplete?key=${LOCATION_API_KEY}&q=${city}&limit=10&tag=place:city,place:town,place:village,place:hamlet`,
		);
		if (!res.ok) {
			throw new Error('Город не найден');
		}
		return res.json();
	} catch (err: any) {
		console.error('Не удалось получить список городов', err.message);
		throw new Error(err.message);
	}
};
