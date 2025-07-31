import type { FC } from 'react';
import type { ForecastWeather } from '../../types/types';
import { formatUnixDate, getWeatherIcon, roundTemp } from '../../utils/utils';
import { Icon } from '../Icon/Icon';
import styles from './Forecast.module.scss';

interface Props {
	data: ForecastWeather;
}

const Forecast: FC<Props> = ({ data }) => {
	console.log(data);

	const filteredWeather = data.list.slice(0, 5);

	const getDayLabel = (itemTimestamp: number) => {
		const itemDate = new Date(itemTimestamp * 1000);
		const now = new Date();
		console.log(itemDate.toDateString())

		return itemDate.toDateString() === now.toDateString()
			? 'сегодня'
			: 'завтра';
	};
	return (
		<ul className={styles.list}>
			{filteredWeather.map((item) => (
				<li
					className={styles.item}
					key={item.dt}>
					<Icon
						name={getWeatherIcon(item.weather[0].id, item.dt_txt)}
						width={40}
						height={40}
					/>
					<p className={styles.temp}>{roundTemp(item.main.temp)}</p>
					<p className={styles.descr}>{item.weather[0].description}</p>
					<p className={styles.time}>{formatUnixDate(item.dt, 'time')}</p>
					<p className={styles.date}>{getDayLabel(item.dt)} </p>
					{/* <p style={{transform:`rotate(${item.wind.deg}deg)` }}>{'^'}</p> */}

				</li>
			))}
		</ul>
	);
};

export default Forecast;
