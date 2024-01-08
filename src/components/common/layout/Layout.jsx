import './Layout.scss';
import { useEffect, useRef } from 'react';
import { useSplitText } from '../../../hooks/useText';
import { useScroll } from '../../../hooks/useScroll';

export default function Layout({ children, title }) {
	const refTitle = useRef(null);
	const refBtnTop = useRef(null);
	const splitText = useSplitText();

	// 순서1 - 레이아웃 컴포넌트에서 공통적으로 적용될, 스크롤이 100을 넘어가면 btnTop이 보이는 함수 정의
	const handleCustomScroll = scroll => {
		scroll >= 100
			? refBtnTop.current?.classList.add('on')
			: refBtnTop.current?.classList.remove('on');
	};

	const { scrollTo, refEl } = useScroll(handleCustomScroll, 0); // baseLine값을 0으로 세팅

	useEffect(() => {
		scrollTo(0);
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refEl.current?.classList.add('on');
		}, 300);
	}, [splitText, title, scrollTo, refEl]);

	return (
		<main ref={refEl} className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{children}
			<button ref={refBtnTop} className='btnTop' onClick={() => scrollTo(0)}>
				Top
			</button>
		</main>
	);
}
