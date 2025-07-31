import type { FC } from 'react'
import Search from '../Search/Search'
import styles from './StartScreen.module.scss'

interface Props {
city: string;
setCity: (city: string) => void;
handleSearch: () => void;
}

const StartScreen:FC<Props> = ({city, setCity, handleSearch}) => {
	return (
		<main
				className={styles.main}>
				<div className="container">
					<div className={styles.content}>
						<h1 className={styles.title}>Приложение погоды</h1>
						<h2 className={styles.subtitle}>Узнайте текущую погоду</h2>
						<Search
							city={city}
							onChange={setCity}
							onSearch={handleSearch}
						/>
					</div>
				</div>
			</main>
	)
}

export default StartScreen
