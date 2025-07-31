import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getAllWeatherData } from '../../api/temperature';
import { CurrentWeather } from '../../components';
import Error from '../../components/Error/Error';
import FiveDayForecast from '../../components/FiveDayForecast/FiveDayForecast';
import Forecast from '../../components/Forecast/Forecast';
import Loader from '../../components/Loader/Loader';
import Search from '../../components/Search/Search';
import { setBackground } from '../../utils/utils';
import styles from './MainPage.module.scss';
import StartScreen from '../../components/StartScreen/StartScreen';

const MainPage = () => {
	const [city, setCity] = useState('');
	const [selected, setSelected] = useState<string | null>(null);

	const { data, status, error } = useQuery({
		queryKey: ['weatherData', selected],
		queryFn: () => getAllWeatherData(selected!),
		enabled: !!selected,
		// retry: 300,
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
				<main
					className={styles.main}
					style={{
						backgroundImage: `url(${setBackground(
							data.current.weather[0].id,
							date,
						)})`,
					}}>
					<div className="container">
						<div className={styles.main__wrapper}>
							<Search
								city={city}
								onChange={setCity}
								onSearch={handleSearch}
								classNameBlock="search"
								classNameInp="input"
							/>
							<CurrentWeather data={data.current} />
							<Forecast data={data.forecast} />
							<FiveDayForecast data={data.forecast} />
						</div>
					</div>
				</main>
			);
	}
};
export default MainPage;
