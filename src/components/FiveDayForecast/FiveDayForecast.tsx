import { type FC } from 'react';
import type { ForecastItem, ForecastWeather } from '../../types/types';
import {
	findMostFrequentNumber,
	formatForecastKey,
	getWeatherIcon,
	roundTemp,
} from '@/utils';
import { Icon } from '../Icon/Icon';
import styles from './FiveDayForecast.module.scss';

interface Props {
	data: ForecastWeather;
}

const groupByDay = (list: ForecastItem[]) => {
	const days = new Map<string, ForecastItem[]>();
	for (const item of list) {
		const date = new Date(item.dt * 1000).toLocaleDateString();
		const foundedDay = days.get(date);
		if (!foundedDay) {
			days.set(date, []);
			continue;
		}

		days.set(date, [...foundedDay, item]);
	}

	return [...days].map(([date, items]) => {
		const temps = items.map((item) => item.main.temp);
		const weather = findMostFrequentNumber(items);
		return {
			date,
			weather,
			maxTemp: roundTemp(Math.max(...temps)),
			minTemp: roundTemp(Math.min(...temps)),
		};
	});
};

export const FiveDayForecast: FC<Props> = ({ data }) => {
	const weather = groupByDay(data.list);
	const date = new Date().toLocaleDateString('ru', {
		weekday: 'long',
	});

	return (
		<ul className={styles.list}>
			{weather &&
				weather.map(
					(item) =>
						formatForecastKey(item.date).weekday !== date && (
							<li
								className={styles.item}
								key={item.date}>
								<h2 className={styles.week}>
									{formatForecastKey(item.date).weekday}
								</h2>
								<span className={styles.date}>
									{formatForecastKey(item.date).dayMonth}
								</span>
								<p className={styles.temp}>
									{item.maxTemp}{' '}
									<span className={styles.min_temp}>/ {item.minTemp}</span>
								</p>
								{item.weather && (
									<Icon
										name={getWeatherIcon(
											item.weather.code,
											new Date('2025 14:15:30'),
										)}
										className={styles.icon}
									/>
								)}
								<p className="forecast__item-descr">{item.weather?.desc}</p>
							</li>
						),
				)}
		</ul>
	);
};
