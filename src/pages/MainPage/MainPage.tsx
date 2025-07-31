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
	StartScreen,
} from '@/components';
import { setBackground } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styles from './MainPage.module.scss';

const MainPage = () => {
	const [city, setCity] = useState('');
	const [selected, setSelected] = useState<string | null>(null);

	const { data, status, error } = useQuery({
		queryKey: ['weatherData', selected],
		queryFn: () => getAllWeatherData(selected!),
		enabled: !!selected,
		retry: 1,
	});

	const handleSearch = () => {
		if (city.trim()) {
			setSelected(city.trim());
		}
	};

	const date = new Date();

	if (!selected) {
		return (
			<StartScreen
				city={city}
				setCity={setCity}
				handleSearch={handleSearch}
			/>
		);
	}

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
								city={city}
								onChange={setCity}
								onSearch={handleSearch}
								classNameBlock={styles.search}
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
export default MainPage;
