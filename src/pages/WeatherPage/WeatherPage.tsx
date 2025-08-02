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

export const WeatherPage = () => {
	const [searchParams] = useSearchParams();

	const city = searchParams.get('city') || '';

	const lat = window.localStorage.getItem('lat');
	const lon = window.localStorage.getItem('lon');

	const { data, status, error } = useQuery({
		queryKey: ['weatherData', city || `${lat}, ${lon}`],
		queryFn: () => {
			if (city) {
				return getAllWeatherData({ city, lang: 'ru', units: 'metric' });
			} else if (lat && lon) {
				return getAllWeatherData({ lat, lon, lang: 'ru', units: 'metric' });
			}
		},
		retry: 1,
	});

	const date = new Date();

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
									cityFromQuery={city || data?.current.name}
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
