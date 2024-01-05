import './Banner.scss';
import { useScroll } from '../../../hooks/useScroll';
import { useEffect, useRef, useState } from 'react';

export default function Banner() {
	const refBanner = useRef(null);
	const [Frame, setFrame] = useState(null);
	const [Scrolled, setScrolled] = useState(0);

	//frame을 전달하면 getCurrentScroll 값을 가져옴
	const { getCurrentScroll } = useScroll(Frame);

	useEffect(() => {
		setFrame(refBanner.current?.closest('.wrap'));
		Frame?.addEventListener('scroll', () => {
			const scroll = getCurrentScroll(refBanner.current, -window.innerHeight / 2);
			scroll >= 0 && setScrolled(scroll);
		});
	}, [Frame, getCurrentScroll]);

	useScroll();
	return (
		<section className='Banner myScroll' ref={refBanner}>
			<div
				className='box'
				style={{
					transform: `rotate(${Scrolled / 5}deg) scale(${1 + Scrolled / 400})`,
					opacity: 1 - Scrolled / 400
				}}></div>
		</section>
	);
}
