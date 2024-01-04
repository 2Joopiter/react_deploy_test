import { useEffect, useRef, useState } from 'react';
import './Btns.scss';

export default function Btns() {
	const [Index, setIndex] = useState(0);
	const [Num, setNum] = useState(0);

	const secs = useRef(null);
	const wrap = useRef(null);
	const btns = useRef(null);

	const activation = () => {
		const scroll = wrap.current.scrollTop;

		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		secs.current = document.querySelectorAll('.myScroll');
		setNum(secs.current.length);
		wrap.current.addEventListener('scroll', activation);
	}, []);

	return (
		<div className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return (
						<li key={idx} className={idx === Index ? 'on' : ''} onClick={() => setIndex(idx)}></li>
					);
				})}
		</div>
	);
}

/*
window.scrollY: 브라우저를 스크롤 할 때마다 스크롤 되고 있는 거리값을 담고 있는 property (동적인 값)
DOM.scrollY: DOM 요소를 스크롤 할 때마다 스크롤 되고 있는 거리값을 담고 있는 property
DOM.offsetTop: 문서에서 해당 DOM 요소의 세로 위치값을 담고 있는 property (정적인 값)
*/
