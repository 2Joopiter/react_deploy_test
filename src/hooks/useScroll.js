import { useEffect, useRef, useState } from 'react';
import Anime from '../asset/anime';

//useScroll훅을 처음 초기화할때 무조건 인수로 state에 담겨있는 ScrollFrame요소를 전달 (중요)
export function useScroll() {
	// 순서1 - 커스텀훅 안쪽에서 자체적으로 빈 참조객체 생성
	const [Frame, setFrame] = useState(null);
	// 빈 참조객체를 내보내서 부모요소에서 연결해서 쓸 수 있게끔 만듦
	const refEl = useRef(null);

	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	//getCurrentScroll(호출하는 부모프레임요소, 기준점 보정값)
	const getCurrentScroll = (baseLine = 0) => {
		const scroll = Frame?.scrollTop - baseLine;
		// 순서 5 - 부모 컴포넌트에서 참조객체 연결된 값을 hook 내부적으로 활용
		const modifiedScroll = scroll - refEl.current?.offsetTop;
		return modifiedScroll;
	};

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, []);
	// .wrap 요소는 바뀌는 요소가 아니기때문에(최상위 document) querySelector를 써도 됨 + 내부적인 부분은 변경될때마다 setFrame에 의해 변경 가능

	// 순서2 - 부모에서 해당 참조객체를 활용할 수 있도록 리턴해줌
	return { scrollTo, getCurrentScroll, Frame, refEl };
}
