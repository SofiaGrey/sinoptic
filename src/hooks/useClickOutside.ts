import { useEffect, type RefObject } from 'react';

export const useClickOutside = (
	ref: RefObject<HTMLDivElement | null>,
	handleCLose: (value: boolean) => void,
) => {
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (ref && e.target instanceof Node && !ref.current?.contains(e.target)) {
				handleCLose(false);
			}
		};
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, []);
};
