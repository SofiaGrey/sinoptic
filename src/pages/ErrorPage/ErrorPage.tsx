import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const message = location.state.message || '';
	
	return (
		<div className={styles.block}>
			<h1 className={styles.title}>Произошла ошибка - 404</h1>
			<p className={styles.error}>{message}</p>
			<button
				className={styles.btn}
				onClick={() => navigate('/')}>
				Попробовать снова
			</button>
		</div>
	);
};
