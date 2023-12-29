import './Footer.scss';
import { useCookie } from '../../../hooks/useCookie';
import { TiSocialInstagram } from 'react-icons/ti';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';

// npm i react-icons (기본 아이콘 설치 가능)

export default function Footer() {
	const { setCookie, isCookie, viewCookie } = useCookie();
	const createCookie = () => {
		setCookie('today', 'done', 20);
	};
	return (
		<footer className='Footer'>
			<h1>Home</h1>
			<p>2023 home &copy; All Right Reserved. </p>

			<ul>
				<li>
					<TiSocialInstagram />
				</li>
				<li>
					<FaSquareXTwitter />
				</li>
				<li>
					<IoLogoYoutube />
				</li>
			</ul>

			<button onClick={() => setCookie('today', 'done', 60 * 60)}>쿠키생성</button>
			<button onClick={() => setCookie('today', 'done', 0)}>쿠키삭제</button>
			<button onClick={() => console.log(isCookie('today=done'))}>쿠키확인</button>
			<button onClick={() => viewCookie()}>모든 쿠키 보기</button>
		</footer>
	);
}
