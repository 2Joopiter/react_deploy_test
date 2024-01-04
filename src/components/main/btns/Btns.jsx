import './Btns.scss';
import Anime from '../../../asset/anime';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Btns() {
	const [Num, setNum] = useState(0);
	const isAutoScroll = useRef(false); // autoScroll이 true이면 활성화, false이면 비활성화
	const wrap = useRef(null);
	const secs = useRef(null);
	const btns = useRef(null);
	const baseLine = useRef(-window.innerHeight / 2); //현재 섹션의 컨텐츠가 일정부분 이상 보여야 버튼 활성화. 절반일 땐 2, 3분의 1은 3
	// isMotion.current 값이 true이면 모션중이므로 재실행 방지, false면 모션중이 아니므로 재실행 가능하게 처리
	const isMotion = useRef(false);

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
		// 초기값이 false이므로 처음 1번 아래코드 실행이 됨
		if (isMotion.current) return;
		// 조건문을 통과하자마자 true로 값이 변경됨 > 재호출 안되도록 막음
		isMotion.current = true;
		new Anime(
			wrap.current,
			{ scroll: secs.current[idx].offsetTop },
			{ callback: () => (isMotion.current = false) }
			// 모션함수가 실행되고 모션이 끝나는 순간 실행되는 callback함수로 다시 isMotion의 값을 false로 변경 > 재실행 가능 상태가 됨
			// isMotion.current 값을 이용해서 모션중에는 중복 함수호출 불가능하도록 모션중 재이벤트 방지 처리
		);
	};

	const autoScroll = useCallback(
		e => {
			const btnsArr = Array.from(btns.current.children);
			const activeEl = btns.current.querySelector('li.on');
			//현재 활성화된 버튼의 순번구함
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
		wrap.current.scrollTop = secs.current[activeIndex].offsetTop;
	};

	const throttledActivation = useThrottle(activation);
	const throttledModifyPos = useThrottle(modifyPos);

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		//btns.current.closest('.wrap'); > 이렇게도 사용 가능. closest: 가장 가까운 클래스를 찾아줌
		secs.current = wrap.current.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		window.addEventListener('resize', throttledModifyPos);
		wrap.current.addEventListener('scroll', throttledActivation);
		isAutoScroll.current && wrap.current.addEventListener('mousewheel', autoScroll);

		return () => {
			window.removeEventListener('resize', throttledModifyPos);
			wrap.current.removeEventListener('scroll', throttledActivation);
			wrap.current.removeEventListener('mousewheel', autoScroll);
		};
	}, [throttledModifyPos, throttledActivation, autoScroll]);

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
