import './Banner.scss';
import { useScroll } from '../../../hooks/useScroll';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Banner() {
	const boxEl = useRef(null);

	//frame을 전달하면 getCurrentScroll 값을 가져옴
	const { getCurrentScroll, Frame, refEl } = useScroll(); // 순서3 - useScroll에서 내보낸 함수를 가져옴

	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll(refEl.current, -window.innerHeight / 2);
		if (scroll >= 0) {
			boxEl.current.style.transform = `rotate(${scroll / 5}deg) scale(${1 + scroll / 400})`;
			boxEl.current.style.opacity = 1 - scroll / 400;
		}
	}, [getCurrentScroll]); // useRef에 담으면 스크롤값이 고정됨. 그래서 useCallback으로 메모이제이션 하면서 값이 바뀔때마다 값이 갱신

	// useEffect - 가상돔을 가져와서 리랜더링 시키기 위해 사용

	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	useScroll();
	return (
		// 순서4 - 원하는 요소에 빈 참조객체 연결
		<section className='Banner myScroll' ref={refEl}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}
