import './Footer.scss';
import { useCookie } from '../../../hooks/useCookie';
import { TiSocialInstagram } from 'react-icons/ti';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';

// npm i react-icons (기본 아이콘 설치 가능)

export default function Footer() {
	const setCookie = useCookie();
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
			<button onClick={createCookie}>쿠키생성</button>
		</footer>
	);
}
