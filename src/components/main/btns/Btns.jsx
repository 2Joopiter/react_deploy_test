import Anime from '../../../asset/anime';
import './Btns.scss';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Btns(opt) {
	const [Num, setNum] = useState(0);
	const defOpt = useRef({
		items: '.myScroll',
		base: -window.innerHeight / 2,
		isAuto: false
	});
	const resultOpt = useRef({ ...defOpt.current, ...opt });
	const isAutoScroll = useRef(resultOpt.current.isAuto);
	const secs = useRef(null);
	const btns = useRef(null);
	const baseLine = useRef(resultOpt.current.base);

	const activation = () => {
		const scroll = window.scrollY;
		const btnsArr = btns.current?.querySelectorAll('li');

		secs.current.forEach((sec, idx) => {
			if (
				scroll >= secs.current[idx].offsetTop + baseLine.current &&
				scroll < secs.current[idx].offsetTop + secs.current[idx].offsetHeight + baseLine.current
			) {
				btns.current?.querySelectorAll('li')[idx]?.classList.add('on');
				secs.current[idx]?.classList.add('on');
			} else {
				btns.current?.querySelectorAll('li')[idx]?.classList.remove('on');
				secs.current[idx]?.classList.remove('on');
			}
		});
	};

	const moveScroll = idx => {
		new Anime(window, { scroll: secs.current[idx].offsetTop });
	};

	const autoScroll = useCallback(
		e => {
			const btnsArr = Array.from(btns.current.children);
			const activeEl = btns.current.querySelector('li.on');
			const activeIndex = btnsArr.indexOf(activeEl);

			if (e.deltaY > 0) {
				activeIndex !== Num - 1 && moveScroll(activeIndex + 1);
			} else {
				activeIndex !== 0 && moveScroll(activeIndex - 1);
			}
		},
		[Num]
	);

	const modifyPos = () => {
		const btnsArr = Array.from(btns.current.children);
		const activeEl = btns.current.querySelector('li.on');
		const activeIndex = btnsArr.indexOf(activeEl);
		window.scrollTo(0, secs.current[activeIndex].offsetTop);
	};

	const throttledActivation = useThrottle(activation);
	const throttledModifyPos = useThrottle(modifyPos, 200);

	useEffect(() => {
		secs.current = document.querySelectorAll(resultOpt.current.items);
		secs.current[0]?.classList.add('on');
		setNum(secs.current.length);

		window.addEventListener('resize', throttledModifyPos);
		window.addEventListener('scroll', throttledActivation);
		isAutoScroll.current && window.addEventListener('mousewheel', autoScroll);

		return () => {
			window.removeEventListener('resize', throttledModifyPos);
			window.removeEventListener('scroll', throttledActivation);
			window.removeEventListener('mousewheel', autoScroll);
		};
	}, [autoScroll, throttledActivation, throttledModifyPos]);

	return (
		<ul className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					//동적으로 버튼 생성 및 클릭 이벤트 핸들러 연결
					return (
						<li key={idx} className={idx === 0 ? 'on' : ''} onClick={() => moveScroll(idx)}></li>
					);
				})}
		</ul>
	);
}
