import './Banner.scss';
import { useScroll } from '../../../hooks/useScroll';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Banner() {
	const [Frame, setFrame] = useState(null);
	const refBanner = useRef(null);
	const boxEl = useRef(null);

	//frame을 전달하면 getCurrentScroll 값을 가져옴
	const { getCurrentScroll } = useScroll(Frame);

	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll(refBanner.current, -window.innerHeight / 2);
		if (scroll >= 0) {
			boxEl.current.style.transform = `rotate(${scroll / 5}deg) scale(${1 + scroll / 400})`;
			boxEl.current.style.opacity = 1 - scroll / 400;
		}
	}, [getCurrentScroll]); // useRef에 담으면 스크롤값이 고정됨. 그래서 useCallback으로 메모이제이션 하면서 값이 바뀔때마다 값이 갱신

	useEffect(() => {
		setFrame(refBanner.current?.closest('.wrap'));
	}, []);

	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	useScroll();
	return (
		<section className='Banner myScroll' ref={refBanner}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}
