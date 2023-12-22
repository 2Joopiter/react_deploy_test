import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import Footer from './components/common/footer/Footer';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';
import * as types from './redux/action';

import { Route } from 'react-router-dom';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from './hooks/useMedia';

export default function App() {
	const dispatch = useDispatch();
	const Dark = useSelector(store => store.darkReducer.dark);
	const path = useRef(process.env.PUBLIC_URL);

	const fetchDepartment = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		dispatch({ type: types.MEMBER.success, payload: json.members });
	}, [dispatch]);

	const fetchHistory = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/history.json`);
		const json = await data.json();
		dispatch({ type: types.HISTORY.success, payload: json.history });
	}, [dispatch]);

	const fetchYoutube = useCallback(async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			dispatch({ type: types.YOUTUBE.success, payload: json.items });
		} catch (err) {
			dispatch({ type: types.YOUTUBE.fail, payload: err });
		}
	}, [dispatch]);

	useEffect(() => {
		fetchDepartment();
		fetchHistory();
		fetchYoutube();
	}, [fetchDepartment, fetchHistory, fetchYoutube]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header />
			<Route exact path='/' component={MainWrap} />
			<Route path='/Community' component={Community} />
			<Route path='/Contact' component={Contact} />
			<Route path='/Department' component={Department} />
			<Route path='/Gallery' component={Gallery} />
			<Route path='/Members' component={Members} />
			<Route path='/Youtube' component={Youtube} />
			<Route path='/Detail/:id' component={Detail} />
			<Footer />
			{<Menu />}
		</div>
	);
}
