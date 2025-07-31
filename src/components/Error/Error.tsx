import type { FC } from 'react';
import styles from './Error.module.scss';

interface Props {
	error: string;
}

export const Error: FC<Props> = ({ error }) => {
	return (
		<div className={styles.block}>
			<h1 className={styles.title}>Произошла ошибка - 404</h1>
			<p className={styles.error}>{error}</p>
			<p className={styles.text}>Возможно вы ошиблись в названии</p>
			<button
				className={styles.btn}
				onClick={() => window.location.reload()}>
				Попробовать снова
			</button>
		</div>
	);
};

