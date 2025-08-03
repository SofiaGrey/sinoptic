import { getCity } from '@/api/location';
import { useQuery } from '@tanstack/react-query';
import type { FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchList.module.scss';

interface Props {
	city: string;
}

export const SearchList: FC<Props> = ({ city }) => {
	const navigate = useNavigate();

	const { data, status, error } = useQuery({
		queryKey: ['location', city],
		queryFn: () => getCity(city),
		enabled: city.length >= 3,
		retry: 1,
	});

	const handleClick = (e: MouseEvent<HTMLUListElement>) => {
		if (!(e.target instanceof HTMLElement)) return;
		const btn = e.target.closest('button');
		if (!btn) return;
		if (btn instanceof HTMLButtonElement) {
			const value = btn.dataset.value ? btn.dataset.value : '';
			navigate(`/weather?city=${value}`);
		}
	};

	switch (status) {
		case 'error':
			return (
				<ul className={styles.list}>
					<li className={styles.error__item}>{error.message}</li>
				</ul>
			);
		case 'pending':
			return (
				<ul className={styles.list}>
					<li className={styles.item}>Загрузка...</li>
				</ul>
			);
		case 'success':
			return (
				<ul
					className={styles.list}
					onClick={(e) => handleClick(e)}>
					{data &&
						data.map((item) => (
							<li
								className={styles.item}
								key={item.place_id}>
								<button
									className={styles.btn}
									data-value={item.address.name}>
									<p className={styles.city}>{item.address.name}</p>
									<p className={styles.country}>
										{item.address.state} {item.address.country}
									</p>
								</button>
							</li>
						))}
				</ul>
			);
	}
};
