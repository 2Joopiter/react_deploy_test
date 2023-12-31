import './Gallery.scss';
import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import Masonry from 'react-masonry-component';
import { useEffect, useRef, useState, useCallback } from 'react';
import { LuSearch } from 'react-icons/lu';
import { useCustomText } from '../../../hooks/useText';
import { useDispatch } from 'react-redux';
import * as types from '../../../redux/action';

export default function Gallery() {
	const dispatch = useDispatch();
	const [Pics, setPics] = useState([]);
	const myID = useRef('199646606@N06');
	const refFrameWrap = useRef(null);
	const refNav = useRef(null);
	const gap = useRef(20);
	const isUser = useRef(myID.current);
	const [Index, setIndex] = useState(0);
	const shortenTxt = useCustomText('shorten');
	const searched = useRef(false);
	const [Mounted, setMounted] = useState(true);

	const activateBtn = e => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach(btn => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};
	const handleInterest = e => {
		if (e.target.classList.contains('on')) return;
		isUser.current = '';
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};
	const handleMine = e => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID.current });
	};
	const handleUser = e => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	const handleSearch = e => {
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;
		if (!keyword.trim()) return;
		e.target.children[0].value = '';
		fetchFlickr({ type: 'search', keyword: keyword });
		searched.current = true;
	};

	const fetchFlickr = useCallback(
		async opt => {
			const num = 500;
			const flickr_api = process.env.REACT_APP_FLICKR_API;
			const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
			const method_interest = 'flickr.interestingness.getList';
			const method_user = 'flickr.people.getPhotos';
			const method_search = 'flickr.photos.search'; //search method 추가
			const interestURL = `${baseURL}${method_interest}`;
			const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
			const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`; //search url 추가
			let url = '';
			opt.type === 'user' && (url = userURL);
			opt.type === 'interest' && (url = interestURL);
			opt.type === 'search' && (url = searchURL);
			const data = await fetch(url);
			const json = await data.json();

			Mounted && setPics(json.photos.photo);
		},
		[Mounted]
	);

	useEffect(() => {
		refFrameWrap.current.style.setProperty('--gap', gap.current + 'px');
		fetchFlickr({ type: 'user', id: myID.current });
		return () => setMounted(false);
	}, [fetchFlickr]);

	return (
		<>
			<Layout title={'Gallery'}>
				<article className='controls'>
					<nav className='btnSet' ref={refNav}>
						<button onClick={handleInterest}>Interest Gallery</button>
						<button className='on' onClick={handleMine}>
							My Gallery
						</button>
					</nav>

					<form onSubmit={handleSearch}>
						<input type='text' placeholder='Search' />
						<button className='btnSearch'>
							<LuSearch />
						</button>
					</form>
				</article>

				<section className='frameWrap' ref={refFrameWrap}>
					<Masonry
						className={'frame'}
						options={{ transitionDuration: '0.5s', gutter: gap.current }}>
						{searched.current && Pics.length === 0 ? (
							<h2>해당 키워드에 해당하는 검색 결과가 없습니다.</h2>
						) : (
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div
											className='pic'
											onClick={() => {
												dispatch({ type: types.MODAL.start, payload: true });
												setIndex(idx);
											}}>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
												alt={pic.title}
											/>
										</div>
										<h2>{shortenTxt(pic.title)}</h2>

										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt='사용자 프로필 이미지'
												onError={e =>
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													)
												}
											/>
											<span onClick={handleUser}>{pic.owner}</span>
										</div>
									</article>
								);
							})
						)}
					</Masonry>
				</section>
			</Layout>

			{
				<Modal>
					{Pics.length !== 0 && (
						<img
							src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
							alt={Pics[Index].title}
						/>
					)}
				</Modal>
			}
		</>
	);
}
