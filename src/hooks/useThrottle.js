import { useRef, useEffect, useState } from 'react';

export const useThrottle = (func, gap = 500) => {
	const [Mounted, setMounted] = useState(true);

	const eventBlocker = useRef(null);

	useEffect(() => {
		return () => setMounted(false);
	}, []);

	return () => {
		if (eventBlocker.current) return;

		eventBlocker.current = setTimeout(() => {
			Mounted && func();
			eventBlocker.current = null;
		}, gap);
	};
};
