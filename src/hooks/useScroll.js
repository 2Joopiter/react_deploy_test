import Anime from '../asset/anime';
import { useRef, useEffect } from 'react';

export function useScroll(frame = '.wrap') {
	//스크롤이벤트가 발생하는 프레임 요소
	const scrollFrame = useRef(null);

	//특정위치로 스크롤 이동 메서드
	const scrollTo = targetPos => {
		new Anime(scrollFrame.current, { scroll: targetPos });
	};

	//실시간 scroll값 반환 메서드
	const getCurrentScroll = () => {
		const scroll = scrollFrame.current.scrollTop;
		return scroll;
	};

	useEffect(() => {
		scrollFrame.current = document.querySelector(frame);
	}, [frame]);

	return { scrollTo, getCurrentScroll, scrollFrame };
}
