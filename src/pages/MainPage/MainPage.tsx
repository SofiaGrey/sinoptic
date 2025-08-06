import { Container, Main, Search } from '@/components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.scss';

const MainPage = () => {
	const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
	const navigate = useNavigate();

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

	if (coords) {
		navigate(`/weather?lat=${coords.latitude}&lon=${coords.longitude}`);
	}

	return (
		<Main>
			<Container>
				<div className={styles.content}>
					<h1 className={styles.title}>Приложение погоды</h1>
					<h2 className={styles.subtitle}>Узнайте текущую погоду</h2>
					<Search />
				</div>
			</Container>
		</Main>
	);
};
export default MainPage;
