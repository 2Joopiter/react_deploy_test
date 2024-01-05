import Anime from '../asset/anime';
import { useEffect, useRef } from 'react';

export function useScroll(frame) {
	// 스크롤이벤트가 발생하는 프레임 요소
	const scrollFrame = useRef(null);

	// 특정 위치로 스크롤 이동 메서드
	const scrollTo = targetPos => {
		new Anime(scrollFrame.current, { scroll: targetPos });
	};

	// 실시간 scroll값 반환 메서드
	const getCurrentScroll = () => {
		const scroll = scrollFrame.current.scrollTop;
		return scroll;
	};

	useEffect(() => {
		scrollFrame.current = document.querySelector(frame);
	}, [frame]);

	//scrollTo 함수를 비구조화 할당으로 뽑아내기 위해서 객체로 묶어 반환
	return { scrollTo, getCurrentScroll, scrollFrame };
}
