import { Link } from 'react-router-dom';
import { Container } from '../Container/Container';
import styles from './Header.module.scss'

export const Header = () => {
	return (
		<header className={styles.header}>
			<Container>
			<Link to={'/'} className={styles.logo}>SINOPTIC</Link>
			</Container>
		</header>
	);
};
