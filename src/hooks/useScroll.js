import { useEffect, useState } from 'react';
import Anime from '../asset/anime';

//useScroll훅을 처음 초기화할때 무조건 인수로 state에 담겨있는 ScrollFrame요소를 전달 (중요)
export function useScroll(scrollFrame) {
	const [Frame, setFrame] = useState(null);

	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	//getCurrentScroll(호출하는 부모프레임요소, 기준점 보정값)
	const getCurrentScroll = (selfEl, baseLine = 0) => {
		const scroll = Frame?.scrollTop - baseLine;
		const modifiedScroll = scroll - selfEl?.offsetTop;
		return modifiedScroll;
	};

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, []);
	// .wrap 요소는 바뀌는 요소가 아니기때문에(최상위 document) querySelector를 써도 됨 + 내부적인 부분은 변경될때마다 setFrame에 의해 변경 가능

	return { scrollTo, getCurrentScroll, Frame };
}
