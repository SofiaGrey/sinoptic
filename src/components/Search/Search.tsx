import { useClickOutside } from '@/hooks/useClickOutside';
import useDebounce from '@/hooks/useDebounce';
import { useRef, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchList } from '../SearchList/SearchList';
import styles from './Search.module.scss';

interface Props {
	cityFromQuery?: string;
	classNameBlock?: string;
}

export const Search: FC<Props> = ({ cityFromQuery = '', classNameBlock }) => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState(false);
	const [city, setCity] = useState(cityFromQuery);

	const navigate = useNavigate();

	useClickOutside(wrapperRef, setIsOpen);
	const debounce = useDebounce(city, 500);

	let isMore = city.length >= 3;

	const handleSearch = () => {
		if (city.trim()) {
			navigate(`/weather?city=${city.trim()}`);
		}
	};

	return (
		<div
			ref={wrapperRef}
			className={`${styles.default__search} ${classNameBlock} `}>
			<input
				className={styles.default__input}
				type="text"
				placeholder="Поиск по городам"
				value={city}
				name="search"
				onFocus={() => setIsOpen(true)}
				onChange={(e) => setCity(e.target.value)}
				onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
			/>
			{isMore && isOpen && <SearchList city={debounce} />}
			<button
				className={styles.btn}
				onClick={() => handleSearch()}>
				Найти
			</button>
		</div>
	);
};
