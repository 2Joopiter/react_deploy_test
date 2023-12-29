import './ThemeControl.scss';

export default function ThemeControl() {
	return (
		<nav className='ThemeControl'>
			<input type='color' />
			<button>theme color</button>
		</nav>
	);
}

/*
  1.클릭이벤트 컬러팔레트에서 선택한 색상코드값을 쿠키로 저장
  2.App마운트시 --pointColor에 등록된 value값을 쿠키에있는 값으로 변경처리
*/
