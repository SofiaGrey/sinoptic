import { Container, Main, Search } from '@/components';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.scss';

const MainPage = () => {
	const navigate = useNavigate();

	const handleGeolocation = () => {
		navigator.geolocation.getCurrentPosition((pos) => {
			navigate(
				`/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`,
			);
		});
	};

	return (
		<Main>
			<Container>
				<div className={styles.content}>
					<h1 className={styles.title}>Приложение погоды</h1>
					<p className={styles.descr}>
						Введите название города или разрешите доступ к вашему местоположению
					</p>
					<Search />
					<button
						className={styles.btn}
						onClick={handleGeolocation}>
						Использовать мое местоположение
					</button>
				</div>
			</Container>
		</Main>
	);
};
export default MainPage;
