import { useEffect, useRef, useState } from 'react';

export const useDebounce = (func, gap = 500) => {
	const eventBlocker = useRef(null); // setTimeout의 리턴값을 받을 참조객체

	return () => {
		if (eventBlocker.current) return;

		eventBlocker.current = setTimeout(() => {
			func();
			eventBlocker.current = null;
		}, gap);
	};
};
