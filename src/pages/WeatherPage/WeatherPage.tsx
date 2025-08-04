import { getAllWeatherData } from '@/api/temperature';
import {
	Container,
	CurrentWeather,
	Error,
	FiveDayForecast,
	Forecast,
	Loader,
	Main,
	Search,
} from '@/components';
import { setBackground } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import styles from './WeatherPage.module.scss';
import { useMemo } from 'react';

const getCoords = (name: string) => {
	return localStorage.getItem(name);
};

export const WeatherPage = () => {
	const [searchParams] = useSearchParams();
	const cityFromQuery = searchParams.get('city') || '';
	const date = new Date();

	const { lat, lon, selectedCityLat, selectedCityLon } = useMemo(
		() => ({
			lat: getCoords('lat'),
			lon: getCoords('lon'),
			selectedCityLat: getCoords('selectedCityLat'),
			selectedCityLon: getCoords('selectedCityLon'),
		}),
		[],
	);

	const { data, status, error } = useQuery({
		queryKey: ['weatherData', cityFromQuery || [lat, lon]],
		queryFn: () => {
			if (selectedCityLat && selectedCityLon) {
				return getAllWeatherData({
					lat: selectedCityLat,
					lon: selectedCityLon,
					lang: 'ru',
					units: 'metric',
				});
			}
			if (lat && lon) {
				return getAllWeatherData({ lat, lon, lang: 'ru', units: 'metric' });
			}
		},
		retry: 1,
	});

	switch (status) {
		case 'error':
			return <Error error={error.message} />;
		case 'pending':
			return <Loader />;
		case 'success':
			return (
				data && (
					<Main
						style={{
							backgroundImage: `url(${setBackground(
								data.current.weather[0].id,
								date,
							)})`,
						}}>
						<Container>
							<div className={styles.main__wrapper}>
								<Search
									classNameBlock={styles.search}
									cityFromQuery={cityFromQuery || data?.current.name}
								/>
								<CurrentWeather data={data.current} />
								<Forecast data={data.forecast} />
								<FiveDayForecast data={data.forecast} />
							</div>
						</Container>
					</Main>
				)
			);
	}
};
