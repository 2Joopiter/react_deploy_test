import Anime from '../asset/anime';
import { useCallback, useEffect, useRef, useState } from 'react';

// 순서3 - 부모컴포넌트로부터 커스텀 스크롤 함수를 파라미터를 통해 내부로 전달
export function useScroll(customHandler, baseLine = -window.innerHeight / 2) {
	const [Frame, setFrame] = useState(null);
	const refEl = useRef(null);

	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	const getCurrentScroll = useCallback(() => {
		const scroll = Frame.scrollTop - baseLine;
		const modifiedScroll = scroll - refEl.current?.offsetTop;
		return modifiedScroll;
	}, [Frame, baseLine]);

	// 순서4 - 전달받은 커스텀스크롤 함수를 내부에 있는 handleScroll 함수 안쪽에 호출해서 내부적으로 getCurrnetScroll값이 반환하고 있는 스크롤값과 연동시켜줌
	// 부모요소를 customHandler에 전달한 값을 받음
	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll();
		if (scroll >= 0) {
			customHandler(scroll);
		}
	}, [getCurrentScroll, customHandler]);

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, []);

	// 순서5 - 해당 커스텀훅을 호출하고 있는 부모컴포넌트가 마운트시 handleScroll 함수에 scroll 이벤트 연결
	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	return { scrollTo, getCurrentScroll, Frame, refEl };
}
