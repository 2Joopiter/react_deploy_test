import { useRef, useState } from 'react';

export const useDebounce = (value, gap) => {
	const [DebouncedVal, setDebouncedVal] = useState(value);
	const eventBlocker = useRef(null); // setTimeout의 리턴값을 받을 참조객체

	// 인수로 받은 state값이 변경될때마다 setTimeout 구문의 호출을 계속 초기화
	// clearTimeout을 이용

	clearTimeout(eventBlocker.current);

	// 아래 setTimeout에 의해서 원래 State이 0.5초 뒤에 무조건 변경이 되는 구조
	// 만약 0.5초 안에 다시 value로 전달된 state가 전달되면 setTimeout의 리턴값을 초기화
	// setTimeout의 리턴값을 clearTimeout으로 초기화시킴 (지연시간을 다시 0.5초로 리셋)

	eventBlocker.current = setTimeout(() => {
		setDebouncedVal(value);
	}, gap);

	return DebouncedVal;
};
