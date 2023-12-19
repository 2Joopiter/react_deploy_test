import './Footer.scss';
import { Link } from 'react-router-dom';
import { TiSocialInstagram } from 'react-icons/ti';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';

export default function Footer() {
	return (
		<footer className='Footer'>
			<h1>Home</h1>
			<p>2023 home &copy; All Right Reserved. </p>

			<ul>
				<li>
					<a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
						<TiSocialInstagram />
					</a>
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
