import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const myID = useRef('199646606@N06');
	const refNav = useRef(null);
	const isUser = useRef(myID.current);
	// 1. isUser의 초기값을 내 아이디 문자값으로 등록

	const activateBtn = (e) => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};

	const handleInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		// 2. interest 함수 호출시 isUser값을 빈 문자열로 초기화(=false로 인식되는 값)
		isUser.current = '';
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};
	const handleMine = (e) => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		// 3. 콕 지정해서 isUser의 값과 myID의 값이 동일할때만 이벤트 함수 호출 중지
		// 마이갤러리 함수 호출시에는 isUser의 문자값이 담겨있다고 하더라도 내 아이디와 같지 않으면 핸들러 함수를 실행하게 처리
		// 그 이유는 다른 사용자의 갤러리에 갔다가 다시 myGallery 호출시 이미 다른 사용자의 유저 id가 있어 내 갤러리가 호출되지 않는 문제를 해결하기 위함
		isUser.current = myID.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID.current });
	};
	const handleUser = (e) => {
		if (isUser.current) return;
		// 4. isUser값이 비어있기만 하면 함수 호출 중지
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	const fetchFlickr = async (opt) => {
		const num = 30;
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const interestURL = `${baseURL}${method_interest}`;

		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;

		let url = '';

		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);

		const data = await fetch(url);
		const json = await data.json();
		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchFlickr({ type: 'user', id: myID.current });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<article className='controls'>
				<nav className='btnSet' ref={refNav}>
					<button onClick={handleInterest}>Interest Gallery</button>
					<button className='on' onClick={handleMine}>
						My Gallery
					</button>
				</nav>
			</article>

			<section>
				<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: 20 }}>
					{Pics.map((pic, idx) => {
						return (
							<article key={pic.id}>
								<div className='pic'>
									<img
										src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
										alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
									/>
								</div>
								<h2>{pic.title}</h2>

								<div className='profile'>
									<img
										src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
										alt='사용자 프로필 이미지'
										onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
									/>
									<span onClick={handleUser}>{pic.owner}</span>
								</div>
							</article>
						);
					})}
				</Masonry>
			</section>
		</Layout>
	);
}
