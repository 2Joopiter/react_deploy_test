import './Footer.scss';
import { TiSocialInstagram } from 'react-icons/ti';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';
import { useSelector } from 'react-redux';

// npm i react-icons (기본 아이콘 설치 가능)

export default function Footer() {
	// const memberData = useSelector(store => store.memberReducer.members);
	return (
		<footer className='Footer'>
			<h1>Home</h1>
			<p>2023 home &copy; All Right Reserved. </p>
			{/*}<p>{memberData && `${memberData[0]?.position}:${memberData[0]?.name}`}</p>*/}
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
		</footer>
	);
}
