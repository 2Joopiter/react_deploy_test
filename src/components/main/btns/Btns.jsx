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
		const scroll = wrap.current.scrollTop;

		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop + baseLine.current) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
	};

	const moveScroll = idx => {
		new Anime(
			wrap.current,
			{ scroll: secs.current[idx].offsetTop },
			{ duration: 500, ease: [0.26, 0.1, 1, 1.5] }
		);
	};

	const throttledActivation = useThrottle(activation);

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		//btns.current.closest('.wrap'); > 이렇게도 사용 가능. closest: 가장 가까운 클래스를 찾아줌
		secs.current = wrap.current.querySelectorAll('.myScroll');
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
								moveScroll(idx);
							}}></li>
					);
				})}
		</ul>
	);
}
