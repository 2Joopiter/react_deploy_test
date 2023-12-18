import './Footer.scss';
import { TiSocialInstagram } from 'react-icons/ti';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';
// import { useSelector } from 'react-redux';

export default function Footer() {
	// 순서5. 전역 store값을 useSelector로 바로 호출 가능
	// const memberData = useSelector(store => store.memberReducer.members);
	return (
		<footer className='Footer'>
			<h1>Home</h1>
			<p>2023 home &copy; All Right Reserved. </p>
			{/* 아래 코드에서 조건문을 쓴 이유
					첫 번째 렌더링시에는 store로부터 빈 배열이 전달되므로(undefined) 2번째 렌더링 때만 호출되도록. 
					MemberData가 있을 때만 실행되게끔 조건문 처리 */}
			{/*}<p>{memberData[0]?.position}:{memberData[0]?.name}`}</p>*/}
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
