import './ThemeControl.scss';
import { useCookie } from '../../../hooks/useCookie';
import { useRef } from 'react';

export default function ThemeControl() {
	const inputEl = useRef(null);

	const { setCookie } = useCookie();

	const changeThemeColor = () => {
		const color = inputEl.current.value;
		setCookie('theme', color, 20);
		console.log(getComputedStyle(document.body).getPropertyValue('--pointColor'));
		document.body.style.setProperty('--pointColor', color);
	};

	return (
		<nav className='ThemeControl'>
			<input type='color' ref={inputEl} />
			<button onClick={changeThemeColor}>theme color</button>
		</nav>
	);
}

/*
  1.클릭이벤트 컬러팔레트에서 선택한 색상코드값을 쿠키로 저장
  2.App마운트시 --pointColor에 등록된 value값을 쿠키에있는 값으로 변경처리
*/
