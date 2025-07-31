import { type FC, type HTMLProps, type PropsWithChildren } from 'react'
import styles from './Container.module.scss'

interface Props extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
	className?: string;
}

export const Container:FC<Props> = ({children, className, ...props}) => {
	return (
		<div className={styles.container} {...props}>
			{children}
		</div>
	)
}
