import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.scss';

interface Props {
	cityFromQuery?: string;
	classNameBlock?: string;
}

export const Search: FC<Props> = ({ cityFromQuery = '', classNameBlock }) => {
	const [city, setCity] = useState(cityFromQuery);
	const navigate = useNavigate();

	const handleSearch = () => {
		if (city) {
			navigate(`/weather?city=${city}`);
		}
	};

	return (
		<div className={`${styles.default__search} ${classNameBlock} `}>
			<input
				className={styles.default__input}
				type="text"
				placeholder="Поиск по городам"
				value={city}
				onChange={(e) => setCity(e.target.value.trim())}
				onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
			/>
			<button
				className={styles.btn}
				onClick={() => handleSearch()}>
				Найти
			</button>
		</div>
	);
};
