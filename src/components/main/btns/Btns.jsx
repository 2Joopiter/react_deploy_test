import { useEffect, useRef, useState } from 'react';
import './Btns.scss';

export default function Btns() {
	const [Index, setIndex] = useState(0);
	const btns = useRef(null);
	const secs = useRef(null);
	const wrap = useRef(null);
	const num = useRef(4);

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		secs.current = document.querySelectorAll('.myScroll');
		wrap.current.addEventListener('scroll', (e) => {
      
    });
	}, []);

	return (
		<div className='Btns'>
			{Array(num.current)
				.fill()
				.map((_, idx) => {
					return <li key={idx} className={idx === Index ? 'on' : ''}></li>;
				})}
		</div>
	);
}

/*
window.scrollY: 브라우저를 스크롤 할 때마다 스크롤 되고 있는 거리값을 담고 있는 property (동적인 값)
DOM.scrollY: DOM 요소를 스크롤 할 때마다 스크롤 되고 있는 거리값을 담고 있는 property
DOM.offsetTop: 문서에서 해당 DOM 요소의 세로 위치값을 담고 있는 property (정적인 값)
*/
