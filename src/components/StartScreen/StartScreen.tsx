import { useEffect, useState, type FC } from 'react';
import { Main } from '../Main/Main';
import { Search } from '../Search/Search';
import styles from './StartScreen.module.scss';

interface Props {
	city: string;
	setCity: (city: string) => void;
	handleSearch: () => void;
}

export const StartScreen: FC<Props> = ({ city, setCity, handleSearch }) => {
	const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => setCoords(position.coords),
				(error) => {
					console.error('Geolocation error:', error);
				},
			);
		}
	}, []);

	return (
		<Main>
			<div className="container">
				<div className={styles.content}>
					<h1 className={styles.title}>Приложение погоды</h1>
					<h2 className={styles.subtitle}>Узнайте текущую погоду</h2>
					<Search
						city={city}
						onChange={setCity}
						onSearch={handleSearch}
					/>
				</div>
			</div>
		</Main>
	);
};
