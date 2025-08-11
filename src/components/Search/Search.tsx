import { useClickOutside } from '@/hooks/useClickOutside';
import useDebounce from '@/hooks/useDebounce';
import { useRef, useState, type FC } from 'react';
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

	useClickOutside<HTMLDivElement>(wrapperRef, setIsOpen);
	const debounce = useDebounce(city, 500);

	let isMore = city.length >= 3;

	return (
		<div
			ref={wrapperRef}
			className={`${styles.default__search} ${classNameBlock}`}>
			<input
				className={`${styles.default__input} ${isOpen && isMore ? styles.open : ''}`}
				type="text"
				placeholder="Поиск по городам"
				autoComplete="off"
				value={city}
				name="search"
				onFocus={() => setIsOpen(true)}
				onChange={(e) => setCity(e.target.value)}
			/>
			{isMore && isOpen && <SearchList city={debounce} />}
		</div>
	);
};
