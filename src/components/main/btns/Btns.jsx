import './Btns.scss';
import Anime from '../../../asset/anime';
import { useRef, useState, useEffect } from 'react';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Btns() {
	const [Num, setNum] = useState(0);
	const wrap = useRef(null);
	const secs = useRef(null);
	const btns = useRef(null);
	const baseLine = useRef(-window.innerHeight / 3); //현재 섹션의 컨텐츠가 3분의 1 이상 보여야 버튼 활성화. 절반일 땐 2

	const activation = () => {
		console.log('activation');
		const scroll = wrap.current.scrollTop;

		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop + baseLine.current) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
	};

	const throttledActivation = useThrottle(activation);

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		secs.current = document.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		wrap.current.addEventListener('scroll', throttledActivation);
		return () => wrap.current.removeEventListener('scroll', throttledActivation);
	}, [throttledActivation]);

	return (
		<ul className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							className={idx === 0 ? 'on' : ''}
							onClick={() => {
								//new Anime(선택자, {속성명1:속성값2, 속성명2:속성값2}, {duration:속도, easeType:가속도, callback:컴플릭함수})
								new Anime(
									wrap.current,
									{ scroll: secs.current[idx].offsetTop },
									{ duration: 500, ease: [0.26, 0.1, 1, 1.5] }
								);
							}}></li>
					);
				})}
		</ul>
	);
}
