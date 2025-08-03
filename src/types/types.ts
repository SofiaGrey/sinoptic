export type IconType =
	| 'cloudy'
	| 'drizzle'
	| 'fog'
	| 'hail'
	| 'heavyRain'
	| 'humidity'
	| 'lightRain'
	| 'moon'
	| 'partlyCloudy'
	| 'partlyCloudyNight'
	| 'rain'
	| 'snowflake'
	| 'snow'
	| 'sunny'
	| 'thundershtorm'
	| 'windy';

export interface CurrentWeatherType {
	coord: {
		lon: number;
		lat: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level?: number;
		grnd_level?: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust?: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

export interface ForecastWeather {
	cod: string; // Статус ответа (должен быть "200")
	message: number;
	cnt: number; // Кол-во временных отрезков в массиве `list`
	list: ForecastItem[];
	city: {
		id: number;
		name: string;
		coord: {
			lat: number;
			lon: number;
		};
		country: string;
		population: number;
		timezone: number;
		sunrise: number; // Unix timestamp
		sunset: number; // Unix timestamp
	};
}

export interface ForecastItem {
	dt: number; // Время прогноза (Unix timestamp)
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		sea_level: number;
		grnd_level: number;
		humidity: number;
		temp_kf: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	clouds: {
		all: number; // % облачности
	};
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	visibility: number; // В метрах
	pop: number; // Probability of precipitation — вероятность осадков (0–1)
	sys: {
		pod: string; // Часть суток: "d" (day) или "n" (night)
	};
	dt_txt: string; // Человеко-читаемая дата и время (например, "2025-05-20 12:00:00")
}

export interface LocationItem {
	place_id: string;
	osm_id: string;
	osm_type: string;
	licence: string;
	lat: string;
	lon: string;
	boundingbox: string[];
	class: string;
	type: string;
	display_name: string;
	display_place: string;
	display_address: string;
	address: {
		name: string;
		county: string;
		state?: string;
		country?: string;
		country_code: string;
	};
}
