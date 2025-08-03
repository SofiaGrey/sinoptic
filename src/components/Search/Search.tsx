import useDebounce from '@/hooks/useDebounce';
import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchList } from '../SearchList/SearchList';
import styles from './Search.module.scss';

interface Props {
	cityFromQuery?: string;
	classNameBlock?: string;
}

export const Search: FC<Props> = ({ cityFromQuery = '', classNameBlock }) => {
	const [city, setCity] = useState(cityFromQuery);
	const navigate = useNavigate();
	const debounce = useDebounce(city, 500);
	let isMore = city.length >= 3;

	const handleSearch = () => {
		if (city.trim()) {
			navigate(`/weather?city=${city.trim()}`);
		}
	};

	return (
		<div className={`${styles.default__search} ${classNameBlock} `}>
			<input
				className={styles.default__input}
				type="text"
				placeholder="Поиск по городам"
				value={city}
				onChange={(e) => setCity(e.target.value)}
				onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
			/>
			{isMore && <SearchList city={debounce} />}
			<button
				className={styles.btn}
				onClick={() => handleSearch()}>
				Найти
			</button>
		</div>
	);
};
