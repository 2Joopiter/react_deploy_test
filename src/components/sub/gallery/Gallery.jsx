import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { LuSearch } from 'react-icons/lu';
import Modal from '../../common/modal/Modal';
import { useCustomText } from '../../../hooks/useText';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const myID = useRef('199646606@N06');
	const refFrameWrap = useRef(null);
	const refNav = useRef(null);
	const gap = useRef(20);
	const isUser = useRef(myID.current);
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);
	const shortenTxt = useCustomText('shorten');

	const activateBtn = (e) => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};
	const handleInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		isUser.current = '';
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};
	const handleMine = (e) => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID.current });
	};
	const handleUser = (e) => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	const handleSearch = (e) => {
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;
		if (!keyword.trim()) return;
		e.target.children[0].value = '';
		fetchFlickr({ type: 'search', keyword: keyword });
	};

	const fetchFlickr = async (opt) => {
		const num = 30;
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const interestURL = `${baseURL}${method_interest}`;
		const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`;
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;

		let url = '';

		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);
		opt.type === 'search' && (url = searchURL);

		const data = await fetch(url);
		const json = await data.json();

		/*
		if (json.photos.photo.length === 0) {
			return alert('해당 검색어의 결과값이 없습니다');
		}
		*/

		setPics(json.photos.photo);
	};

	useEffect(() => {
		refFrameWrap.current.style.setProperty('--gap', gap.current + 'px');
		fetchFlickr({ type: 'user', id: myID.current });
	}, []);

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

				{/* masonry는 처음 동작할 때 동적인 요소가 만들어지기 전에 미리 설정이 다 되어 있어야 하는데 gutter값을 scss에서 가져오게 되면 데이터를 가져오는 시간이 너무 늦어지게 됨. 따라서 react에서 제어하면 처음 마운트될 때 값이 들어가있으므로 훨씬 빠르게 처리 가능 */}
				<section className='frameWrap' ref={refFrameWrap}>
					<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: gap.current }}>
						{Pics.length === 0 ? (
							<h2>해당 키워드에 해당하는 검색 결과가 없습니다.</h2>
						) : (
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div
											className='pic'
											onClick={() => {
												setOpen(true);
												setIndex(idx);
											}}
										>
											<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
										</div>
										<h2>{shortenTxt(pic.title)}</h2>

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
							})
						)}
					</Masonry>
				</section>
			</Layout>

			{
				<Modal Open={Open} setOpen={setOpen}>
					{Pics.length !== 0 && (
						<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
					)}
				</Modal>
			}
		</>
	);
}

/*
	1. 일반 동적 데이터를 제외한 일반 정적인 컨텐츠가 렌더링 됨 (참조객체에 20이라는 상수값을 미리 담아놓음)
	2. 정적인 JSX 요소가 일단 브라우저에 렌더링 완료 되었기 때문에 useEffect 실행 가능해짐 
	3. useEffect 안쪽에서 미리 연결해놓은 참조객체 refFrameWrap에 접근 가능 (이때 refFrameWrap에 --gap 변수의 20이라는 값을 강제 적용)
	-> 이때부터는 sass 파일에 --gap이라는 변수가 없더라도 react에서 동적으로 gap이라는 변수를 넣었기 때문에 활용 가능
	4. 리액트에 동적으로 변수값을 적용해서 돔을 생성하고 나면 그 이후 scss가 해당 변수값을 읽어서 화면 
	

	<간소한 순서>
	1. 처음에 gap이라는 참조객체값을 해석
	2. 두번째 렌더링 타이밍에 useEffect가 실행이 되면서 참조객체에 담겨있는 section 요소에 강제로 gap 변수값을 적용
	3. 세번째 렌더링 타임에 동적으로 나머지 flickr fetching 데이터에 의한 동적 요소가 출력되면서 그때 비로소 변수값이 적용된 sass 스타일링 적용
	(paint)
*/
