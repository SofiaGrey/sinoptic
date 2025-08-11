import styles from './Loader.module.scss';
export const Loader = () => {
	return (
		<div className={styles.loader}>
			<span className={`${styles.sun} ${styles.sunshine}`}></span>
			<span className={styles.sun}></span>
			<div className={styles.cloud__left}>
				<span className={styles.left}></span>
				<span className={styles.right}></span>
			</div>
			<div className={styles.cloud__right}>
				<span className={styles.left}></span>
				<span className={styles.right}></span>
			</div>
		</div>
	);
};

