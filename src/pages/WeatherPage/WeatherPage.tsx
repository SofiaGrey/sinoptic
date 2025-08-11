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
import { useWeather } from '@/hooks/useWeather';
import { setBackground } from '@/utils';
import { useSearchParams } from 'react-router-dom';
import styles from './WeatherPage.module.scss';

export const WeatherPage = () => {
	const [searchParams] = useSearchParams();
	const cityFromQuery = searchParams.get('city') || '';
	const lat = searchParams.get('lat') || '';
	const lon = searchParams.get('lon') || '';
	const date = new Date();

	const { data, status, error } = useWeather(lat, lon);

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
