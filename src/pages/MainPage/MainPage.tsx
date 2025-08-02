import { Container, Main, Search } from '@/components';
import styles from './MainPage.module.scss';

const MainPage = () => {
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
