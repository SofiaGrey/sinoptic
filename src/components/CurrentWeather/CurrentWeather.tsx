import type { FC } from 'react';
import type { CurrentWeatherType } from '../../types/types';
import {
	formatUnixDate,
	getWeatherIcon,
	roundTemp,
	setColor,
} from '@/utils';
import { Icon } from '../Icon/Icon';
import styles from './CurrentWeather.module.scss';
import { mbar } from '@/constants/constants';

interface Props {
	data: CurrentWeatherType;
}

export const CurrentWeather: FC<Props> = ({ data }) => {
	const date = new Date();
	const weather = data.weather[0];
	console.log(data)
	const currentTime = formatUnixDate(data.dt, 'date');

	return (
		<div className={`${styles.current__weather}`}>
			<div className={styles.left}>
				<Icon
					name={getWeatherIcon(weather.id, date)}
					width={110}
					height={110}
				/>
				<div className={styles.wrapper}>
					<p className={styles.sunrise}>
						Восход: {formatUnixDate(data.sys.sunrise)}
					</p>
					<p className={styles.sunrise}>
						Закат: {formatUnixDate(data.sys.sunset)}
					</p>
				</div>
			</div>
			<div className={styles.middle}>
				<p className={styles.date}>{currentTime}</p>
				<div>
					<h1 className={styles.temp} style={{color: setColor(data.main.temp)}}>{roundTemp(data.main.temp)}C</h1>
					<p className={styles.feels}>
						Ощущается как {roundTemp(data.main.feels_like)}
					</p>
					<p className={styles.descr}>{weather.description}</p>
				</div>
			</div>
			<div className={styles.right}>
				<h2 className={styles.details}>Больше деталей:</h2>
				<ul className={styles.more__list}>
					<li className={styles.more__item}>
						Скорость ветра: <b>{data.wind.speed} м/с</b>
					</li>
					<li className={styles.more__item}>
						Влажность воздуха: <b>{data.main.humidity} %</b>
					</li>
					<li className={styles.more__item}>
						Давление: <b>{Math.round(data.main.pressure * mbar)} мм</b>
					</li>
					<li className={styles.more__item}>
						Облачность: <b>{data.clouds.all}%</b>
					</li>
				</ul>
			</div>
		</div>
	);
};
