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

	const cityQuery = searchParams.get('city') || '';

	const { data, status, error } = useQuery({
		queryKey: ['weatherData', cityQuery],
		queryFn: () => getAllWeatherData(cityQuery),
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
								cityFromQuery={cityQuery}
							/>
							<CurrentWeather data={data.current} />
							<Forecast data={data.forecast} />
							<FiveDayForecast data={data.forecast} />
						</div>
					</Container>
				</Main>
			);
	}
};
