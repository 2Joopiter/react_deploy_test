import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useSplitText';

export default function Layout({ children, title }) {
	const refFrame = useRef(null);
	// useEffect 안쪽에서 자주 쓰일만한 특정 함수를 호출해야 될 떄
	// 하지만 use로 시작하는 커스텀훅은 특정함수 안쪽에서 호출 불가
	// 해당 hook이 함수를 반환하게 만든 후에 해당 리턴함수를 다시 반환하도록 처리
	const splitText = useSplitText;

	useEffect(() => {
		// useEffect: Dom이 mount 된 이후 시점에 실행한다는 구문

		// 아래처럼 custome hook이 반환한 함수는 또다른 훅이나 핸들러함수 내부에서 사용 가능
		splitText('hello');
		refFrame.current.classList.add('on');
	}, []);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1>{title}</h1>
			<div className='bar'></div>
			{/* Layout 컴포넌트로 감싼 컨텐츠 내용이 아래 Children 위치에 출력됨 */}
			{children}
		</main>
	);
}
