import type { ForecastItem } from '../types/types';

export const getWeatherIcon = (code: number, date: string | Date) => {
	const hour = new Date(date).getHours();

	const isDay = hour >= 6 && hour < 20;
	if (code >= 200 && code <= 231) return 'thundershtorm';
	if (code >= 300 && code <= 321) return 'drizzle';
	if (code === 500) return 'lightRain';
	if (code === 501) return 'lightRain';
	if (code === 500) return 'rain';
	if (code >= 502 && code <= 531) return 'heavyRain';
	if (code >= 600 && code <= 601) return 'snowflake';
	if (code >= 602 && code <= 622) return 'snow';
	if (code >= 701 && code <= 781) return 'fog';
	if (code >= 801 && code <= 803)
		return isDay ? 'partlyCloudy' : 'partlyCloudyNight';
	if (code === 804) return 'cloudy';
	if (code === 800) return isDay ? 'sunny' : 'moon';
	return 'sunny';
};

export const formatUnixDate = (
	timestamp: number,
	format: 'time' | 'date' | 'week' | 'day',
) => {
	const date = new Date(timestamp * 1000);

	if (format === 'time') {
		return date.toLocaleString('ru', {
			hour: 'numeric',
			minute: 'numeric',
		});
	}
	if (format === 'date') {
		return date
			.toLocaleDateString('ru', {
				weekday: 'long',
				day: 'numeric',
				month: 'short',
				hour: 'numeric',
				minute: 'numeric',
			})
			.replace(',', ' ')
			.replace('.,', ' ');
	}

	// if (format === 'week') {
	// 	return date.toLocaleString('ru', {
	// 		weekday: 'long',
	// 	})
	// }
	// if (format === 'day') {
	// 	return date.toLocaleString('ru', {
	// 		day: 'numeric',
	// 		month: 'short',
	// 	})
	// }
	// // return { formatDate, formatTime };
	// return formatTime;
};

export const setBackground = (code: number, date: Date) => {
	const hour = new Date(date).getHours();

	const isDay = hour >= 6 && hour < 20;
	if (code >= 200 && code <= 231) return 'thundershtorm.webp';
	if (code >= 300 && code <= 321) return 'drizzle.webp';
	if (code === 500) return 'rain2.webp';
	if (code === 501) return 'rain2.webp';
	if (code === 500) return 'rain.webp';
	if (code >= 502 && code <= 531) return 'heavyRain.webp';
	if (code >= 600 && code <= 601) return 'snowFlake.webp';
	if (code >= 602 && code <= 622) return 'snow.webp';
	if (code >= 701 && code <= 781) return 'fog.webp';
	if (code >= 801 && code <= 803)
		return isDay ? 'partlyCloudy.webp' : 'cloudyNight.webp';
	if (code === 804) return 'cloudy.webp';
	if (code === 800) return isDay ? 'sunny2.webp' : 'clearNight.webp';
	return 'sunny2.webp';
};

export const findMostFrequentNumber = (weatherForDay: ForecastItem[]) => {
	const countMap: { [key: number]: { count: number; descr: string } } = {};

	// Подсчёт количества повторений каждого числа
	for (const obj of weatherForDay) {
		const id = obj.weather[0].id;
		const descr = obj.weather[0].description;

		if (countMap[id]) {
			countMap[id].count += 1;
		} else {
			countMap[id] = { count: 1, descr: descr };
		}
	}

	// Поиск числа с максимальным количеством повторений
	let mostFrequent: { code: number; desc: string } | null = null;
	let maxCount = 0;

	for (const key in countMap) {
		if (countMap[key].count > maxCount) {
			maxCount = countMap[key].count;
			mostFrequent = {
				code: Number(key),
				desc: countMap[key].descr,
			};
		}
	}

	return mostFrequent;
};

export const roundTemp = (temp: number): string => {
	return `${temp > 0 ? '+' : ''}${Math.round(temp)}°`;
};

export const formatForecastKey = (key: string) => {
	const [day, month, year] = key.split('.');
	const date = new Date(`${year}-${month}-${day}`);
	const weekday = date.toLocaleString('ru-RU', { weekday: 'long' });
	const dayMonth = date.toLocaleString('ru-RU', {
		day: 'numeric',
		month: 'short',
	});
	return {
		weekday,
		dayMonth,
	};
};

export const capitalize = (str: string) => {
	return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};

export const setColor = (num: string | number) => {
	const temp = num.split(/[°\+]/)[1];
	console.log(temp)
	if (temp <= -20) return '#001f4d';
	if (temp >= -19 && temp <= -10) return '#004080';
	if (temp >= -9 && temp <= 0) return '#5fa4e8ff';
	if (temp >= 1 && temp <= 9) return '#72d0ffff';
	if (temp >= 10 && temp <= 29) return '#FFD259';
	if (temp >= 30) return '#ff5733';
};
