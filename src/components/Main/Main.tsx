import type { FC, HTMLProps, PropsWithChildren } from 'react';
import styles from './Main.module.scss';

interface Props extends PropsWithChildren<HTMLProps<HTMLElement>> {
	className?: string;
}

export const Main: FC<Props> = ({ children, className, ...props }) => {
	return (
		<main
			className={`${styles.main} ${className}`}
			{...props}>
			{children}
		</main>
	);
};
