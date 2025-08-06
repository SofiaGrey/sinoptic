import type { FC } from 'react';
import styles from './Error.module.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
	error: string;
}

export const Error: FC<Props> = ({ error }) => {
	const navigate = useNavigate();

	return (
		<div className={styles.block}>
			<h1 className={styles.title}>Произошла ошибка - 404</h1>
			<p className={styles.error}>{error}</p>
			<button
				className={styles.btn}
				onClick={() => navigate('/')}>
				Попробовать снова
			</button>
		</div>
	);
};

