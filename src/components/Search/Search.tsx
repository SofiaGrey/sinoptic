import type { FC } from 'react';
import styles from './Search.module.scss';

interface Props {
	city: string;
	onChange: (city: string) => void;
	onSearch: () => void;
	classNameBlock?: string;
	classNameInp?: string;
}


const Search:FC<Props> = ({city, onChange, onSearch, classNameBlock, classNameInp}) => {
	return (
		<div className={`${styles.default__search} ${classNameBlock} `}>
			<input
				className={`${styles.default__input} ${classNameInp} `}
				type="text"
				placeholder="Поиск по городам"
				value={city}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={(e) => e.key === 'Enter' && onSearch()}
			/>
			<button
				className={styles.btn}
				onClick={() => onSearch()}>
				Найти
			</button>
		</div>
	);
};

export default Search;
