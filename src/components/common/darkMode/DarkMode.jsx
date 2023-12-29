import './DarkMode.scss';
import { useCookie } from '../../../hooks/useCookie';
import { useGlobalData } from '../../../hooks/useGlobalData';

export default function DarkMode() {
	const { setCookie, isCookie } = useCookie();

	const { Mode, setMode } = useGlobalData();
	console.log(Mode);
	if (isCookie('dark')) {
		setMode(document.cookie.split('dark=')[1].split(';')[0]);
	}

	const changeMode = () => {
		setMode(Mode === 'dark' ? 'dark' : 'light');
		//토글 이벤트함수가 호출될때 반전되는 Dark state값을 쿠키에 저장
		setCookie('dark', Mode, 20);
	};

	return (
		<div className={`DarkMode ${Mode === 'dark' ? 'dark' : 'light'}`} onClick={changeMode}>
			<div className='ball'></div>
		</div>
	);
}
